import { todayHijri, todayGregorian, HIJRI_MONTH_NAMES, DAY_NAMES_AR, hijriDayOfWeek } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderToday(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-today">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📅</div>
    <div class="sec-meta">
      <h2 class="sec-title">اليوم الحالي</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">todayHijri()</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">todayGregorian()</code>
        — تاريخ اليوم الحقيقي من متصفحك
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Live demo -->
    <div class="demo-zone">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
        <span style="font-size:.8rem; font-weight:600; color:var(--txt2);">🔴 مباشر — يتجدد عند الضغط</span>
        <button class="btn btn-outline" id="refresh-today-btn" style="padding:5px 14px; font-size:.78rem;">
          ↺ تحديث
        </button>
      </div>

      <div class="live-grid">
        <div class="live-card">
          <span class="live-lbl" style="margin-bottom:.5rem; display:block;">todayHijri()</span>
          <span class="live-val" id="live-hijri-formatted" style="font-size:1.3rem;"></span>
          <span style="font-size:.88rem; color:var(--txt2); margin-top:.25rem; display:block;" id="live-hijri-name"></span>
          <span style="font-size:.75rem; color:var(--txt3); margin-top:.1rem; display:block;" id="live-hijri-day"></span>
        </div>
        <div class="live-card">
          <span class="live-lbl" style="margin-bottom:.5rem; display:block;">todayGregorian()</span>
          <span class="live-val" id="live-greg-formatted" style="font-size:1.3rem;"></span>
          <span style="font-size:.88rem; color:var(--txt2); margin-top:.25rem; display:block;" id="live-greg-name"></span>
          <span style="font-size:.75rem; color:var(--txt3); margin-top:.1rem; display:block;" id="live-greg-day"></span>
        </div>
      </div>

      <!-- Full object output -->
      <div style="margin-top:1rem;">
        <span style="font-size:.75rem; color:var(--txt3); font-weight:600; text-transform:uppercase; letter-spacing:.06em;">Object output</span>
        <div style="
          background:var(--code-bg); border:1px solid var(--code-bdr); border-radius:8px;
          padding:.875rem 1.25rem; margin-top:.4rem;
          font-family:'Fira Code',monospace; font-size:.82rem;
          color:var(--code-txt); direction:ltr; text-align:left; line-height:1.7;
        " id="today-obj-output"></div>
      </div>
    </div>

    <!-- Code snippet -->
    ${codeBlock({
  vanilla: `# Option 1: Pure JS - no import needed
var h = HijriCalendar.todayHijri();
console.log(h.formatted);               // "1447/10/14"

var g = HijriCalendar.todayGregorian();
console.log(g.formatted);               // "2026/04/12"

# Option 2: With Vite
import { todayHijri, todayGregorian } from './lib/hijri-calendar.lib';
const h = todayHijri();`,
  angular: `// In Angular component
import { Component } from '@angular/core';
import { todayHijri, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

@Component({
  selector: 'app-today',
  template: \`<p>Today: {{ hijri.formatted }}</p>\`
})
export class TodayComponent {
  hijri = todayHijri();
}`,
  legacy: `// Angular 7-13
import { Component } from '@angular/core';
import { todayHijri, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

@Component({
  selector: 'app-today',
  template: \`<p>Today: {{ hijri.formatted }}</p>\`
})
export class TodayComponent {
  hijri = todayHijri();
}`
}, 'typescript', 'Today')}

  </div>
</section>`;

  // Init live display
  refreshToday();
  document.getElementById('refresh-today-btn')?.addEventListener('click', refreshToday);
}

function refreshToday(): void {
  const h = todayHijri();
  const g = todayGregorian();
  const dayIdx = hijriDayOfWeek(h.year, h.month, h.day);
  const monthName = HIJRI_MONTH_NAMES[h.month - 1];
  const dayName = DAY_NAMES_AR[dayIdx];

  // Gregorian month names
  const gregMonths = ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

  set('live-hijri-formatted', h.formatted);
  set('live-hijri-name', `${h.day} ${monthName} ${h.year} هـ`);
  set('live-hijri-day', dayName);

  set('live-greg-formatted', g.formatted);
  set('live-greg-name', `${g.day} ${gregMonths[g.month - 1]} ${g.year} م`);
  set('live-greg-day', '');

  const objOut = document.getElementById('today-obj-output');
  if (objOut) {
    objOut.innerHTML = `<span style="color:var(--code-cmt)">// todayHijri()</span>
{ <span style="color:var(--code-kw)">year</span>: <span style="color:var(--code-num)">${h.year}</span>, <span style="color:var(--code-kw)">month</span>: <span style="color:var(--code-num)">${h.month}</span>, <span style="color:var(--code-kw)">day</span>: <span style="color:var(--code-num)">${h.day}</span>, <span style="color:var(--code-kw)">formatted</span>: <span style="color:var(--code-str)">"${h.formatted}"</span> }

<span style="color:var(--code-cmt)">// todayGregorian()</span>
{ <span style="color:var(--code-kw)">year</span>: <span style="color:var(--code-num)">${g.year}</span>, <span style="color:var(--code-kw)">month</span>: <span style="color:var(--code-num)">${g.month}</span>, <span style="color:var(--code-kw)">day</span>: <span style="color:var(--code-num)">${g.day}</span>, <span style="color:var(--code-kw)">formatted</span>: <span style="color:var(--code-str)">"${g.formatted}"</span> }`;
  }
}

function set(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
