import * as H from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

/**
 * Section 14 — Date Selection Event (onDateSelect)
 * Shows a full working calendar with a visible callback/event system.
 */
export function renderEventHandling(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-events">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📡</div>
    <div class="sec-meta">
      <h2 class="sec-title">حدث اختيار التاريخ (onDateSelect)</h2>
      <p class="sec-desc">كيف تستقبل التاريخ المختار وتستجيب له — نمط callback كامل مع أمثلة عملية</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- ─── Live demo ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال تفاعلي — اختر تاريخاً وشاهد الحدث</span></div>
      <div class="card-body">
        <div class="demo-zone">

          <div style="display:grid; grid-template-columns:auto 1fr; gap:1.5rem; align-items:start;">

            <!-- Calendar -->
            <div id="evt-cal-wrap"></div>

            <!-- Event log + live output -->
            <div style="display:flex; flex-direction:column; gap:1rem; min-width:0;">

              <!-- Selected date display -->
              <div style="background:var(--surf2); border:1px solid var(--bdr); border-radius:10px; padding:1rem 1.25rem;">
                <div style="font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:var(--txt3); margin-bottom:.5rem;">التاريخ المختار</div>
                <div id="evt-selected-hijri" style="font-size:1.2rem; font-weight:700; color:var(--accent);">—</div>
                <div id="evt-selected-greg"  style="font-size:.85rem; color:var(--txt2); margin-top:.2rem;">اختر تاريخاً من التقويم</div>
                <div id="evt-selected-day"   style="font-size:.82rem; color:var(--txt3); margin-top:.2rem;"></div>
              </div>

              <!-- Event log -->
              <div style="background:var(--code-bg); border:1px solid var(--code-bdr); border-radius:10px; overflow:hidden;">
                <div style="display:flex; align-items:center; justify-content:space-between; padding:.5rem .875rem; border-bottom:1px solid var(--code-bdr);">
                  <span style="font-size:.75rem; font-weight:600; color:var(--code-txt); opacity:.7;">سجل الأحداث</span>
                  <button id="evt-clear-log" style="font-size:.7rem; padding:2px 8px; border-radius:4px; border:1px solid var(--code-bdr); background:transparent; color:var(--code-cmt); cursor:pointer;">مسح</button>
                </div>
                <div id="evt-log" style="
                  min-height:120px; max-height:180px;
                  overflow-y:auto;
                  padding:.625rem .875rem;
                  font-family:'Fira Code',monospace;
                  font-size:.75rem;
                  line-height:1.8;
                  direction:ltr;
                  text-align:left;
                  color:var(--code-cmt);
                ">
                  <span style="opacity:.5;">// في انتظار الاختيار…</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ─── Form integration demo ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال — ربط التقويم بحقول نموذج</span></div>
      <div class="card-body">
        <p style="font-size:.87rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          اختر تاريخاً من التقويم أعلاه لترى الحقول تتعبأ تلقائياً.
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:.75rem; margin-bottom:1rem;">
          <div class="inp-grp">
            <label class="inp-lbl">التاريخ الهجري</label>
            <input class="inp" id="form-hijri" readonly placeholder="اختر من التقويم" style="background:var(--surf2);">
          </div>
          <div class="inp-grp">
            <label class="inp-lbl">التاريخ الميلادي</label>
            <input class="inp" id="form-greg" readonly placeholder="اختر من التقويم" style="background:var(--surf2);">
          </div>
          <div class="inp-grp">
            <label class="inp-lbl">يوم الأسبوع</label>
            <input class="inp" id="form-day" readonly placeholder="—" style="background:var(--surf2);">
          </div>
          <div class="inp-grp">
            <label class="inp-lbl">رقم اليوم الجولياني (JD)</label>
            <input class="inp" id="form-jd" readonly placeholder="—" style="background:var(--surf2); font-family:monospace;">
          </div>
        </div>

        <div id="form-status" style="
          padding:.625rem 1rem;
          border-radius:8px;
          font-size:.83rem;
          display:none;
          background:var(--ok-bg);
          border:1px solid var(--ok-bdr);
          color:var(--ok);
        "></div>

        ${codeBlock({
  vanilla: `// ربط callback التقويم بحقول نموذج
buildCalendar(container, year, month, {
  onDateSelect: ({ hijri, greg, dayName, jd }) => {
    document.getElementById('form-hijri').value = hijri.formatted;
    document.getElementById('form-greg').value  = greg.formatted;
    document.getElementById('form-day').value   = dayName;
    document.getElementById('form-jd').value    = String(jd);
  }
});`,
  angular: `// في Angular - استخدم الـ signal
@Component({ ... })
export class HijriCalendarComponent {
  selectedDate = signal<{ hijri: any; greg: any; dayName: string; jd: number } | null>(null);

  onSelect(day: number) {
    const greg = hijriToGregorian(this.year, this.month, day);
    const dayName = DAY_NAMES_AR[hijriDayOfWeek(this.year, this.month, day)];
    const jd = hijriToJD(this.year, this.month, day);
    this.selectedDate.set({
      hijri: { year: this.year, month: this.month, day },
      greg, dayName, jd
    });
  }
}`,
  legacy: `// في Angular 7-13 - استخدم property
@Component({ ... })
export class HijriCalendarComponent {
  selectedDate: { hijri: any; greg: any; dayName: string; jd: number } | null = null;

  onSelect(day: number) {
    const greg = hijriToGregorian(this.year, this.month, day);
    const dayName = DAY_NAMES_AR[hijriDayOfWeek(this.year, this.month, day)];
    const jd = hijriToJD(this.year, this.month, day);
    this.selectedDate = {
      hijri: { year: this.year, month: this.month, day },
      greg, dayName, jd
    };
  }
}`
}, 'typescript', 'ربط بالنموذج')}
      </div>
    </div>

    <!-- ─── Code: how to build the callback calendar ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الكود الكامل — بناء تقويم مع callback</span></div>
      <div class="card-body">
        ${codeBlock({
  vanilla: `import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  hijriToGregorian, hijriDayOfWeek,
  todayHijri,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR, DAY_NAMES_AR,
  HijriDateObj, GregDateObj,
} from './hijri-calendar.lib';

// ── نوع بيانات الحدث ──────────────────────────────────────────
interface DateSelectEvent {
  hijri:   HijriDateObj;
  greg:    GregDateObj;
  dayName: string;
  jd:      number;
}

// ── خيارات بناء التقويم ───────────────────────────────────────
interface CalendarOptions {
  onDateSelect?: (event: DateSelectEvent) => void;
}

// ── دالة البناء الرئيسية ──────────────────────────────────────
function buildCalendar(
  container: HTMLElement,
  year: number,
  month: number,
  options: CalendarOptions = {}
): void {
  const daysCount = hijriDaysInMonth(year, month);
  const firstJD   = hijriToJD(year, month, 1);
  const startDay  = dayOfWeekForJD(firstJD);
  const todayH    = todayHijri();

  container.innerHTML = \`
    <div class="hcal-ui-container">
      <div class="hcal-ui-header">
        <span class="hcal-ui-month-name">\${HIJRI_MONTH_NAMES[month - 1]}</span>
        <span class="hcal-ui-year-label">\${year} هـ</span>
      </div>
      <div class="hcal-ui-grid">
        \${DAY_NAMES_SHORT_AR.map(d => \`<div class="hcal-ui-weekday">\${d}</div>\`).join('')}
        \${Array(startDay).fill('<div class="hcal-ui-day hcal-ui-empty"></div>').join('')}
        \${Array.from({ length: daysCount }, (_, i) => {
          const day = i + 1;
          const isToday = todayH.year === year && todayH.month === month && todayH.day === day;
          return \`<div class="hcal-ui-day\${isToday ? ' is-today' : ''}" data-day="\${day}">\${day}</div>\`;
        }).join('')}
      </div>
    </div>
  \`;

  container.querySelectorAll('.hcal-ui-day[data-day]').forEach(cell => {
    cell.addEventListener('click', () => {
      const day = parseInt((cell as HTMLElement).dataset['day']!);
      const hijri = { year, month, day, formatted: \`\${year}/\${String(month).padStart(2,'0')}/\${String(day).padStart(2,'0')}\` };
      const greg = hijriToGregorian(year, month, day);
      const dayIdx = hijriDayOfWeek(year, month, day);
      const dayName = DAY_NAMES_AR[dayIdx];
      const jd = hijriToJD(year, month, day);
      options.onDateSelect?.({ hijri, greg, dayName, jd });
    });
  });
}

// استخدام:
const container = document.getElementById('cal')!;
buildCalendar(container, 1447, 10, {
  onDateSelect: (e) => console.log('اختير:', e.hijri.formatted, '→', e.greg.formatted)
});`,
  angular: `import { Component, signal } from '@angular/core';
import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  hijriToGregorian, hijriDayOfWeek, todayHijri,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR, DAY_NAMES_AR,
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
          <div class="hcal-ui-day" [class.is-today]="isToday(day)" (click)="onSelect(day)">{{ day }}</div>
        }
      </div>
    </div>
  \`
})
export class HijriCalendarComponent {
  year = 1447; month = 10;
  selectedDay = signal<number | null>(null);

  get monthName() { return HIJRI_MONTH_NAMES[this.month - 1]; }
  get weekdays() { return DAY_NAMES_SHORT_AR; }
  get days() { return Array.from({ length: hijriDaysInMonth(this.year, this.month) }, (_, i) => i + 1); }
  get emptyDays() { return Array(dayOfWeekForJD(hijriToJD(this.year, this.month, 1))); }

  isToday(day: number): boolean {
    const t = todayHijri();
    return t.year === this.year && t.month === this.month && t.day === day;
  }

  onSelect(day: number) {
    this.selectedDay.set(day);
    const greg = hijriToGregorian(this.year, this.month, day);
    const dayName = DAY_NAMES_AR[hijriDayOfWeek(this.year, this.month, day)];
    console.log('onDateSelect:', { hijri: { year: this.year, month: this.month, day }, greg, dayName });
  }
}`,
  legacy: `import { Component } from '@angular/core';
import {
  hijriDaysInMonth, hijriToJD, dayOfWeekForJD,
  hijriToGregorian, hijriDayOfWeek, todayHijri,
  HIJRI_MONTH_NAMES, DAY_NAMES_SHORT_AR, DAY_NAMES_AR,
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
        <div *ngFor="let day of days" class="hcal-ui-day" [class.is-today]="isToday(day)" (click)="onSelect(day)">{{ day }}</div>
      </div>
    </div>
  \`
})
export class HijriCalendarComponent {
  year = 1447; month = 10;
  selectedDay: number | null = null;

  get monthName() { return HIJRI_MONTH_NAMES[this.month - 1]; }
  get weekdays() { return DAY_NAMES_SHORT_AR; }
  get days() { return Array.from({ length: hijriDaysInMonth(this.year, this.month) }, (_, i) => i + 1); }
  get emptyDays() { return Array(dayOfWeekForJD(hijriToJD(this.year, this.month, 1))); }

  isToday(day: number): boolean {
    const t = todayHijri();
    return t.year === this.year && t.month === this.month && t.day === day;
  }

  onSelect(day: number) {
    this.selectedDay = day;
    const greg = hijriToGregorian(this.year, this.month, day);
    const dayName = DAY_NAMES_AR[hijriDayOfWeek(this.year, this.month, day)];
    console.log('onDateSelect:', { hijri: { year: this.year, month: this.month, day }, greg, dayName });
  }
}`
}, 'typescript', 'الكود الكامل')}
      </div>
    </div>

    <!-- ─── Patterns ─── -->
      </div>
    </div>

    <!-- ─── Patterns ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">أنماط شائعة لاستخدام الحدث</span></div>
      <div class="card-body">
        <div style="display:grid; gap:.75rem;">

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">1. تصفية جدول بيانات</div>
            ${codeBlock({
  vanilla: `onDateSelect: ({ greg }) => {
  const rows = document.querySelectorAll('tr[data-date]');
  rows.forEach(row => {
    const match = row.dataset.date === greg.formatted;
    (row as HTMLElement).style.display = match ? '' : 'none';
  });
}`,
  angular: `// Angular - filtering with signals
@Component({ ... })
export class DataTableComponent {
  filteredDate = signal<string>('');

  onDateSelect({ greg }: DateSelectEvent) {
    this.filteredDate.set(greg.formatted);
  }

  get filteredRows() {
    return this.rows.filter(r => r.date === this.filteredDate());
  }
}`,
  legacy: `// Angular 7-13 - filtering
@Component({ ... })
export class DataTableComponent {
  filteredDate: string = '';

  onDateSelect({ greg }: DateSelectEvent) {
    this.filteredDate = greg.formatted;
  }
}`
})}
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">2. حساب الفرق بين تاريخين</div>
            ${codeBlock({
  vanilla: `let firstDate: { jd: number } | null = null;

onDateSelect: ({ hijri, jd }) => {
  if (!firstDate) {
    firstDate = { jd };
    showMessage(\`التاريخ الأول: \${hijri.formatted}\`);
  } else {
    const diff = Math.abs(jd - firstDate.jd);
    showMessage(\`الفرق: \${diff} يوماً\`);
    firstDate = null;
  }
}`,
  angular: `// Angular - use signals
firstDate = signal<number | null>(null);

onSelect({ hijri, jd }: DateSelectEvent) {
  if (!this.firstDate()) {
    this.firstDate.set(jd);
  } else {
    const diff = Math.abs(jd - this.firstDate()!);
    showMessage(\`الفرق: \${diff} يوماً\`);
    this.firstDate.set(null);
  }
}`,
  legacy: `// Angular 7-13
firstDate: number | null = null;

onSelect({ hijri, jd }: DateSelectEvent) {
  if (!this.firstDate) {
    this.firstDate = jd;
  } else {
    const diff = Math.abs(jd - this.firstDate);
    showMessage(\`الفرق: \${diff} يوماً\`);
    this.firstDate = null;
  }
}`
})}
          </div>



        </div>
      </div>
    </div>

  </div>
</section>`;

  // ── Init ──────────────────────────────────────────────────────────────────
  const today = H.todayHijri();
  let curYear  = today.year;
  let curMonth = today.month;
  let selectedDay: number | null = null;

  // Event log
  const logEl    = document.getElementById('evt-log')!;
  let logCount   = 0;
  let logCleared = false;

  function addLogEntry(event: DateSelectPayload): void {
    if (!logCleared && logCount === 0) {
      logEl.innerHTML = '';
    }
    logCount++;
    const now = new Date();
    const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    const line = document.createElement('div');
    line.innerHTML =
      `<span style="color:var(--code-cmt)">[${ts}]</span> ` +
      `<span style="color:var(--code-kw)">onDateSelect</span>` +
      `<span style="color:var(--code-op)">(</span>` +
      `<span style="color:var(--code-str)">"${event.hijri.formatted}"</span>` +
      `<span style="color:var(--code-op)"> → </span>` +
      `<span style="color:var(--code-str)">"${event.greg.formatted}"</span>` +
      `<span style="color:var(--code-op)">)</span>` +
      ` <span style="color:var(--code-cmt)">// ${event.dayName}</span>`;
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  document.getElementById('evt-clear-log')?.addEventListener('click', () => {
    logEl.innerHTML = '<span style="opacity:.5;">// تم مسح السجل…</span>';
    logCount   = 0;
    logCleared = true;
  });

  // Render calendar
  function renderCal(): void {
    const wrap = document.getElementById('evt-cal-wrap')!;
    const days     = H.hijriDaysInMonth(curYear, curMonth);
    const firstJD  = H.hijriToJD(curYear, curMonth, 1);
    const startDay = H.dayOfWeekForJD(firstJD);
    const todayH   = H.todayHijri();

    wrap.innerHTML = `
      <div class="hcal-ui-container" style="width:300px;">
        <div class="hcal-ui-header">
          <div class="hcal-ui-title-group">
            <span class="hcal-ui-month-name">${H.HIJRI_MONTH_NAMES[curMonth - 1]}</span>
            <span class="hcal-ui-year-label">${curYear} هـ</span>
          </div>
          <div class="hcal-ui-controls">
            <button class="hcal-ui-nav-btn" id="evt-prev">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="hcal-ui-nav-btn" id="evt-next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="hcal-ui-grid">
          ${H.DAY_NAMES_SHORT_AR.map(d => `<div class="hcal-ui-weekday">${d}</div>`).join('')}
          ${Array(startDay).fill('<div class="hcal-ui-day hcal-ui-empty"></div>').join('')}
          ${Array.from({ length: days }, (_, i) => {
            const day      = i + 1;
            const isToday  = todayH.year === curYear && todayH.month === curMonth && todayH.day === day;
            const isSel    = selectedDay === day;
            let cls = 'hcal-ui-day';
            if (isToday) cls += ' is-today';
            if (isSel)   cls += ' is-selected';
            return `<div class="${cls}" data-day="${day}">${day}</div>`;
          }).join('')}
        </div>

        <div class="hcal-ui-footer">
          <span class="hcal-ui-today-link" id="evt-goto-today">اليوم</span>
          <span style="font-size:.7rem; color:var(--code-cmt);">انقر يوماً لتشغيل الحدث</span>
        </div>
      </div>`;

    // Nav
    wrap.querySelector('#evt-prev')?.addEventListener('click', () => {
      if (--curMonth < 1) { curMonth = 12; curYear--; }
      selectedDay = null;
      renderCal();
    });
    wrap.querySelector('#evt-next')?.addEventListener('click', () => {
      if (++curMonth > 12) { curMonth = 1; curYear++; }
      selectedDay = null;
      renderCal();
    });
    wrap.querySelector('#evt-goto-today')?.addEventListener('click', () => {
      const t = H.todayHijri();
      curYear = t.year; curMonth = t.month; selectedDay = null;
      renderCal();
    });

    // Day click → fire the event
    wrap.querySelectorAll('.hcal-ui-day[data-day]').forEach(cell => {
      cell.addEventListener('click', () => {
        const day     = parseInt((cell as HTMLElement).dataset['day']!);
        selectedDay   = day;

        const greg    = H.hijriToGregorian(curYear, curMonth, day);
        const jd      = H.hijriToJD(curYear, curMonth, day);
        const dayIdx  = H.hijriDayOfWeek(curYear, curMonth, day);
        const dayName = H.DAY_NAMES_AR[dayIdx];

        const hijriObj = {
          year: curYear, month: curMonth, day,
          formatted: `${curYear}/${String(curMonth).padStart(2,'0')}/${String(day).padStart(2,'0')}`,
        };

        const payload: DateSelectPayload = { hijri: hijriObj, greg, dayName, jd };

        // Update displays
        handleDateSelect(payload);
        renderCal();
      });
    });
  }

  function handleDateSelect(payload: DateSelectPayload): void {
    const { hijri, greg, dayName, jd } = payload;
    const gregMons = ['يناير','فبراير','مارس','إبريل','مايو','يونيو',
                      'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

    // Update live display
    setText('evt-selected-hijri', `${hijri.day} ${H.HIJRI_MONTH_NAMES[hijri.month - 1]} ${hijri.year} هـ`);
    setText('evt-selected-greg',  `${greg.day} ${gregMons[greg.month - 1]} ${greg.year} م`);
    setText('evt-selected-day',   `يوم الأسبوع: ${dayName}`);

    // Update form fields
    setVal('form-hijri', hijri.formatted);
    setVal('form-greg',  greg.formatted);
    setVal('form-day',   dayName);
    setVal('form-jd',    String(jd));

    const statusEl = document.getElementById('form-status');
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.textContent = `✓ تم تعبئة النموذج بتاريخ ${hijri.formatted} — ${dayName}`;
    }

    // Add to log
    addLogEntry(payload);
  }

  renderCal();
}

/* ── helpers ── */
interface DateSelectPayload {
  hijri:   { year: number; month: number; day: number; formatted: string };
  greg:    { year: number; month: number; day: number; formatted: string };
  dayName: string;
  jd:      number;
}

function setText(id: string, text: string): void {
  const e = document.getElementById(id);
  if (e) e.textContent = text;
}
function setVal(id: string, val: string): void {
  const e = document.getElementById(id) as HTMLInputElement | null;
  if (e) e.value = val;
}
