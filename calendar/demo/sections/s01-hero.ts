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

</section>`;
}
