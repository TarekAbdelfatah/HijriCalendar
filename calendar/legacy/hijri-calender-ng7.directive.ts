/**
 * HijriCalenderDirective — Angular 7+ compatible (NgModule)
 *
 * Selector : [hijri-calender]
 * Inputs   : 
 *   - bindValue = 'hijri' | 'gregorian' (default: 'hijri')
 *   - format    = 'yyyy/mm/dd' | ... (default: 'yyyy/mm/dd')
 * Outputs   : 
 *   - dateChange = EventEmitter<{ hijri: {...}; greg: {...} }>
 *
 * ─── Setup (Angular 7 / NgModule) ───────────────────────────────────────────
 * 1. Copy this file + hijri-calendar.lib.ts into your project.
 * 2. Declare the directive in your NgModule:
 *
 *    import { HijriCalenderDirective } from './hijri-calender.directive';
 *
 *    @NgModule({
 *      declarations: [AppComponent, HijriCalenderDirective],
 *      imports:      [BrowserModule, FormsModule],
 *      bootstrap:    [AppComponent],
 *    })
 *    export class AppModule { }
 *
 * ─── Template usage ──────────────────────────────────────────────────────
 *   <!-- ngModel gets Hijri value (default) -->
 *   <input type="text" readonly hijri-calender [(ngModel)]="model.hijriDate" name="d" />
 *
 *   <!-- ngModel gets Gregorian value -->
 *   <input type="text" readonly hijri-calender [bindValue]="'gregorian'"
 *          [(ngModel)]="model.gregDate" name="d" />
 *
 *   <!-- With dateChange event that returns BOTH hijri and gregorian -->
 *   <input type="text" readonly hijri-calender 
 *          [bindValue]="'hijri'"
 *          (dateChange)="onDateSelected($event)" />
 */

import {
  AfterViewInit, Directive, ElementRef, EventEmitter, HostListener,
  Input, OnDestroy, Output, Renderer2, forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  todayHijri, todayGregorian,
  hijriToGregorianStr, gregorianToHijriStr,
  hijriToGregorian, gregorianToHijri,
  hijriDaysInMonth, hijriDayOfWeek,
  gregDaysInMonth, gregDayOfWeek,
  HIJRI_MONTH_NAMES, GREG_MONTH_NAMES_AR,
  DAY_NAMES_SHORT_AR,
  pad2, HijriDateObj, GregDateObj,
} from './hijri-calendar.lib';

export { getDayNameHijri } from './hijri-calendar.lib';

export interface HijriGregDate {
  hijri: HijriDateObj;
  greg: GregDateObj;
}

