import {
  AfterViewInit, Directive, ElementRef, HostListener,
  Input, OnDestroy, Renderer2, forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// ── Shared Library Import ──────────────────────────────────────────────────
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
  private viewYear: number;
  private viewMonth: number;

  private wrapper: HTMLElement | null = null;
  private dropEl: HTMLSelectElement | null = null;
  private popup: HTMLElement | null = null;
  private outsideClick: ((e: MouseEvent) => void) | null = null;

  private onChange: (v: string) => void = function() {};
  private onTouched: () => void = function() {};

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
    this.updateDisplay();
  }

  ngOnDestroy(): void {
    this.closePopup();
    if (this.wrapper) { this.wrapper.remove(); }
  }

  writeValue(val: string): void {
    if (!val) {
      this.hijriStr = '';
      this.gregStr  = '';
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
    if (this.popup) { this.popup.remove(); this.popup = null; }
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
      if (self.dropEl) { self.displayMode = self.dropEl.value as 'hijri' | 'gregorian'; }
      self.syncViewToCurrentValue();
      self.updateDisplay();
      if (self.popup) { self.renderCalendar(); }
    });
  }

  private renderCalendar(): void {
    if (!this.popup) { return; }
    this.popup.innerHTML = this.displayMode === 'hijri'
      ? this.buildHijriHtml()
      : this.buildGregHtml();

    const prevBtn = this.popup.querySelector('.hcal-prev');
    if (prevBtn) { prevBtn.addEventListener('click', () => this.navigate(-1)); }

    const nextBtn = this.popup.querySelector('.hcal-next');
    if (nextBtn) { nextBtn.addEventListener('click', () => this.navigate(+1)); }

    const cells = this.popup.querySelectorAll('[data-d]');
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i] as HTMLElement;
      cell.addEventListener('click', () => this.pickDay(+cell.getAttribute('data-d')));
    }
  }

  private buildHijriHtml(): string {
    const today     = todayHijri();
    const totalDays = hijriDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow  = hijriDayOfWeek(this.viewYear, this.viewMonth, 1);
    return this.buildGrid(
      HIJRI_MONTH_NAMES[this.viewMonth - 1] + ' ' + this.viewYear,
      'هجري', totalDays, firstDow,
      (d) => this.hijriStr === this.viewYear + '/' + pad2(this.viewMonth) + '/' + pad2(d),
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d
    );
  }

  private buildGregHtml(): string {
    const today     = todayGregorian();
    const totalDays = gregDaysInMonth(this.viewYear, this.viewMonth);
    const firstDow  = gregDayOfWeek(this.viewYear, this.viewMonth, 1);
    return this.buildGrid(
      GREG_MONTH_NAMES_AR[this.viewMonth - 1] + ' ' + this.viewYear,
      'ميلادي', totalDays, firstDow,
      (d) => this.gregStr === this.viewYear + '/' + pad2(this.viewMonth) + '/' + pad2(d),
      (d) => today.year === this.viewYear && today.month === this.viewMonth && today.day === d
    );
  }

  private buildGrid(mainTitle: string, subTitle: string, totalDays: number, firstDow: number, isSel: (d: number) => boolean, isToday: (d: number) => boolean): string {
    const heads = DAY_NAMES_SHORT_AR.map(h => '<th>' + h + '</th>').join('');
    let cells = '';
    for (let i = 0; i < firstDow; i++) { cells += '<td></td>'; }
    for (let d = 1; d <= totalDays; d++) {
      const cls = isSel(d) ? 'sel' : isToday(d) ? 'tod' : '';
      cells += '<td class="' + cls + '" data-d="' + d + '">' + d + '</td>';
      if ((firstDow + d) % 7 === 0 && d < totalDays) { cells += '</tr><tr>'; }
    }
    return `
      <div class="hcal-head">
        <button class="hcal-btn hcal-prev">‹</button>
        <div class="hcal-title"><span class="hcal-main">${mainTitle}</span><span class="hcal-sub">${subTitle}</span></div>
        <button class="hcal-btn hcal-next">›</button>
      </div>
      <table class="hcal-grid" dir="rtl">
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
    const ds = this.viewYear + '/' + pad2(this.viewMonth) + '/' + pad2(day);
    if (this.displayMode === 'hijri') {
      this.hijriStr = ds;
      this.gregStr = hijriToGregorianStr(ds);
    } else {
      this.gregStr  = ds;
      this.hijriStr = gregorianToHijriStr(ds);
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
      const p = src.split('/');
      if (p.length === 3) { this.viewYear = +p[0]; this.viewMonth = +p[1]; return; }
    }
    const t = this.displayMode === 'hijri' ? todayHijri() : todayGregorian();
    this.viewYear = t.year; this.viewMonth = t.month;
  }

  private positionPopup(): void {
    if (!this.popup) return;
    const ref = this.wrapper || this.el.nativeElement;
    const r = ref.getBoundingClientRect();
    this.popup.style.top   = (r.bottom + window.scrollY + 4) + 'px';
    this.popup.style.right = (document.documentElement.clientWidth - r.right - window.scrollX) + 'px';
  }

  private injectStyles(): void {
    if (document.getElementById('hcal-css')) return;
    const s = document.createElement('style');
    s.id = 'hcal-css';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }
}

const STYLES = `
.hcal-wrapper { display: flex; align-items: center; gap: 6px; width: 100%; position: relative; }
.hcal-drop { padding: 0 6px; height: 38px; border: 1px solid #d0d7de; border-radius: 8px; background: #f8fafc; cursor: pointer; font-weight: 700; width: 50px; }
.hcal-popup { position: absolute; z-index: 9999; background: #fff; border: 1px solid #d0d7de; border-radius: 12px; box-shadow: 0 8px 28px rgba(0,0,0,.15); padding: 14px; min-width: 280px; direction: rtl; }
.hcal-head { display: flex; align-items: center; justify-content: space-between; }
.hcal-title { text-align: center; }
.hcal-main { display: block; font-weight: 700; }
.hcal-sub { font-size: 11px; color: #999; }
.hcal-btn { background: none; border: none; font-size: 24px; cursor: pointer; }
.hcal-grid { width: 100%; border-collapse: collapse; }
.hcal-grid td { padding: 8px; cursor: pointer; border-radius: 50%; }
.hcal-grid td.tod { color: #1967d2; font-weight: bold; }
.hcal-grid td.sel { background: #1967d2; color: #fff; }
`;
