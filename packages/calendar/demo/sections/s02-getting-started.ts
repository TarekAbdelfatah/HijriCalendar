import { codeBlock } from '../utils/code-block';

export function renderGettingStarted(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-start">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📂</div>
    <div class="sec-meta">
      <h2 class="sec-title">البدء السريع</h2>
      <p class="sec-desc">ملفان فقط — انسخهما إلى مشروعك واستخدمهما مباشرةً، لا npm ولا إعداد معقد</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Step 1: Copy files -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 1 — انسخ ملفى المكتبة إلى مشروعك</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          المكتبة ملفان فقط — لا حزمة npm، لا تثبيت. فقط انسخهما إلى مجلد مناسب داخل مشروعك وابدأ الاستخدام.
        </p>

        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1.25rem;">

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">المكتبة الأساسية — جميع الدوال والثوابت والأنواع. هذا الملف إلزامي.</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">🎨</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--txt); margin-bottom:.2rem;">hijri-calendar.css</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">أنماط مكوّن التقويم البصري — اختياري، فقط إذا أردت عرض التقويم المرئي.</div>
            </div>
          </div>

        </div>

        ${codeBlock(`// هيكل مشروعك بعد النسخ
src/
├── lib/
│   ├── hijri-calendar.lib.ts   ← انسخ هذا (إلزامي)
│   └── hijri-calendar.css      ← انسخ هذا (للتقويم المرئي)
└── main.ts`, 'bash', 'هيكل المشروع')}
      </div>
    </div>

    <!-- Step 2: Import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 2 — استيراد الدوال</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          استورد بالمسار المحلي للملف. استيراد انتقائي مدعوم بالكامل مع Vite وأي bundler حديث.
        </p>
        ${codeBlock(`// استيراد انتقائي (موصى به)
import {
  todayHijri,
  todayGregorian,
  gregorianToHijri,
  hijriToGregorian,
  hijriIsValid,
  hijriDaysInMonth,
  HIJRI_MONTH_NAMES,
  DAY_NAMES_AR,
} from './lib/hijri-calendar.lib';

// أو استيراد كل شيء كـ namespace
import * as HijriLib from './lib/hijri-calendar.lib';
const today = HijriLib.todayHijri();`, 'typescript', 'main.ts — استيراد المكتبة')}
      </div>
    </div>

    <!-- Step 3: Quick example -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 3 — مثال سريع</span></div>
      <div class="card-body">
        ${codeBlock(`import {
  gregorianToHijri,
  HIJRI_MONTH_NAMES,
  DAY_NAMES_AR,
  gregDayOfWeek,
} from './lib/hijri-calendar.lib';

const today   = new Date();
const y = today.getFullYear(), m = today.getMonth() + 1, d = today.getDate();

const hijri     = gregorianToHijri(y, m, d);
const monthName = HIJRI_MONTH_NAMES[hijri.month - 1];   // "شوال"
const dayName   = DAY_NAMES_AR[gregDayOfWeek(y, m, d)]; // "الأحد"

document.getElementById('date')!.textContent =
  \`\${dayName} \${hijri.day} \${monthName} \${hijri.year} هـ\`;
// → "الأحد 14 شوال 1447 هـ"`, 'typescript', 'مثال عملي')}
      </div>
    </div>

    <!-- Step 4: CSS import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 4 — استيراد CSS (للتقويم المرئي فقط)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          إذا أردت استخدام مكوّن التقويم البصري أضف ملف CSS — يمكن استيراده من TypeScript أو من HTML مباشرةً.
        </p>
        ${codeBlock(`// في TypeScript / Vite
import './lib/hijri-calendar.css';

// أو في HTML مباشرةً
<link rel="stylesheet" href="./lib/hijri-calendar.css">`, 'html', 'استيراد CSS')}
      </div>
    </div>



    <!-- TypeScript types -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الأنواع الرئيسية (TypeScript)</span></div>
      <div class="card-body">
        ${codeBlock(`// الأنواع المُصدَّرة من hijri-calendar.lib.ts

interface HijriDateObj {
  year: number;       // السنة الهجرية
  month: number;      // الشهر (1–12)
  day: number;        // اليوم (1–30)
  formatted: string;  // "yyyy/mm/dd"
}

interface GregDateObj {
  year: number;
  month: number;
  day: number;
  formatted: string;  // "yyyy/mm/dd"
}

type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy';`, 'typescript', 'TypeScript Types')}
      </div>
    </div>

  </div>
</section>`;
}