@Directive({
  selector: '[hijri-calender]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HijriCalenderDirective),
    multi: true,
  }],
})
export class HijriCalenderDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() bindValue: 'hijri' | 'gregorian' = 'hijri';

  /** Emits when date is selected with BOTH hijri and gregorian objects */
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

  private onChange:  (v: string) => void = function() {};
  private onTouched: () => void          = function() {};

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.injectStyles();
    const t = todayHijri();
    this.viewYear = t.year;
    this.viewMonth = t.month;
  }

  ngAfterViewInit(): void {
    this.buildWrapper();
    // Sync displayMode and dropdown to bindValue so Gregorian dates load correctly
    this.displayMode = this.bindValue;
    if (this.dropEl) { this.dropEl.value = this.bindValue; }
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.closePopup();
    if (this.wrapper) {
      this.wrapper.remove();
    }
  }

  writeValue(val: string): void {
    if (!val) {
      this.hijriStr = '';
      this.gregStr  = '';
      this.el.nativeElement.value = '';
      return;
    }

    const norm = this.normalise(val);
    if (!norm) { return; }

    if (this.bindValue === 'hijri') {
      this.hijriStr = norm;
      try { this.gregStr = hijriToGregorianStr(norm); } catch (e) { this.gregStr = ''; }
    } else {
      this.gregStr  = norm;
      try { this.hijriStr = gregorianToHijriStr(norm); } catch (e) { this.hijriStr = ''; }
    }

    this.updateDisplay();
    this.syncViewToCurrentValue();
  }

  registerOnChange(fn: (v: string) => void): void  { this.onChange  = fn; }
  registerOnTouched(fn: () => void): void           { this.onTouched = fn; }

  setDisabledState(disabled: boolean): void {
    this.el.nativeElement.disabled = disabled;
    if (this.dropEl) { this.dropEl.disabled = disabled; }
  }

  @HostListener('click')
  openPopup(): void {
    if (this.popup) { this.closePopup(); return; }
    this.onTouched();
    this.popup = document.createElement('div');
    this.popup.className = 'hcal-popup';
    document.body.appendChild(this.popup);
    this.renderCalendar();
    this.positionPopup();
    const self = this;
    requestAnimationFrame(function() {
      self.outsideClick = function(e: MouseEvent) {
        const inPopup = self.popup && self.popup.contains(e.target as Node);
        const inDrop  = self.dropEl && self.dropEl.contains(e.target as Node);
        if (!inPopup && !inDrop) { self.closePopup(); }
      };
      document.addEventListener('mousedown', self.outsideClick);
    });
  }

  closePopup(): void {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
    if (this.outsideClick) {
      document.removeEventListener('mousedown', this.outsideClick);
      this.outsideClick = null;
    }
  }

  private buildWrapper(): void {
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'hcal-wrapper');
    const parent = this.el.nativeElement.parentNode;
    this.renderer.insertBefore(parent, this.wrapper, this.el.nativeElement);
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);

    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'hcal-drop');
    this.renderer.setAttribute(this.dropEl, 'title', 'نوع التقويم');

    const options: Array<[string, string]> = [['hijri', 'هـ'], ['gregorian', 'م']];
    const self = this;
    options.forEach(function(item) {
      const opt = self.renderer.createElement('option');
      self.renderer.setProperty(opt, 'value', item[0]);
      self.renderer.setProperty(opt, 'textContent', item[1]);
      self.renderer.appendChild(self.dropEl, opt);
    });

    this.renderer.appendChild(this.wrapper, this.dropEl);

    this.renderer.listen(this.dropEl, 'change', function() {
      if (self.dropEl) {
        self.displayMode = self.dropEl.value as 'hijri' | 'gregorian';
      }
      self.syncViewToCurrentValue();
      self.updateDisplay();
      if (self.popup) { self.renderCalendar(); }
    });

    this.renderer.listen(this.dropEl, 'click', function(e: Event) { e.stopPropagation(); });
  }

  private renderCalendar(): void {
    if (!this.popup) { return; }
    this.popup.innerHTML = this.displayMode === 'hijri'
      ? this.buildHijriHtml()
      : this.buildGregHtml();

    const self = this;
    this.popup.addEventListener('mousedown', function(e: Event) { e.stopPropagation(); });

    const prevBtn = this.popup.querySelector('.hcal-prev');
    if (prevBtn) { prevBtn.addEventListener('click', function() { self.navigate(-1); }); }

    const nextBtn = this.popup.querySelector('.hcal-next');
    if (nextBtn) { nextBtn.addEventListener('click', function() { self.navigate(+1); }); }

    const cells = this.popup.querySelectorAll('[data-d]');
    for (let i = 0; i < cells.length; i++) {
      (function(cell: HTMLElement) {
        cell.addEventListener('click', function() { self.pickDay(+(cell.getAttribute('data-d') || '0')); });
      })(cells[i] as HTMLElement);
    }
  }

  private buildHijriHtml(): string {
    const today     = todayHijri();
    const totalDays = hijriDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow  = hijriDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = HIJRI_MONTH_NAMES[this.viewMonth - 1];
    const gEquiv    = hijriToGregorianStr(this.viewYear + '/' + pad2(this.viewMonth) + '/01');
    const gParts    = gEquiv.split('/');
    const gLabel    = GREG_MONTH_NAMES_AR[+gParts[1] - 1] + ' ' + gParts[0];

    const self = this;
    return this.buildGrid(
      monthName + ' ' + this.viewYear,
      gLabel + ' م',
      totalDays,
      firstDow,
      function(d: number) {
        return self.hijriStr === self.viewYear + '/' + pad2(self.viewMonth) + '/' + pad2(d);
      },
      function(d: number) {
        return today.year === self.viewYear && today.month === self.viewMonth && today.day === d;
      },
    );
  }

  private buildGregHtml(): string {
    const today     = todayGregorian();
    const totalDays = gregDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow  = gregDayOfWeek(this.viewYear, this.viewMonth, 1);
    const monthName = GREG_MONTH_NAMES_AR[this.viewMonth - 1];
    const hEquiv    = gregorianToHijriStr(this.viewYear + '/' + pad2(this.viewMonth) + '/01');
    const hParts    = hEquiv.split('/');
    const hLabel    = HIJRI_MONTH_NAMES[+hParts[1] - 1] + ' ' + hParts[0];

    const self = this;
    return this.buildGrid(
      monthName + ' ' + this.viewYear,
      hLabel + ' هـ',
      totalDays,
      firstDow,
      function(d: number) {
        return self.gregStr === self.viewYear + '/' + pad2(self.viewMonth) + '/' + pad2(d);
      },
      function(d: number) {
        return today.year === self.viewYear && today.month === self.viewMonth && today.day === d;
      },
    );
  }

  private buildGrid(
    mainTitle: string,
    subTitle: string,
    totalDays: number,
    firstDow: number,
    isSel: (d: number) => boolean,
    isToday: (d: number) => boolean,
  ): string {
    const heads = DAY_NAMES_SHORT_AR.map(function(h) { return '<th>' + h + '</th>'; }).join('');
    let cells = '';
    for (let i = 0; i < firstDow; i++) { cells += '<td></td>'; }
    for (let d = 1; d <= totalDays; d++) {
      const cls = isSel(d) ? 'sel' : isToday(d) ? 'tod' : '';
      cells += '<td class="' + cls + '" data-d="' + d + '">' + d + '</td>';
      if ((firstDow + d) % 7 === 0 && d < totalDays) { cells += '</tr><tr>'; }
    }
    return (
      '<div class="hcal-head">' +
        '<button class="hcal-btn hcal-prev">&#8249;</button>' +
        '<div class="hcal-title">' +
          '<span class="hcal-main">' + mainTitle + '</span>' +
          '<span class="hcal-sub">' + subTitle + '</span>' +
        '</div>' +
        '<button class="hcal-btn hcal-next">&#8250;</button>' +
      '</div>' +
      '<table class="hcal-grid" dir="rtl">' +
        '<thead><tr>' + heads + '</tr></thead>' +
        '<tbody><tr>' + cells + '</tr></tbody>' +
      '</table>'
    );
  }

  private navigate(delta: number): void {
    this.viewMonth += delta;
    if (this.viewMonth > 12) { this.viewMonth = 1;  this.viewYear++; }
    if (this.viewMonth < 1)  { this.viewMonth = 12; this.viewYear--; }
    this.renderCalendar();
  }

  private pickDay(day: number): void {
    const ds = this.viewYear + '/' + pad2(this.viewMonth) + '/' + pad2(day);

    let hijriObj: HijriDateObj;
    let gregObj: GregDateObj;

    if (this.displayMode === 'hijri') {
      this.hijriStr = ds;
      try { this.gregStr = hijriToGregorianStr(ds); } catch (e) { this.gregStr = ''; }
      hijriObj = { year: this.viewYear, month: this.viewMonth, day, formatted: ds };
      if (this.gregStr) {
        const p = this.gregStr.split('/').map(Number);
        gregObj = { year: p[0], month: p[1], day: p[2], formatted: this.gregStr };
      } else {
        gregObj = hijriToGregorian(this.viewYear, this.viewMonth, day);
      }
    } else {
      this.gregStr  = ds;
      try { this.hijriStr = gregorianToHijriStr(ds); } catch (e) { this.hijriStr = ''; }
      gregObj = { year: this.viewYear, month: this.viewMonth, day, formatted: ds };
      if (this.hijriStr) {
        const p = this.hijriStr.split('/').map(Number);
        hijriObj = { year: p[0], month: p[1], day: p[2], formatted: this.hijriStr };
      } else {
        hijriObj = gregorianToHijri(this.viewYear, this.viewMonth, day);
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
      const p = src.split('/');
      if (p.length === 3) {
        this.viewYear  = +p[0];
        this.viewMonth = +p[1];
        return;
      }
    }
    const t = this.displayMode === 'hijri' ? todayHijri() : todayGregorian();
    this.viewYear = t.year;
    this.viewMonth = t.month;
  }

  private positionPopup(): void {
    if (!this.popup) { return; }
    const ref = this.wrapper || this.el.nativeElement;
    const r = ref.getBoundingClientRect();
    this.popup.style.top   = (r.bottom + window.scrollY + 4) + 'px';
    this.popup.style.right = (document.documentElement.clientWidth - r.right - window.scrollX) + 'px';
  }

  private normalise(s: string): string | null {
    const parts = s.split(/[\/\-\\]/);
    if (parts.length !== 3) { return null; }
    const nums = parts.map(function(x) { return +x; });
    if (nums.some(isNaN)) { return null; }
    const a = nums[0], b = nums[1], c = nums[2];
    const y = a > 100 ? a : c;
    const m = b;
    const d = a > 100 ? c : a;
    return y + '/' + pad2(m) + '/' + pad2(d);
  }

  private injectStyles(): void {
    if (document.getElementById('hcal-css')) { return; }
    const s = document.createElement('style');
    s.id = 'hcal-css';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }
}

const STYLES = `
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