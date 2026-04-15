

/**
 * HijriCalenderDirective — Angular 14+ Standalone
 *
 * Selector : [hijri-calender]
 * Inputs   : 
 *   - bindValue = 'hijri' | 'gregorian' (default: 'hijri')
 *   - format    = 'yyyy/mm/dd' | 'dd/mm/yyyy' | ... (default: 'yyyy/mm/dd')
 * Outputs   : 
 *   - dateChange = EventEmitter<{ hijri: HijriDateObj; greg: GregDateObj }>
 *
 * ─── Setup ───────────────────────────────────────────────────────────────
 * 1. Copy this file + hijri-calendar.lib.ts into your project.
 * 2. Import in your component:
 *
 *    import { HijriCalenderDirective } from './hijri-calendar.directive';
 *
 *    @Component({
 *      standalone: true,
 *      imports: [FormsModule, HijriCalenderDirective],
 *      ...
 *    })
 *    export class MyComponent { }
 *
 * ─── Template usage ──────────────────────────────────────────────────────
 *   <!-- ngModel receives Hijri value (default) -->
 *   <input type="text" readonly hijri-calender [(ngModel)]="model.hijriDate" name="d" />
 *
 *   <!-- ngModel receives Gregorian value -->
 *   <input type="text" readonly hijri-calender [bindValue]="'gregorian'"
 *          [(ngModel)]="model.gregDate" name="d" />
 *
 *   <!-- With event that returns BOTH hijri and gregorian dates -->
 *   <input type="text" readonly hijri-calender 
 *          [bindValue]="'hijri'"
 *          (dateChange)="onDateSelected($event)" />
 *
 *   <!-- Example: onDateSelected receives { hijri: {...}, greg: {...} } -->
 */

import {
  AfterViewInit, Directive, ElementRef, EventEmitter, HostListener,
  Input, OnDestroy, OnInit, Output, Renderer2, forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  todayHijri, todayGregorian,
  hijriToGregorianStr, gregorianToHijriStr,
  hijriToGregorian, gregorianToHijri,
  hijriDaysInMonth, hijriDayOfWeek,
  gregDaysInMonth, gregDayOfWeek,
  HIJRI_MONTH_NAMES, GREG_MONTH_NAMES_AR,
  DAY_NAMES_SHORT_AR, pad2,
  HijriDateObj, GregDateObj,
} from './hijri-calendar.lib';

export { getDayNameHijri } from './hijri-calendar.lib';

export interface HijriGregDate {
  hijri: HijriDateObj;
  greg: GregDateObj;
}

