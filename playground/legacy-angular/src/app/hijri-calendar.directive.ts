/**
 * Hijri Calendar Directive - Legacy Angular (7/9) compatible
 * Standardized for CoreComponents Monorepo
 */
import {
  Directive, ElementRef, HostListener, Input,
  Renderer2, OnInit, OnDestroy, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  todayHijri, todayGregorian,
  hijriToGregorianStr, gregorianToHijriStr,
  hijriDaysInMonth, hijriDayOfWeek,
  gregDaysInMonth, gregDayOfWeek,
  HIJRI_MONTH_NAMES, GREG_MONTH_NAMES_AR,
  DAY_NAMES_SHORT_AR,
  pad2
} from '@core-components/calendar';

@Directive({
  selector: '[hijri-calender]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HijriCalendarDirective),
    multi: true
  }]
})
export class HijriCalendarDirective implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() bindValue: 'hijri' | 'gregorian' = 'hijri';

  private hijriStr = '';
  private gregStr = '';
  private displayMode: 'hijri' | 'gregorian' = 'hijri';
  private viewYear: number;
  private viewMonth: number;

  private wrapper: HTMLElement;
  private dropEl: HTMLSelectElement;
  private popup: HTMLElement;
  private outsideClick: (e: MouseEvent) => void;

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const t = todayHijri();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  ngOnInit() {
    this.buildWrapper();
    this.updateDisplay();
  }

  ngOnDestroy() {
    this.closePopup();
    if (this.wrapper) { this.wrapper.remove(); }
  }

  writeValue(val: string) {
    if (!val) {
      this.hijriStr = ''; this.gregStr = '';
      this.el.nativeElement.value = '';
      return;
    }
    if (this.bindValue === 'hijri') {
      this.hijriStr = val;
      this.gregStr = hijriToGregorianStr(val);
    } else {
      this.gregStr = val;
      this.hijriStr = gregorianToHijriStr(val);
    }
    this.updateDisplay();
    this.syncViewToCurrentValue();
  }

  registerOnChange(fn: (v: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  @HostListener('click')
  openPopup() {
    if (this.popup) { this.closePopup(); return; }
    this.onTouched();
    this.popup = document.createElement('div');
    this.popup.className = 'cc-cal-popup';
    document.body.appendChild(this.popup);
    this.renderCalendar();
    this.positionPopup();

    setTimeout(() => {
      this.outsideClick = (e) => {
        if (!this.popup.contains(e.target as Node) && !this.dropEl.contains(e.target as Node)) {
          this.closePopup();
        }
      };
      document.addEventListener('mousedown', this.outsideClick);
    });
  }

  closePopup() {
    if (this.popup) { this.popup.remove(); this.popup = null; }
    if (this.outsideClick) {
      document.removeEventListener('mousedown', this.outsideClick);
      this.outsideClick = null;
    }
  }

  private buildWrapper() {
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'cc-cal-wrapper');
    const parent = this.el.nativeElement.parentNode;
    this.renderer.insertBefore(parent, this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);

    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'cc-cal-drop');
    const options = [['hijri', 'هـ'], ['gregorian', 'م']];
    options.forEach(optData => {
      const opt = this.renderer.createElement('option');
      this.renderer.setProperty(opt, 'value', optData[0]);
      this.renderer.setProperty(opt, 'textContent', optData[1]);
      this.renderer.appendChild(this.dropEl, opt);
    });
    this.renderer.appendChild(this.wrapper, this.dropEl);

    this.renderer.listen(this.dropEl, 'change', () => {
      this.displayMode = this.dropEl.value as 'hijri' | 'gregorian';
      this.syncViewToCurrentValue();
      this.updateDisplay();
      if (this.popup) this.renderCalendar();
    });
    this.renderer.listen(this.dropEl, 'click', (e) => e.stopPropagation());
  }

  private renderCalendar() {
    if (!this.popup) return;
    this.popup.innerHTML = this.displayMode === 'hijri' ? this.buildHijriHtml() : this.buildGregHtml();

    this.popup.addEventListener('mousedown', (e) => e.stopPropagation());
    const prevBtn = this.popup.querySelector('.cc-cal-prev');
    const nextBtn = this.popup.querySelector('.cc-cal-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));
    this.popup.querySelectorAll('[data-d]').forEach(cell => {
      cell.addEventListener('click', () => this.pickDay(Number((cell as HTMLElement).dataset.d)));
    });
  }

  private buildHijriHtml() {
    const today = todayHijri();
    const totalDays = hijriDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow = hijriDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = HIJRI_MONTH_NAMES[this.viewMonth - 1];
    return this.buildGrid(`${monthName} ${this.viewYear}`, 'هـ', totalDays, firstDow,
      (d) => this.hijriStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d
    );
  }

  private buildGregHtml() {
    const today = todayGregorian();
    const totalDays = gregDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow = gregDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = GREG_MONTH_NAMES_AR[this.viewMonth - 1];
    return this.buildGrid(`${monthName} ${this.viewYear}`, 'م', totalDays, firstDow,
      (d) => this.gregStr === `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(d)}`,
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d
    );
  }

  private buildGrid(mainTitle: string, subTitle: string, totalDays: number, firstDow: number, isSel: (d: number) => boolean, isToday: (d: number) => boolean) {
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
        <div class="cc-cal-title"><span class="cc-cal-main">${mainTitle}</span><span class="cc-cal-sub">${subTitle}</span></div>
        <button class="cc-cal-btn cc-cal-next">&#8250;</button>
      </div>
      <table class="cc-cal-grid" dir="rtl">
        <thead><tr>${heads}</tr></thead>
        <tbody><tr>${cells}</tr></tbody>
      </table>`;
  }

  private navigate(delta: number) {
    this.viewMonth += delta;
    if (this.viewMonth > 12) { this.viewMonth = 1; this.viewYear++; }
    if (this.viewMonth < 1) { this.viewMonth = 12; this.viewYear--; }
    this.renderCalendar();
  }

  private pickDay(day: number) {
    const ds = `${this.viewYear}/${pad2(this.viewMonth)}/${pad2(day)}`;
    if (this.displayMode === 'hijri') {
      this.hijriStr = ds; this.gregStr = hijriToGregorianStr(ds);
    } else {
      this.gregStr = ds; this.hijriStr = gregorianToHijriStr(ds);
    }
    this.updateDisplay();
    this.onChange(this.bindValue === 'hijri' ? this.hijriStr : this.gregStr);
    this.closePopup();
  }

  private updateDisplay() {
    this.el.nativeElement.value = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
  }

  private syncViewToCurrentValue() {
    const src = this.displayMode === 'hijri' ? this.hijriStr : this.gregStr;
    if (src) {
      const p = src.split('/').map(Number);
      if (p.length === 3) { this.viewYear = p[0]; this.viewMonth = p[1]; return; }
    }
    const t = this.displayMode === 'hijri' ? todayHijri() : todayGregorian();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  private positionPopup() {
    if (!this.popup) return;
    const r = (this.wrapper || this.el.nativeElement).getBoundingClientRect();
    this.popup.style.top = (r.bottom + window.scrollY + 4) + 'px';
    this.popup.style.right = (document.documentElement.clientWidth - r.right - window.scrollX) + 'px';
  }
}
