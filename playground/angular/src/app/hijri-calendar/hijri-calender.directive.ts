/**
 * HijriCalenderDirective
 * Standardized for CoreComponents Monorepo
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
} from '@core-components/calendar';

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

  @Input() bindValue: 'hijri' | 'gregorian' = 'hijri';

  private hijriStr   = '';
  private gregStr    = '';
  private displayMode: 'hijri' | 'gregorian' = 'hijri';
  private viewYear!: number;
  private viewMonth!: number;

  private wrapper: HTMLElement | null = null;
  private dropEl:  HTMLSelectElement | null = null;
  private popup:   HTMLElement | null = null;
  private outsideClick: ((e: MouseEvent) => void) | null = null;

  private onChange:  (v: string) => void = () => {};
  private onTouched: () => void          = () => {};

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
  ) {
    const t = todayHijri();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  ngAfterViewInit(): void {
    this.buildWrapper();
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.closePopup();
    this.wrapper?.remove();
  }

  writeValue(val: string): void {
    if (!val) {
      this.hijriStr = ''; this.gregStr = '';
      this.el.nativeElement.value = '';
      return;
    }
    if (this.bindValue === 'hijri') {
      this.hijriStr = val;
      this.gregStr = hijriToGregorianStr(val);
    } else {
      this.gregStr  = val;
      this.hijriStr = gregorianToHijriStr(val);
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

  @HostListener('click')
  openPopup(): void {
    if (this.popup) { this.closePopup(); return; }
    this.onTouched();
    this.popup = document.createElement('div');
    this.popup.className = 'cc-cal-popup';
    document.body.appendChild(this.popup);
    this.renderCalendar();
    this.positionPopup();
    requestAnimationFrame(() => {
      this.outsideClick = (e) => {
        if (!this.popup?.contains(e.target as Node) && !this.dropEl?.contains(e.target as Node)) {
          this.closePopup();
        }
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

  private buildWrapper(): void {
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'cc-cal-wrapper');
    const parent = this.el.nativeElement.parentNode!;
    this.renderer.insertBefore(parent, this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);

    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'cc-cal-drop');
    this.renderer.setAttribute(this.dropEl, 'title', 'نوع التقويم');

    const options: [string, string][] = [['hijri', 'هـ'], ['gregorian', 'م']];
    options.forEach(([val, label]) => {
      const opt = this.renderer.createElement('option');
      this.renderer.setProperty(opt, 'value', val);
      this.renderer.setProperty(opt, 'textContent', label);
      this.renderer.appendChild(this.dropEl, opt);
    });

    this.renderer.appendChild(this.wrapper, this.dropEl);
    this.renderer.listen(this.dropEl, 'change', () => {
      this.displayMode = this.dropEl!.value as 'hijri' | 'gregorian';
      this.syncViewToCurrentValue();
      this.updateDisplay();
      if (this.popup) this.renderCalendar();
    });
    this.renderer.listen(this.dropEl, 'click', (e: Event) => e.stopPropagation());
  }

  private renderCalendar(): void {
    if (!this.popup) return;
    this.popup.innerHTML = this.displayMode === 'hijri' ? this.buildHijriHtml() : this.buildGregHtml();

    this.popup.addEventListener('mousedown', e => e.stopPropagation());
    this.popup.querySelector('.cc-cal-prev')?.addEventListener('click', () => this.navigate(-1));
    this.popup.querySelector('.cc-cal-next')?.addEventListener('click', () => this.navigate(+1));
    this.popup.querySelectorAll<HTMLElement>('[data-d]').forEach(cell =>
      cell.addEventListener('click', () => this.pickDay(+cell.dataset['d']!))
    );
  }

  private buildHijriHtml(): string {
    const today = todayHijri();
    const totalDays = hijriDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow = hijriDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = HIJRI_MONTH_NAMES[this.viewMonth - 1];
    const gEquiv = hijriToGregorianStr(`${this.viewYear}/${pad2(this.viewMonth)}/01`);
    const gLabel = GREG_MONTH_NAMES_AR[+gEquiv.split('/')[1] - 1] + ' ' + gEquiv.split('/')[0];

    return this.buildGrid(`${monthName} ${this.viewYear}`, `${gLabel} م`, totalDays, firstDow,
      (d) => this.hijriStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d,
    );
  }

  private buildGregHtml(): string {
    const today = todayGregorian();
    const totalDays = gregDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow = gregDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = GREG_MONTH_NAMES_AR[this.viewMonth - 1];
    const hEquiv = gregorianToHijriStr(`${this.viewYear}/${pad2(this.viewMonth)}/01`);
    const hLabel = HIJRI_MONTH_NAMES[+hEquiv.split('/')[1] - 1] + ' ' + hEquiv.split('/')[0];

    return this.buildGrid(`${monthName} ${this.viewYear}`, `${hLabel} هـ`, totalDays, firstDow,
      (d) => this.gregStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d,
    );
  }

  private buildGrid(mainTitle: string, subTitle: string, totalDays: number, firstDow: number, isSel: (d: number) => boolean, isToday: (d: number) => boolean): string {
    const heads = DAY_NAMES_SHORT_AR.map(h => `<th>${h}</th>`).join('');
    let cells = '';
    for (let i = 0; i < firstDow; i++) cells += '<td></td>';
    for (let d = 1; d <= totalDays; d++) {
      const cls = isSel(d) ? 'selected' : isToday(d) ? 'today' : '';
      cells += `<td class="${cls}" data-d="${d}">${d}</td>`;
      if ((firstDow + d) % 7 === 0 && d < totalDays) cells += '</tr><tr>';
    }
    return `
      <div class="cc-cal-head">
        <button class="cc-cal-btn cc-cal-prev">&#8249;</button>
        <div class="cc-cal-title">
          <span class="cc-cal-main">${mainTitle}</span>
          <span class="cc-cal-sub">${subTitle}</span>
        </div>
        <button class="cc-cal-btn cc-cal-next">&#8250;</button>
      </div>
      <table class="cc-cal-grid" dir="rtl">
        <thead><tr>${heads}</tr></thead>
        <tbody><tr>${cells}</tr></tbody>
      </table>`;
  }

  private navigate(delta: number): void {
    this.viewMonth += delta;
    if (this.viewMonth > 12) { this.viewMonth = 1;  this.viewYear++; }
    if (this.viewMonth < 1)  { this.viewMonth = 12; this.viewYear--; }
    this.renderCalendar();
  }

  private pickDay(day: number): void {
    const ds = `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(day)}`;
    if (this.displayMode === 'hijri') {
      this.hijriStr = ds; this.gregStr = hijriToGregorianStr(ds);
    } else {
      this.gregStr  = ds; this.hijriStr = gregorianToHijriStr(ds);
    }
    this.updateDisplay();
    this.onChange(this.bindValue === 'hijri' ? this.hijriStr : this.gregStr);
    this.closePopup();
  }

  private updateDisplay(): void {
    this.el.nativeElement.value = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
  }

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
}
