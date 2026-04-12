import { codeBlock } from '../utils/code-block';

export function renderGettingStarted(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-start">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📦</div>
    <div class="sec-meta">
      <h2 class="sec-title">التثبيت والاستيراد</h2>
      <p class="sec-desc">طرق متعددة لاستخدام المكتبة في بيئات مختلفة</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- NPM install -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">1 — تثبيت الحزمة</span></div>
      <div class="card-body">
        ${codeBlock(`npm install @core-components/calendar
# أو
yarn add @core-components/calendar
# أو
pnpm add @core-components/calendar`, 'bash', 'Terminal')}
      </div>
    </div>

    <!-- ES Module import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">2 — الاستيراد في TypeScript / ESModule</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.6;">
          استيراد الدوال التي تحتاجها فقط — tree-shaking مدعوم بالكامل.
        </p>
        ${codeBlock(`// استيراد انتقائي (موصى به)
import {
  todayHijri,
  todayGregorian,
  gregorianToHijri,
  hijriToGregorian,
  hijriIsValid,
  hijriDaysInMonth,
  hijriDayOfWeek,
  HIJRI_MONTH_NAMES,
  DAY_NAMES_AR,
} from '@core-components/calendar';

// أو استيراد كل شيء كـ namespace
import * as HijriLib from '@core-components/calendar';
const today = HijriLib.todayHijri();`, 'typescript', 'ESModule')}
      </div>
    </div>

    <!-- Vite / Vanilla JS -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">3 — استخدام مع Vite (Vanilla JS)</span></div>
      <div class="card-body">
        ${codeBlock(`// main.ts
import { gregorianToHijri, HIJRI_MONTH_NAMES } from '@core-components/calendar';

const today = new Date();
const hijri = gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());

document.getElementById('date-display')!.textContent =
  \`\${hijri.day} \${HIJRI_MONTH_NAMES[hijri.month - 1]} \${hijri.year} هـ\`;`, 'typescript', 'Vite + Vanilla TS')}
      </div>
    </div>

    <!-- CDN (script tag) -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">4 — استخدام مباشر بدون Bundler (CDN / Script)</span></div>
      <div class="card-body">
        ${codeBlock(`<!-- في HTML -->
<script type="module">
  import { gregorianToHijri } from './hijri-calendar.lib.js';

  const hijri = gregorianToHijri(2026, 4, 12);
  console.log(hijri.formatted); // "1447/10/14"
</script>`, 'html', 'HTML Script Tag')}
      </div>
    </div>

    <!-- Angular -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">5 — استخدام في Angular</span></div>
      <div class="card-body">
        ${codeBlock(`// date.service.ts
import { Injectable } from '@angular/core';
import { gregorianToHijri, hijriToGregorian, HijriDateObj } from '@core-components/calendar';

@Injectable({ providedIn: 'root' })
export class DateService {
  toHijri(year: number, month: number, day: number): HijriDateObj {
    return gregorianToHijri(year, month, day);
  }
}`, 'typescript', 'Angular Service')}
      </div>
    </div>

    <!-- TypeScript types -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">6 — أنواع TypeScript المُصدَّرة</span></div>
      <div class="card-body">
        ${codeBlock(`// الأنواع الرئيسية
interface HijriDateObj {
  year: number;       // السنة الهجرية
  month: number;      // الشهر (1-12)
  day: number;        // اليوم (1-30)
  formatted: string;  // "yyyy/mm/dd"
}

interface GregDateObj {
  year: number;
  month: number;
  day: number;
  formatted: string;  // "yyyy/mm/dd"
}

type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy';`, 'typescript', 'Types')}
      </div>
    </div>

  </div>
</section>`;
}
