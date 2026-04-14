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
      <h2 class="sec-title">البدء السريع — Vanilla JS / TypeScript</h2>
      <p class="sec-desc">ملفان فقط — انسخهما إلى مشروعك واستخدمهما مباشرةً، لا npm ولا إعداد معقد</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Framework links -->
    <div class="card" style="border-color: var(--accent-bdr); background: var(--accent-bg);">
      <div class="card-body" style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
        <span style="font-size:.85rem; font-weight:600; color:var(--txt2);">تستخدم Angular أو ASP.NET؟</span>
        <a href="#sec-angular"
           style="display:inline-flex; align-items:center; gap:.35rem; padding:.4rem .8rem; background:#fff; border:1px solid var(--accent-bdr); border-radius:7px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
          🅰️ Angular 14+ Directive ↓
        </a>
        <a href="#sec-legacy"
           style="display:inline-flex; align-items:center; gap:.35rem; padding:.4rem .8rem; background:#fff; border:1px solid var(--bdr); border-radius:7px; font-size:.82rem; font-weight:700; color:var(--txt); text-decoration:none;">
          🔶 Angular 7–13 Legacy ↓
        </a>
      </div>
    </div>

    <!-- Step 1: Download files -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 1 — حمّل ملفات المكتبة</span></div>
      <div class="card-body">

        <div style="display:flex; flex-wrap:wrap; gap:.625rem; margin-bottom:1rem;">
          <a href="../../dist/hijri-calendar.lib.js" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.js &nbsp;<span style="opacity:.6; font-weight:400;">(compiled JS)</span>
          </a>
          <a href="../../src/hijri-calendar.lib.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.ts &nbsp;<span style="opacity:.6; font-weight:400;">(TypeScript source)</span>
          </a>
          <a href="../../src/hijri-calendar.css" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--txt); text-decoration:none;">
            ⬇ hijri-calendar.css &nbsp;<span style="opacity:.6; font-weight:400;">(اختياري)</span>
          </a>
        </div>

        <div style="display:flex; flex-direction:column; gap:.5rem;">

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.js</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">للإضافة مباشرة في HTML — يعمل فوراً بدون أي build tool.</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">مع Vite أو أي bundler — استيراد كـ module مع دعم كامل لـ TypeScript.</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">🎨</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--txt); margin-bottom:.2rem;">hijri-calendar.css</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">أنماط التقويم البصري — مطلوب فقط عند استخدام <code>createCalendarInput</code>.</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Step 2: Include in project -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 2 — أضفه لمشروعك</span></div>
      <div class="card-body">

        <p style="font-size:.85rem; color:var(--txt2); margin-bottom:.75rem; font-weight:600;">الطريقة أ — HTML مباشر (بدون build tool)</p>
        ${codeBlock(`<!-- أضف في <head> أو قبل </body> -->
<script src="./lib/hijri-calendar.lib.js"></script>
<script>
  // متاح فوراً عبر HijriCalendar
  var date = HijriCalendar.gregorianToHijri(2026, 4, 12);
  console.log(date.formatted); // "1447/10/14"
</script>`, 'html', 'HTML — بدون build')}

        <p style="font-size:.85rem; color:var(--txt2); margin:.75rem 0; font-weight:600;">الطريقة ب — TypeScript / Vite / Webpack</p>
        ${codeBlock(`// انسخ hijri-calendar.lib.ts إلى مشروعك ثم استورد:
import { gregorianToHijri, todayHijri } from './lib/hijri-calendar.lib';

const date = gregorianToHijri(2026, 4, 12);
console.log(date.formatted); // "1447/10/14"`, 'typescript', 'TypeScript / Vite')}

      </div>
    </div>

    <!-- Step 3: CSS (optional) -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 3 — إضافة CSS (اختياري)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          مطلوب فقط عند استخدام <code>createCalendarInput</code> (التقويم البصري).
        </p>
        ${codeBlock(`<!-- الطريقة أ: HTML -->
<link rel="stylesheet" href="./lib/hijri-calendar.css">

// الطريقة ب: TypeScript / Vite
import './lib/hijri-calendar.css';`, 'html', 'CSS Import')}
      </div>
    </div>

    <!-- Step 4: Quick examples -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 4 — مثال سريع</span></div>
      <div class="card-body">
        ${codeBlock(`import {
  todayHijri,
  gregorianToHijri,
  hijriToGregorian,
  getDayNameHijri,
  createCalendarInput,
} from './lib/hijri-calendar.lib';

// اليوم الهجري
const today = todayHijri();
console.log(today.formatted);    // "1447/10/14"

// تحويل ميلادي → هجري
const hijri = gregorianToHijri(2026, 4, 12);
console.log(hijri.formatted);    // "1447/10/14"

// اسم اليوم
const dayName = getDayNameHijri(hijri.formatted);
console.log(dayName);            // "الأحد"

// تقويم بصري تفاعلي
createCalendarInput('#my-input', {
  bindValue: 'hijri',
  onDateSelect: (e) => {
    console.log(e.hijri.formatted);  // "1447/10/14"
    console.log(e.greg.formatted);   // "2026/04/12"
  },
});`, 'typescript', 'مثال شامل')}
      </div>
    </div>

    <!-- TypeScript types -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الأنواع الرئيسية (TypeScript)</span></div>
      <div class="card-body">
        ${codeBlock(`interface HijriDateObj {
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

// حدث اختيار التاريخ من createCalendarInput أو dateChange directive
interface CalendarInputEvent {
  hijri: HijriDateObj;
  greg: GregDateObj;
  displayMode: 'hijri' | 'gregorian';
}`, 'typescript', 'TypeScript Types')}
      </div>
    </div>

  </div>
</section>`;
}
