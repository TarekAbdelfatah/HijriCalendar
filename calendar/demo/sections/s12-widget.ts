import * as H from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

/**
 * Full interactive Hijri Calendar Widget section.
 * Renders its own calendar grid (no dependency on PremiumCalendar class).
 */
export function renderWidget(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-widget">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🖱️</div>
    <div class="sec-meta">
      <h2 class="sec-title">التقويم التفاعلي</h2>
      <p class="sec-desc">مكوّن تقويم كامل مبني بالكامل من دوال المكتبة — اختر تاريخاً لتحويله</p>
    </div>
  </div>

  <div class="sec-body">

    <div class="demo-zone">
      <div class="widget-demo-wrap">

        <!-- Calendar widget -->
        <div id="wgt-calendar-container" style="flex-shrink:0;"></div>

        <!-- Result panel -->
        <div class="widget-result-panel">
          <div class="widget-result-label">التاريخ المختار</div>
          <div id="wgt-hijri-display" class="widget-result-hijri" style="font-size:1.4rem;">—</div>
          <div id="wgt-hijri-name" style="font-size:.9rem; color:var(--txt2); margin-bottom:1rem;">اختر تاريخاً من التقويم</div>

          <div class="widget-result-label" style="margin-top:.5rem;">الميلادي المقابل</div>
          <div id="wgt-greg-display" class="widget-result-greg">—</div>

          <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid var(--bdr);">
            <div class="widget-result-label">يوم الأسبوع</div>
            <div id="wgt-day-name" class="widget-result-day" style="font-size:1rem; color:var(--txt);"></div>
          </div>

          <!-- Object output -->
          <div id="wgt-obj-output" style="
            margin-top:1rem;
            background:var(--code-bg);
            border:1px solid var(--code-bdr);
            border-radius:8px;
            padding:.75rem 1rem;
            font-family:'Fira Code',monospace;
            font-size:.77rem;
            color:var(--code-txt);
            direction:ltr;
            text-align:left;
            line-height:1.7;
            display:none;
          "></div>
        </div>
      </div>
    </div>

    ${codeBlock({
  vanilla: `import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  todayHijri, hijriToGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR,
} from './hijri-calendar.lib';

/** بناء تقويم شهر هجري - Vanilla JS */
function buildCalendar(year: number, month: number, onSelect?: (day: number) => void) {
  const daysCount  = hijriDaysInMonth(year, month);
  const firstJD    = hijriToJD(year, month, 1);
  const startDay   = dayOfWeekForJD(firstJD);

  const wrapper = document.createElement('div');
  wrapper.className = 'hcal-ui-container';

  wrapper.innerHTML = \`
    <div class="hcal-ui-header">
      <span class="hcal-ui-month-name">\${HIJRI_MONTH_NAMES[month - 1]}</span>
      <span class="hcal-ui-year-label">\${year} هـ</span>
    </div>
    <div class="hcal-ui-grid">
      \${DAY_NAMES_SHORT_AR.map(d => \`<div class="hcal-ui-weekday">\${d}</div>\`).join('')}
      \${Array(startDay).fill('<div class="hcal-ui-day hcal-ui-empty"></div>').join('')}
      \${Array.from({ length: daysCount }, (_, i) => \`
        <div class="hcal-ui-day" data-day="\${i+1}">\${i+1}</div>
      \`).join('')}
    </div>
  \`;

  wrapper.querySelectorAll('.hcal-ui-day[data-day]').forEach(cell => {
    cell.addEventListener('click', () => onSelect?.(parseInt(cell.dataset.day!)));
  });

  return wrapper;
}

// استخدام:
const cal = buildCalendar(1447, 10, (day) => {
  console.log('اختير اليوم:', day);
});
document.body.appendChild(cal);`,
  angular: `import { Component, signal } from '@angular/core';
import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  todayHijri, hijriToGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR,
} from './hijri-calendar.lib';

@Component({
  selector: 'app-hijri-calendar',
  standalone: true,
  template: \`
    <div class="hcal-ui-container">
      <div class="hcal-ui-header">
        <span class="hcal-ui-month-name">{{ monthName }}</span>
        <span class="hcal-ui-year-label">{{ year }} هـ</span>
      </div>
      <div class="hcal-ui-grid">
        @for (day of weekdays; track day) {
          <div class="hcal-ui-weekday">{{ day }}</div>
        }
        @for (empty of emptyDays; track $index) {
          <div class="hcal-ui-day hcal-ui-empty"></div>
        }
        @for (day of days; track day) {
          <div class="hcal-ui-day" (click)="selectDay(day)">{{ day }}</div>
        }
      </div>
    </div>
  \`
})
export class HijriCalendarComponent {
  today = todayHijri();
  year = this.today.year;
  month = this.today.month;
  selectedDay = signal<number | null>(null);

  get monthName() { return HIJRI_MONTH_NAMES[this.month - 1]; }
  get weekdays() { return DAY_NAMES_SHORT_AR; }
  get days() { return Array.from({ length: hijriDaysInMonth(this.year, this.month) }, (_, i) => i + 1); }
  get emptyDays() { return Array(dayOfWeekForJD(hijriToJD(this.year, this.month, 1))); }

  selectDay(day: number) {
    this.selectedDay.set(day);
    const greg = hijriToGregorian(this.year, this.month, day);
    console.log('اختير:', day, '→', greg.formatted);
  }
}`,
  legacy: `import { Component } from '@angular/core';
import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  todayHijri, hijriToGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR,
} from './hijri-calendar.lib';

@Component({
  selector: 'app-hijri-calendar',
  template: \`
    <div class="hcal-ui-container">
      <div class="hcal-ui-header">
        <span class="hcal-ui-month-name">{{ monthName }}</span>
        <span class="hcal-ui-year-label">{{ year }} هـ</span>
      </div>
      <div class="hcal-ui-grid">
        <div *ngFor="let day of weekdays" class="hcal-ui-weekday">{{ day }}</div>
        <div *ngFor="let empty of emptyDays" class="hcal-ui-day hcal-ui-empty"></div>
        <div *ngFor="let day of days" class="hcal-ui-day" (click)="selectDay(day)">{{ day }}</div>
      </div>
    </div>
  \`
})
export class HijriCalendarComponent {
  today = todayHijri();
  year = this.today.year;
  month = this.today.month;
  selectedDay: number | null = null;

  get monthName() { return HIJRI_MONTH_NAMES[this.month - 1]; }
  get weekdays() { return DAY_NAMES_SHORT_AR; }
  get days() { return Array.from({ length: hijriDaysInMonth(this.year, this.month) }, (_, i) => i + 1); }
  get emptyDays() { return Array(dayOfWeekForJD(hijriToJD(this.year, this.month, 1))); }

  selectDay(day: number) {
    this.selectedDay = day;
    const greg = hijriToGregorian(this.year, this.month, day);
    console.log('اختير:', day, '→', greg.formatted);
  }
}`
}, 'typescript', 'Calendar Widget — بناء تقويم بالمكتبة')}

  </div>
</section>`;

  // ─── Init calendar widget ───────────────────────────────────────────────────
  const today = H.todayHijri();
  let curYear = today.year;
  let curMonth = today.month;
  let selectedDate: { year: number; month: number; day: number } | null = null;

  function renderCal(): void {
    const container = document.getElementById('wgt-calendar-container')!;
    const days = H.hijriDaysInMonth(curYear, curMonth);
    const firstJD = H.hijriToJD(curYear, curMonth, 1);
    const startDay = H.dayOfWeekForJD(firstJD);

    const todayH = H.todayHijri();
    const isCurrentMonth = (todayH.year === curYear && todayH.month === curMonth);

    container.innerHTML = `
      <div class="hcal-ui-container" style="width:310px;">
        <div class="hcal-ui-header">
          <div class="hcal-ui-title-group">
            <span class="hcal-ui-month-name">${H.HIJRI_MONTH_NAMES[curMonth - 1]}</span>
            <span class="hcal-ui-year-label">${curYear} هـ</span>
          </div>
          <div class="hcal-ui-controls">
            <button class="hcal-ui-nav-btn" id="wgt-prev">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="hcal-ui-nav-btn" id="wgt-next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="hcal-ui-grid">
          ${H.DAY_NAMES_SHORT_AR.map(d => `<div class="hcal-ui-weekday">${d}</div>`).join('')}
          ${Array(startDay).fill('<div class="hcal-ui-day hcal-ui-empty"></div>').join('')}
          ${Array.from({ length: days }, (_, i) => {
            const day = i + 1;
            const isTodayCel = isCurrentMonth && todayH.day === day;
            const isSelCel   = selectedDate?.year === curYear && selectedDate?.month === curMonth && selectedDate?.day === day;
            let cls = 'hcal-ui-day';
            if (isTodayCel) cls += ' is-today';
            if (isSelCel)   cls += ' is-selected';
            return `<div class="${cls}" data-day="${day}">${day}</div>`;
          }).join('')}
        </div>

        <div class="hcal-ui-footer">
          <span class="hcal-ui-today-link" id="wgt-goto-today">اليوم</span>
          <span style="font-size:.7rem; color:var(--code-cmt);">أم القرى</span>
        </div>
      </div>`;

    // Events
    container.querySelector('#wgt-prev')?.addEventListener('click', () => {
      if (--curMonth < 1) { curMonth = 12; curYear--; }
      renderCal();
    });
    container.querySelector('#wgt-next')?.addEventListener('click', () => {
      if (++curMonth > 12) { curMonth = 1; curYear++; }
      renderCal();
    });
    container.querySelector('#wgt-goto-today')?.addEventListener('click', () => {
      const t = H.todayHijri();
      curYear = t.year; curMonth = t.month;
      renderCal();
    });

    container.querySelectorAll('.hcal-ui-day[data-day]').forEach(cell => {
      cell.addEventListener('click', () => {
        const day = parseInt((cell as HTMLElement).dataset['day']!);
        selectedDate = { year: curYear, month: curMonth, day };
        updateResult(selectedDate);
        renderCal();
      });
    });
  }

  function updateResult(date: { year: number; month: number; day: number }): void {
    const greg  = H.hijriToGregorian(date.year, date.month, date.day);
    const dayIdx = H.hijriDayOfWeek(date.year, date.month, date.day);
    const monthName = H.HIJRI_MONTH_NAMES[date.month - 1];
    const dayName = H.DAY_NAMES_AR[dayIdx];
    const gregMonths = ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

    set('wgt-hijri-display', `${date.year}/${String(date.month).padStart(2,'0')}/${String(date.day).padStart(2,'0')}`);
    set('wgt-hijri-name', `${date.day} ${monthName} ${date.year} هـ`);
    set('wgt-greg-display', `${greg.day} ${gregMonths[greg.month-1]} ${greg.year} م`);
    set('wgt-day-name', dayName);

    const objEl = document.getElementById('wgt-obj-output')!;
    objEl.style.display = 'block';
    objEl.innerHTML = `<span style="color:var(--code-cmt)">// التاريخ المختار</span>
<span style="color:var(--code-kw)">const</span> hijri <span style="color:var(--code-op)">=</span> { year: <span style="color:var(--code-num)">${date.year}</span>, month: <span style="color:var(--code-num)">${date.month}</span>, day: <span style="color:var(--code-num)">${date.day}</span> };
<span style="color:var(--code-kw)">const</span> greg  <span style="color:var(--code-op)">=</span> { year: <span style="color:var(--code-num)">${greg.year}</span>, month: <span style="color:var(--code-num)">${greg.month}</span>, day: <span style="color:var(--code-num)">${greg.day}</span> };
<span style="color:var(--code-kw)">const</span> dayName <span style="color:var(--code-op)">=</span> <span style="color:var(--code-str)">"${dayName}"</span>;`;
  }

  renderCal();

  function set(id: string, text: string): void {
    const e = document.getElementById(id);
    if (e) e.textContent = text;
  }
}
