import { codeBlock } from '../utils/code-block';

export function renderHero(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-hero">

  <div class="hero-wrap">
    <!-- Eyebrow -->
    <div class="hero-eyebrow">
      v1.0.0 &nbsp;·&nbsp; Zero Dependencies &nbsp;·&nbsp; Pure TypeScript &nbsp;·&nbsp; Umm al-Qura
    </div>

    <!-- Title -->
    <h1 class="hero-title">
      التقويم <em>الهجري</em><br>أم القرى
    </h1>

    <!-- Description -->
    <p class="hero-desc">
      مكتبة TypeScript خالصة لتحويل التواريخ الهجرية والميلادية بدقة 100%
      باستخدام جدول بيانات أم القرى الرسمي. تعمل في أي بيئة بدون أي اعتمادية خارجية.
    </p>

    <!-- Stats -->
    <div class="hero-stats">
      <div>
        <span class="hero-stat-val">0</span>
        <span class="hero-stat-lbl">اعتماديات خارجية</span>
      </div>
      <div>
        <span class="hero-stat-val">225</span>
        <span class="hero-stat-lbl">سنة هجرية مدعومة</span>
      </div>
      <div>
        <span class="hero-stat-val">1276–1500</span>
        <span class="hero-stat-lbl">النطاق الهجري</span>
      </div>
      <div>
        <span class="hero-stat-val">1859–2077</span>
        <span class="hero-stat-lbl">النطاق الميلادي</span>
      </div>
      <div>
        <span class="hero-stat-val">20+</span>
        <span class="hero-stat-lbl">دالة وثابت</span>
      </div>
    </div>
  </div>

  <!-- Quick Overview badges -->
  <div style="display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:.25rem;">
    <span class="badge badge-fn">todayHijri()</span>
    <span class="badge badge-fn">gregorianToHijri()</span>
    <span class="badge badge-fn">hijriToGregorian()</span>
    <span class="badge badge-fn">hijriIsValid()</span>
    <span class="badge badge-fn">hijriDaysInMonth()</span>
    <span class="badge badge-fn">hijriDayOfWeek()</span>
    <span class="badge badge-const">HIJRI_MONTH_NAMES</span>
    <span class="badge badge-const">DAY_NAMES_AR</span>
    <span class="badge badge-type">HijriDateObj</span>
    <span class="badge badge-type">GregDateObj</span>
  </div>

<!-- Taste of code -->
  ${codeBlock({
  vanilla: `# Option 1: Pure HTML + JS (no build)
# Copy: packages/calendar/src/hijri-calendar.lib.js
<script src="hijri-calendar.lib.js"></script>
<script>
  var hijri = HijriCalendar.gregorianToHijri(2026, 4, 12);
  console.log(hijri.formatted); // "1447/10/14"
</script>

# Option 2: With Vite/Build
# Copy: packages/calendar/src/hijri-calendar.lib.ts
import { todayHijri, gregorianToHijri } from './lib/hijri-calendar.lib';

const today = todayHijri();
const hijri = gregorianToHijri(2026, 4, 12);`,
  angular: `// Angular 14+ Component
import { Component } from '@angular/core';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [HijriCalenderDirective],
  template: \`
    <input hijri-calender [(ngModel)]="date" />
    <p>Today: {{ date }}</p>
  \`
})
export class DateComponent {
  date = '';
}`,
legacy: `// Angular 7-13 Component
import { Component } from '@angular/core';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-date',
  template: '<input hijri-calender [(ngModel)]="date" />'
})
export class DateComponent {
  date = '';
}`
}, 'typescript', 'Quick Example')}

</section>`;
}
