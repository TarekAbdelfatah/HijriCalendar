/**
 * HijriCalenderDirective
 *
 * Selector : [hijri-calender]
 * Inputs   : bindValue = 'hijri' | 'gregorian'   (default: 'hijri')
 *
 * Usage:
 *   <!-- ngModel receives Hijri value (default) -->
 *   <input hijri-calender [(ngModel)]="model.hijriDate" name="d" />
 *
 *   <!-- ngModel receives Gregorian value -->
 *   <input hijri-calender [bindValue]="'gregorian'" [(ngModel)]="model.gregDate" name="d" />
 */

import {
  AfterViewInit, Directive, ElementRef, HostListener,
  Input, OnDestroy, Renderer2, forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  todayHijri, todayGregorian,
  hijriToGregorianStr, gregorianToHijriStr,
  hijriDaysInMonth, hijriDayOfWeek,
  gregDaysInMonth, gregDayOfWeek,
  HIJRI_MONTH_NAMES, GREG_MONTH_NAMES_AR,
  DAY_NAMES_SHORT_AR,
  pad2,
} from './hijri-calendar.lib';

@Directive({
  selector: '[hijri-calender]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HijriCalenderDirective),
    multi: true,
  }],
})
export class HijriCalenderDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {

  /**
   * Which calendar value is bound to [(ngModel)].
   * 'hijri'     → model gets "1446/01/15"  (Umm al-Qura, default)
   * 'gregorian' → model gets "2024/07/19"
   */
  @Input() bindValue: 'hijri' | 'gregorian' = 'hijri';

  // ── Internal state ────────────────────────────────────────────────────────
  private hijriStr   = '';   // yyyy/mm/dd  Hijri
  private gregStr    = '';   // yyyy/mm/dd  Gregorian
  private displayMode: 'hijri' | 'gregorian' = 'hijri';   // what the popup shows
  private viewYear!: number;
  private viewMonth!: number;

  // ── DOM refs ──────────────────────────────────────────────────────────────
  private wrapper: HTMLElement | null = null;
  private dropEl:  HTMLSelectElement | null = null;
  private popup:   HTMLElement | null = null;
  private outsideClick: ((e: MouseEvent) => void) | null = null;

