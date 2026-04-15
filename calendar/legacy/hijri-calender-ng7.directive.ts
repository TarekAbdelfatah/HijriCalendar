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
  DAY_NAMES_SHORT_AR,
  pad2, normaliseDateString, HijriDateObj, GregDateObj,
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
export class HijriCalenderDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

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

  ngOnInit(): void {
    // Set displayMode as early as possible so writeValue() uses the correct mode
    // if it is called (by Angular Forms) before ngAfterViewInit.
    this.displayMode = this.bindValue;
  }

  ngAfterViewInit(): void {
    this.buildWrapper();
    // Sync displayMode and dropdown to bindValue so Gregorian dates load correctly
    this.displayMode = this.bindValue;
    if (this.dropEl) { this.dropEl.value = this.bindValue; }
    // Re-sync viewYear/viewMonth now that displayMode is correct.
    // writeValue() may have already run (Angular calls it before ngAfterViewInit),
    // so we must re-sync here — otherwise the popup opens on the wrong month.
    this.syncViewToCurrentValue();
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.closePopup();
    if (this.wrapper) {
      this.wrapper.remove();
    }
  }

  writeValue(val: any): void {
    if (!val) {
      this.hijriStr = '';
      this.gregStr  = '';
      this.updateDisplay();
      return;
    }

    const norm = normaliseDateString(val);
    if (!norm) { 
      this.updateDisplay();
      return; 
    }

    // Smart detection: determine if input is Gregorian or Hijri based on the year.
    // Hijri range is 1276-1500, so >1600 is definitely Gregorian.
    const parts = norm.split('/').map(Number);
    const isGreg = parts[0] > 1600;

    if (isGreg) {
      this.gregStr = norm;
      try { this.hijriStr = gregorianToHijriStr(norm); } catch (e) { this.hijriStr = ''; }
    } else {
      this.hijriStr = norm;
      try { this.gregStr = hijriToGregorianStr(norm); } catch (e) { this.gregStr = ''; }
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
    this.popup.className = 'hci-popup';
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
    this.renderer.addClass(this.el.nativeElement, 'hcal-has-icon');

    this.dropEl = this.renderer.createElement('select');
    this.renderer.addClass(this.dropEl, 'hcal-drop');
    this.renderer.setAttribute(this.dropEl, 'title', 'نوع التقويم');

    const options: Array<[string, string]> = [['hijri', 'هـ'], ['gregorian', 'م']];
    const self = this;
    options.forEach(function(item) {
      const opt = self.renderer.createElement('option');
      self.renderer.setProperty(opt, 'value', item[0]);
      self.renderer.setProperty(opt, 'textContent', item[1]);
      if (item[0] === self.bindValue) {
        self.renderer.setProperty(opt, 'selected', true);
      }
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

    const prevBtn = this.popup.querySelector('.hci-prev');
    if (prevBtn) { prevBtn.addEventListener('click', function() { self.navigate(-1); }); }

    const nextBtn = this.popup.querySelector('.hci-next');
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
      const cls = isSel(d) ? 'hci-selected' : isToday(d) ? 'hci-today' : '';
      cells += '<td class="' + cls + '" data-d="' + d + '">' + d + '</td>';
      if ((firstDow + d) % 7 === 0 && d < totalDays) { cells += '</tr><tr>'; }
    }
    return (
      '<div class="hci-head">' +
        '<button class="hci-btn hci-prev">&#8249;</button>' +
        '<div class="hci-title">' +
          '<span class="hci-main">' + mainTitle + '</span>' +
          '<span class="hci-sub">' + subTitle + '</span>' +
        '</div>' +
        '<button class="hci-btn hci-next">&#8250;</button>' +
      '</div>' +
      '<table class="hci-grid" dir="rtl">' +
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
    this.popup.style.top      = (r.bottom + window.scrollY + 4) + 'px';
    this.popup.style.right    = (document.documentElement.clientWidth - r.right - window.scrollX) + 'px';
    this.popup.style.minWidth = r.width + 'px';
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
  font-family: 'Cairo','Segoe UI',Tahoma,sans-serif;
}

.hcal-drop {
  flex-shrink: 0;
  padding: 0 10px;
  height: 38px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #f0f4f1;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  min-width: 48px;
  color: #006C35;
  outline: none;
  transition: border-color .15s;
}
.hcal-drop:focus { border-color: #006C35; }

.hcal-has-icon {
  padding-inline-end: 32px !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23006C35' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 15px 15px;
}

.hci-popup {
  position: absolute;
  z-index: 9999;
  background: #fff;
  border: 1px solid #e0e5dc;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,106,53,0.15);
  padding: 16px;
  min-width: 300px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'Cairo','Segoe UI',Tahoma,sans-serif;
  direction: rtl;
}
.hci-head { display: flex; align-items: center; justify-content: space-between; margin-block-end: 12px; }
.hci-title { text-align: center; line-height: 1.4; flex: 1; }
.hci-main { display: block; font-weight: 700; font-size: 16px; color: #006C35; }
.hci-sub { display: block; font-size: 12px; color: #6b7280; }
.hci-btn { background: none; border: none; font-size: 26px; cursor: pointer; color: #006C35; padding: 4px 10px; border-radius: 8px; transition: background .12s; line-height: 1; }
.hci-btn:hover { background: #e8f5e9; }
.hci-grid { width: 100%; border-collapse: collapse; text-align: center; }
.hci-grid th { font-size: 12px; color: #6b7280; padding: 6px 4px; font-weight: 600; }
.hci-grid td { font-size: 14px; padding: 8px 4px; cursor: pointer; border-radius: 50%; color: #1f2937; transition: all .12s; width: 38px; height: 38px; }
.hci-grid td:empty { cursor: default; }
.hci-grid td:not(:empty):hover { background: #e8f5e9; color: #006C35; }
.hci-grid td.hci-today { background: #dcfce7; color: #006C35; font-weight: 700; }
.hci-grid td.hci-selected { background: #006C35 !important; color: #fff !important; font-weight: 700; }

@media (prefers-color-scheme: dark) {
  .hcal-drop { background: #374151; border-color: #4b5563; color: #22c55e; }
  .hcal-drop:focus { border-color: #22c55e; }
  .hcal-has-icon { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c55e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E"); }
  .hci-popup { background: #1f2937; border-color: #374151; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .hci-main { color: #22c55e; }
  .hci-sub { color: #9ca3af; }
  .hci-btn { color: #22c55e; }
  .hci-btn:hover { background: #374151; }
  .hci-grid th { color: #9ca3af; }
  .hci-grid td { color: #e5e7eb; }
  .hci-grid td:not(:empty):hover { background: #374151; color: #22c55e; }
  .hci-grid td.hci-today { background: #064e3b; color: #22c55e; }
  .hci-grid td.hci-selected { background: #22c55e !important; color: #fff !important; }
}
html.dark .hcal-drop { background: #374151; border-color: #4b5563; color: #22c55e; }
html.dark .hcal-drop:focus { border-color: #22c55e; }
html.dark .hcal-has-icon { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c55e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E"); }
html.dark .hci-popup { background: #1f2937; border-color: #374151; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
html.dark .hci-main { color: #22c55e; }
html.dark .hci-sub { color: #9ca3af; }
html.dark .hci-btn { color: #22c55e; }
html.dark .hci-btn:hover { background: #374151; }
html.dark .hci-grid th { color: #9ca3af; }
html.dark .hci-grid td { color: #e5e7eb; }
html.dark .hci-grid td:not(:empty):hover { background: #374151; color: #22c55e; }
html.dark .hci-grid td.hci-today { background: #064e3b; color: #22c55e; }
html.dark .hci-grid td.hci-selected { background: #22c55e !important; color: #fff !important; }
`;