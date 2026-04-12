import {
  HIJRI_MONTH_NAMES, HIJRI_MONTH_NAMES_EN,
  DAY_NAMES_AR, DAY_NAMES_SHORT_AR,
  GREG_MONTH_NAMES_AR,
} from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderConstants(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-constants">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📚</div>
    <div class="sec-meta">
      <h2 class="sec-title">الثوابت والأسماء</h2>
      <p class="sec-desc">مصفوفات أسماء الأشهر والأيام بالعربي والإنجليزي — جاهزة للاستخدام المباشر</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Hijri month names -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">أسماء الأشهر الهجرية &nbsp;<span class="badge badge-const">HIJRI_MONTH_NAMES</span> &nbsp;<span class="badge badge-const">HIJRI_MONTH_NAMES_EN</span></span>
      </div>
      <div class="card-body">
        <div class="months-grid">
          ${HIJRI_MONTH_NAMES.map((name, i) => `
            <div class="month-cell">
              <div>
                <div class="month-cell-name">${name}</div>
                <div class="month-cell-en">${HIJRI_MONTH_NAMES_EN[i]}</div>
              </div>
              <span class="month-cell-num">${i + 1}</span>
            </div>
          `).join('')}
        </div>
        ${codeBlock(`import { HIJRI_MONTH_NAMES, HIJRI_MONTH_NAMES_EN } from '@core-components/calendar';

// عربي
HIJRI_MONTH_NAMES[0];  // "المحرم"
HIJRI_MONTH_NAMES[8];  // "رمضان"
HIJRI_MONTH_NAMES[11]; // "ذو الحجة"

// إنجليزي
HIJRI_MONTH_NAMES_EN[0]; // "Al-Muharram"
HIJRI_MONTH_NAMES_EN[8]; // "Ramadan"

// مثال: اسم شهر من نتيجة التحويل
const hijri = gregorianToHijri(2026, 4, 12);
const monthAr = HIJRI_MONTH_NAMES[hijri.month - 1];     // "شوال"
const monthEn = HIJRI_MONTH_NAMES_EN[hijri.month - 1];  // "Shawwal"`, 'typescript', 'HIJRI_MONTH_NAMES')}
      </div>
    </div>

    <!-- Day names -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">أسماء الأيام &nbsp;<span class="badge badge-const">DAY_NAMES_AR</span> &nbsp;<span class="badge badge-const">DAY_NAMES_SHORT_AR</span></span>
      </div>
      <div class="card-body">
        <div class="days-grid">
          ${DAY_NAMES_AR.map((name, i) => `
            <div class="day-cell" style="${i===5?'background:var(--accent-bg);border-color:var(--accent-bdr);':''}">
              <div class="day-cell-full" style="${i===5?'color:var(--accent);':''}">${name}</div>
              <div class="day-cell-short">${DAY_NAMES_SHORT_AR[i]}</div>
              <div style="font-family:'Fira Code',monospace;font-size:.68rem;color:var(--txt3);margin-top:.1rem;">[${i}]</div>
            </div>
          `).join('')}
        </div>
        ${codeBlock(`import { DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from '@core-components/calendar';

// الأسماء الكاملة (الأحد = 0)
DAY_NAMES_AR;       // ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']

// الأسماء المختصرة
DAY_NAMES_SHORT_AR; // ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت']

// استخدام مع يوم الأسبوع
import { hijriDayOfWeek } from '@core-components/calendar';
const idx  = hijriDayOfWeek(1447, 10, 14);    // 0
const name = DAY_NAMES_AR[idx];               // "الأحد"
const abbr = DAY_NAMES_SHORT_AR[idx];         // "أحد"

// التحقق من الجمعة
const isFriday = idx === 5; // الجمعة = 5`, 'typescript', 'DAY_NAMES_AR')}
      </div>
    </div>

    <!-- Gregorian month names -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">أسماء الأشهر الميلادية &nbsp;<span class="badge badge-const">GREG_MONTH_NAMES_AR</span></span>
      </div>
      <div class="card-body">
        <div class="months-grid">
          ${GREG_MONTH_NAMES_AR.map((name, i) => `
            <div class="month-cell">
              <div class="month-cell-name">${name}</div>
              <span class="month-cell-num">${i + 1}</span>
            </div>
          `).join('')}
        </div>
        ${codeBlock(`import { GREG_MONTH_NAMES_AR } from '@core-components/calendar';

GREG_MONTH_NAMES_AR[0];   // "يناير"
GREG_MONTH_NAMES_AR[11];  // "ديسمبر"

// مثال: تنسيق تاريخ ميلادي بالعربي
const greg = hijriToGregorian(1447, 10, 14);
const label = \`\${greg.day} \${GREG_MONTH_NAMES_AR[greg.month - 1]} \${greg.year}\`;
// "12 إبريل 2026"`, 'typescript', 'GREG_MONTH_NAMES_AR')}
      </div>
    </div>

  </div>
</section>`;
}