  // ── CVA callbacks ─────────────────────────────────────────────────────────
  private onChange:  (v: string) => void = () => {};
  private onTouched: () => void          = () => {};

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
  ) {
    this.injectStyles();
    const t = todayHijri();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.buildWrapper();
    this.updateDisplay(); // re-apply value written before view was ready
  }

  ngOnDestroy(): void {
    this.closePopup();
    this.wrapper?.remove();
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  writeValue(val: string): void {
    if (!val) {
      this.hijriStr = '';
      this.gregStr  = '';
      this.el.nativeElement.value = '';
      return;
    }

    const norm = this.normalise(val);
    if (!norm) return;

    // Incoming value is in bindValue format
    if (this.bindValue === 'hijri') {
      this.hijriStr = norm;
      try { this.gregStr = hijriToGregorianStr(norm); } catch { this.gregStr = ''; }
    } else {
      this.gregStr  = norm;
      try { this.hijriStr = gregorianToHijriStr(norm); } catch { this.hijriStr = ''; }
    }

    this.updateDisplay();
    this.syncViewToCurrentValue();
  }

  registerOnChange(fn: (v: string) => void): void  { this.onChange  = fn; }
  registerOnTouched(fn: () => void): void           { this.onTouched = fn; }

  setDisabledState(disabled: boolean): void {
    this.el.nativeElement.disabled = disabled;
    if (this.dropEl) this.dropEl.disabled = disabled;
  }

  // ── Open on click ─────────────────────────────────────────────────────────

  @HostListener('click')
  openPopup(): void {
    if (this.popup) { this.closePopup(); return; }
    this.onTouched();
    this.popup = document.createElement('div');
    this.popup.className = 'hcal-popup';
    document.body.appendChild(this.popup);
    this.renderCalendar();
    this.positionPopup();
    requestAnimationFrame(() => {
      this.outsideClick = (e) => {
        if (
          !this.popup?.contains(e.target as Node) &&
          !this.dropEl?.contains(e.target as Node)
        ) this.closePopup();
      };
      document.addEventListener('mousedown', this.outsideClick);
    });
  }

  closePopup(): void {
    this.popup?.remove();
    this.popup = null;
    if (this.outsideClick) {
      document.removeEventListener('mousedown', this.outsideClick);
      this.outsideClick = null;
    }
  }

  // ── DOM: wrapper + dropdown ───────────────────────────────────────────────

  private buildWrapper(): void {
    // Wrap input
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'hcal-wrapper');
    const parent = this.el.nativeElement.parentNode!;
    this.renderer.insertBefore(parent, this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);

    // Dropdown
    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'hcal-drop');
    this.renderer.setAttribute(this.dropEl, 'title', 'نوع التقويم');

    const options: [string, string][] = [['hijri', 'هـ'], ['gregorian', 'م']];
    options.forEach(([val, label]) => {
      const opt = this.renderer.createElement('option');
      this.renderer.setProperty(opt, 'value', val);
      this.renderer.setProperty(opt, 'textContent', label);
      this.renderer.appendChild(this.dropEl, opt);
    });

    this.renderer.appendChild(this.wrapper, this.dropEl);

    // Listen to dropdown change
    this.renderer.listen(this.dropEl, 'change', () => {
      this.displayMode = this.dropEl!.value as 'hijri' | 'gregorian';
      this.syncViewToCurrentValue();
      this.updateDisplay();
      if (this.popup) this.renderCalendar();
    });

    // Stop dropdown click from propagating to input's HostListener
    this.renderer.listen(this.dropEl, 'click', (e: Event) => e.stopPropagation());
  }

  // ── Calendar rendering ────────────────────────────────────────────────────

  private renderCalendar(): void {
    if (!this.popup) return;
    this.popup.innerHTML = this.displayMode === 'hijri'
      ? this.buildHijriHtml()
      : this.buildGregHtml();

    this.popup.addEventListener('mousedown', e => e.stopPropagation());
    this.popup.querySelector('.hcal-prev')
      ?.addEventListener('click', () => this.navigate(-1));
    this.popup.querySelector('.hcal-next')
      ?.addEventListener('click', () => this.navigate(+1));
    this.popup.querySelectorAll<HTMLElement>('[data-d]').forEach(cell =>
      cell.addEventListener('click', () => this.pickDay(+cell.dataset['d']!))
    );
  }

  private buildHijriHtml(): string {
    const today      = todayHijri();
    const totalDays  = hijriDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow   = hijriDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName  = HIJRI_MONTH_NAMES[this.viewMonth - 1];
    const gEquiv     = hijriToGregorianStr(`${this.viewYear}/${pad2(this.viewMonth)}/01`);
    const gLabel     = GREG_MONTH_NAMES_AR[+gEquiv.split('/')[1] - 1] + ' ' + gEquiv.split('/')[0];

    return this.buildGrid(
      `${monthName} ${this.viewYear}`, `${gLabel} م`,
      totalDays, firstDow,
      (d) => this.hijriStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d,
    );
  }

  private buildGregHtml(): string {
    const today      = todayGregorian();
    const totalDays  = gregDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow   = gregDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName  = GREG_MONTH_NAMES_AR[this.viewMonth - 1];
    const hEquiv     = gregorianToHijriStr(`${this.viewYear}/${pad2(this.viewMonth)}/01`);
    const hLabel     = HIJRI_MONTH_NAMES[+hEquiv.split('/')[1] - 1] + ' ' + hEquiv.split('/')[0];

    return this.buildGrid(
      `${monthName} ${this.viewYear}`, `${hLabel} هـ`,
      totalDays, firstDow,
      (d) => this.gregStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d,
    );
  }

  private buildGrid(
    mainTitle: string, subTitle: string,
    totalDays: number, firstDow: number,
    isSel:   (d: number) => boolean,
    isToday: (d: number) => boolean,
  ): string {
    const heads = DAY_NAMES_SHORT_AR.map(h => `<th>${h}</th>`).join('');
    let cells = '';
    for (let i = 0; i < firstDow; i++) cells += '<td></td>';
    for (let d = 1; d <= totalDays; d++) {
      const cls = isSel(d) ? 'sel' : isToday(d) ? 'tod' : '';
      cells += `<td class="${cls}" data-d="${d}">${d}</td>`;
      if ((firstDow + d) % 7 === 0 && d < totalDays) cells += '</tr><tr>';
    }
    return `
      <div class="hcal-head">
        <button class="hcal-btn hcal-prev">&#8249;</button>
        <div class="hcal-title">
          <span class="hcal-main">${mainTitle}</span>
          <span class="hcal-sub">${subTitle}</span>
        </div>
        <button class="hcal-btn hcal-next">&#8250;</button>
      </div>
      <table class="hcal-grid" dir="rtl">
        <thead><tr>${heads}</tr></thead>
        <tbody><tr>${cells}</tr></tbody>
      </table>`;
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  private navigate(delta: number): void {
    this.viewMonth += delta;
    if (this.viewMonth > 12) { this.viewMonth = 1;  this.viewYear++; }
    if (this.viewMonth < 1)  { this.viewMonth = 12; this.viewYear--; }
    this.renderCalendar();
  }

  private pickDay(day: number): void {
    const ds = `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(day)}`;

    if (this.displayMode === 'hijri') {
      this.hijriStr = ds;
      try { this.gregStr = hijriToGregorianStr(ds); } catch { this.gregStr = ''; }
    } else {
      this.gregStr  = ds;
      try { this.hijriStr = gregorianToHijriStr(ds); } catch { this.hijriStr = ''; }
    }

    this.updateDisplay();
    this.onChange(this.bindValue === 'hijri' ? this.hijriStr : this.gregStr);
    this.closePopup();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Show the date in input according to current displayMode */
  private updateDisplay(): void {
    const val = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
    this.el.nativeElement.value = val;
  }

  /** Move the calendar view to the month of the current value */
  private syncViewToCurrentValue(): void {
    const src = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
    if (src) {
      const p = src.split('/').map(Number);
      if (p.length === 3) { this.viewYear = p[0]; this.viewMonth = p[1]; return; }
    }
    const t = this.displayMode === 'hijri' ? todayHijri() : todayGregorian();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  private positionPopup(): void {
    if (!this.popup) return;
    const r = (this.wrapper ?? this.el.nativeElement).getBoundingClientRect();
    this.popup.style.top   = `${r.bottom + window.scrollY + 4}px`;
    this.popup.style.right = `${document.documentElement.clientWidth - r.right - window.scrollX}px`;
  }

  private normalise(s: string): string | null {
    const p = s.split(/[\/\-\\]/).map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    const [a, b, c] = p;
    const [y, m, d] = a > 100 ? [a, b, c] : [c, b, a];
    return `${y}/${pad2(m)}/${pad2(d)}`;
  }

  // ── Styles injected once into <head> ──────────────────────────────────────

  private injectStyles(): void {
    if (document.getElementById('hcal-css')) return;
    const s = document.createElement('style');
    s.id = 'hcal-css';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }
}

// ─── Popup + Wrapper CSS ──────────────────────────────────────────────────────
const STYLES = `
/* Wrapper: input + dropdown side by side */
.hcal-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}
.hcal-wrapper > input {
  flex: 1;
  min-width: 0;
}
.hcal-drop {
  flex-shrink: 0;
  padding: 0 6px;
  height: 38px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #f8fafc;
  color: #333;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: border-color .15s;
  min-width: 46px;
}
.hcal-drop:focus { border-color: #1967d2; }

/* Popup */
.hcal-popup {
  position: absolute;
  z-index: 9999;
  background: #fff;
  border: 1px solid #d0d7de;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0,0,0,.15);
  padding: 14px;
  min-width: 292px;
  font-family: 'Cairo','Segoe UI',Tahoma,sans-serif;
  direction: rtl;
}
.hcal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.hcal-title   { text-align: center; line-height: 1.3; }
.hcal-main    { display: block; font-weight: 700; font-size: 15px; color: #1a1a2e; }
.hcal-sub     { display: block; font-size: 11px; color: #999; }
.hcal-btn {
  background: none; border: none; font-size: 24px;
  cursor: pointer; color: #555; padding: 2px 8px;
  border-radius: 6px; line-height: 1; transition: background .12s;
}
.hcal-btn:hover { background: #f0f4f8; }
.hcal-grid { width: 100%; border-collapse: collapse; text-align: center; }
.hcal-grid th { font-size: 11px; color: #999; padding: 4px 2px; font-weight: 600; }
.hcal-grid td {
  font-size: 13px; padding: 7px 3px;
  cursor: pointer; border-radius: 50%;
  color: #333; transition: background .12s, color .12s;
  width: 36px; height: 36px;
}
.hcal-grid td:empty { cursor: default; }
.hcal-grid td:not(:empty):hover { background: #e8f0fe; }
.hcal-grid td.tod { background: #e8f0fe; color: #1967d2; font-weight: 600; }
.hcal-grid td.sel { background: #1967d2 !important; color: #fff !important; font-weight: 700; }
`;