@Directive({
  selector: '[hijri-calender]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HijriCalenderDirective),
    multi: true,
  }],
})
export class HijriCalenderDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  /**
   * Which calendar value is bound to [(ngModel)].
   * 'hijri'     → model gets "1446/01/15"  (Umm al-Qura, default)
   * 'gregorian' → model gets "2024/07/19"
   */
  @Input() bindValue: 'hijri' | 'gregorian' = 'hijri';

  /**
   * Date format for display (default: 'yyyy/mm/dd')
   */
  @Input() format: string = 'yyyy/mm/dd';

  /**
   * Emits when date is selected with BOTH hijri and gregorian objects.
   * Usage: (dateChange)="onDateSelected($event)"
   * $event = { hijri: { year, month, day, formatted }, 
   *             greg: { year, month, day, formatted } }
   */
  @Output() dateChange = new EventEmitter<HijriGregDate>();

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

  ngOnInit(): void {
    // Set displayMode as early as possible so writeValue() uses the correct mode
    // if it is called (by Angular Forms) before ngAfterViewInit.
    this.displayMode = this.bindValue;
  }

  ngAfterViewInit(): void {
    this.buildWrapper();
    this.displayMode = this.bindValue;
    this.syncViewToCurrentValue();
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.closePopup();
    this.wrapper?.remove();
  }

  writeValue(val: string): void {
    if (!val) {
      this.hijriStr = '';
      this.gregStr  = '';
      this.el.nativeElement.value = '';
      return;
    }

    const norm = this.normalise(val);
    if (!norm) return;

    if (this.bindValue === 'hijri') {
      this.hijriStr = norm;
      try { this.gregStr = hijriToGregorianStr(norm); } catch { this.gregStr = ''; }
    } else {
      this.gregStr  = norm;
      try { this.hijriStr = gregorianToHijriStr(norm); } catch { this.hijriStr = ''; }
    }

    if (this.dropEl) {
      this.dropEl.value = this.bindValue;
    }
    this.displayMode = this.bindValue;
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
    this.popup.className = 'hci-popup';
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

  private buildWrapper(): void {
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'hcal-wrapper');
    const parent = this.el.nativeElement.parentNode!;
    this.renderer.insertBefore(parent, this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);
    this.renderer.addClass(this.el.nativeElement, 'hcal-has-icon');

    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'hcal-drop');
    this.renderer.setAttribute(this.dropEl, 'title', 'نوع التقويم');

    const options: [string, string][] = [['hijri', 'هـ'], ['gregorian', 'م']];
    options.forEach(([val, label]) => {
      const opt = this.renderer.createElement('option');
      this.renderer.setProperty(opt, 'value', val);
      this.renderer.setProperty(opt, 'textContent', label);
      if (val === this.bindValue) {
        this.renderer.setProperty(opt, 'selected', true);
      }
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
    this.popup.innerHTML = this.displayMode === 'hijri'
      ? this.buildHijriHtml()
      : this.buildGregHtml();

    this.popup.addEventListener('mousedown', e => e.stopPropagation());
    this.popup.querySelector('.hci-prev')
      ?.addEventListener('click', () => this.navigate(-1));
    this.popup.querySelector('.hci-next')
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
      const cls = isSel(d) ? 'hci-selected' : isToday(d) ? 'hci-today' : '';
      cells += `<td class="${cls}" data-d="${d}">${d}</td>`;
      if ((firstDow + d) % 7 === 0 && d < totalDays) cells += '</tr><tr>';
    }
    return `
      <div class="hci-head">
        <button class="hci-btn hci-prev">&#8249;</button>
        <div class="hci-title">
          <span class="hci-main">${mainTitle}</span>
          <span class="hci-sub">${subTitle}</span>
        </div>
        <button class="hci-btn hci-next">&#8250;</button>
      </div>
      <table class="hci-grid" dir="rtl">
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

    let hijriObj: HijriDateObj;
    let gregObj: GregDateObj;

    if (this.displayMode === 'hijri') {
      this.hijriStr = ds;
      try { this.gregStr = hijriToGregorianStr(ds); } catch { this.gregStr = ''; }
      hijriObj = { year: this.viewYear, month: this.viewMonth, day, formatted: ds };
      if (this.gregStr) {
        const p = this.gregStr.split('/').map(Number);
        gregObj = { year: p[0], month: p[1], day: p[2], formatted: this.gregStr };
      } else {
        const converted = hijriToGregorian(this.viewYear, this.viewMonth, day);
        gregObj = converted;
      }
    } else {
      this.gregStr  = ds;
      try { this.hijriStr = gregorianToHijriStr(ds); } catch { this.hijriStr = ''; }
      gregObj = { year: this.viewYear, month: this.viewMonth, day, formatted: ds };
      if (this.hijriStr) {
        const p = this.hijriStr.split('/').map(Number);
        hijriObj = { year: p[0], month: p[1], day: p[2], formatted: this.hijriStr };
      } else {
        const converted = gregorianToHijri(this.viewYear, this.viewMonth, day);
        hijriObj = converted;
      }
    }

    this.updateDisplay();
    this.onChange(this.bindValue === 'hijri' ? this.hijriStr : this.gregStr);
    this.dateChange.emit({ hijri: hijriObj, greg: gregObj });
    this.closePopup();
  }

  private updateDisplay(): void {
    const val = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
    this.el.nativeElement.value = val;
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
    this.popup.style.top      = `${r.bottom + window.scrollY + 4}px`;
    this.popup.style.right    = `${document.documentElement.clientWidth - r.right - window.scrollX}px`;
    this.popup.style.minWidth = r.width + 'px';
  }

  private normalise(s: string): string | null {
    const p = s.split(/[\/\-\\]/).map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    const [a, b, c] = p;
    const [y, m, d] = a > 100 ? [a, b, c] : [c, b, a];
    return `${y}/${pad2(m)}/${pad2(d)}`;
  }
}`;
