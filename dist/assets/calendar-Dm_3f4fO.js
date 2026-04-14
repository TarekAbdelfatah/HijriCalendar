/* empty css                   */(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class e{static KEY=`cc-theme`;static init(){let t=localStorage.getItem(e.KEY),n=window.matchMedia(`(prefers-color-scheme: dark)`).matches,r=t===`dark`||!t&&n;e.apply(r)}static toggle(){let t=!document.documentElement.classList.contains(`dark`);e.apply(t),localStorage.setItem(e.KEY,t?`dark`:`light`),document.dispatchEvent(new CustomEvent(`themeChanged`,{detail:{theme:t?`dark`:`light`}}))}static isDark(){return document.documentElement.classList.contains(`dark`)}static apply(e){let t=document.documentElement;t.classList.toggle(`dark`,e),t.setAttribute(`data-theme`,e?`dark`:`light`)}};function t(e){let t=e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),n=[`todayHijri`,`todayGregorian`,`hijriToGregorian`,`gregorianToHijri`,`hijriToGregorianStr`,`gregorianToHijriStr`,`hijriIsValid`,`hijriDaysInMonth`,`gregDaysInMonth`,`hijriDayOfWeek`,`gregDayOfWeek`,`gregIsLeapYear`,`hijriToJD`,`jdToHijri`,`dayOfWeekForJD`,`getDayNameHijri`,`createCalendarInput`].join(`|`),r=[{name:`cmt`,rex:/\/\/[^\n]*/},{name:`str`,rex:/`[^`]*`|'[^'\n]*'|"[^"\n]*"/},{name:`kw`,rex:/\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in|readonly|private|public)\b/},{name:`fn`,rex:RegExp(`\\b(${n})\\b`)},{name:`tp`,rex:/\b[A-Z][A-Za-z0-9]+\b/},{name:`num`,rex:/\b\d+(?:\.\d+)?\b/}],i=new RegExp(r.map(function(e){return`(`+e.rex.source+`)`}).join(`|`),`g`);return t.replace(i,function(e){for(var t=Array.prototype.slice.call(arguments,1),n=0;n<r.length;n++)if(t[n]!==void 0)return`<span class="`+r[n].name+`">`+e+`</span>`;return e})}function n(e,n=`typescript`,r){let i=typeof e==`string`?e:e.vanilla||e.angular||e.legacy||``,a=r||``;return`<div class="code-wrap"><div class="code-top">`+(a?`<span class="code-title-top">`+a+`</span>`:`<span></span>`)+`<button class="code-copy-btn" onclick="ccCopy(this)">Copy</button></div><pre class="code-pre">`+t(i.trim())+`</pre></div>`}window.ccCopy=function(e){let t=e.closest(`.code-wrap`),n=t?t.querySelector(`.code-pre`):null,r=n&&n.textContent||``;navigator.clipboard.writeText(r).then(function(){let t=e.textContent||``;e.textContent=`Done`,e.classList.add(`copied`),setTimeout(function(){e.textContent=t,e.classList.remove(`copied`)},2e3)}).catch(function(){})};function r(t,n=`vanilla`){let r=document.getElementById(t);if(!r)return;r.innerHTML=`
    <div class="hdr-inner">

      <!-- Brand -->
      <a href="../../../index.html" class="hdr-brand" title="الصفحة الرئيسية">
        <span class="hdr-logo">🛡️ <em>Core</em>Components</span>
        <span class="hdr-sep">/</span>
        <span class="hdr-comp">التقويم الهجري</span>
      </a>

      <!-- Actions -->
      <div class="hdr-actions">
        <button class="icon-btn" id="theme-toggle-btn" title="تبديل الوضع الليلي / النهاري" aria-label="theme toggle">
          <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               style="display:none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        
      </div>

    </div>
  `;let i=document.getElementById(`theme-toggle-btn`),a=document.getElementById(`icon-sun`),o=document.getElementById(`icon-moon`);function s(){let t=e.isDark();a&&(a.style.display=t?`none`:``),o&&(o.style.display=t?``:`none`)}s(),i?.addEventListener(`click`,()=>{e.toggle(),s()}),document.addEventListener(`themeChanged`,s)}var i=[{id:`sec-hero`,icon:`🚀`,label:`مقدمة`,group:`البداية`},{id:`sec-start`,icon:`📦`,label:`التثبيت والاستيراد`,group:`البداية`},{id:`sec-widget`,icon:`🖱️`,label:`التقويم التفاعلي`,group:`المكون`},{id:`sec-events`,icon:`📡`,label:`حدث اختيار التاريخ`,group:`المكون`},{id:`sec-today`,icon:`📅`,label:`اليوم الحالي`,group:`الدوال الأساسية`},{id:`sec-conversion`,icon:`🔄`,label:`تحويل التواريخ`,group:`الدوال الأساسية`},{id:`sec-string-conv`,icon:`🔤`,label:`تحويل النصوص`,group:`الدوال الأساسية`},{id:`sec-validation`,icon:`✅`,label:`التحقق من الصحة`,group:`الدوال الأساسية`},{id:`sec-month-info`,icon:`🗓️`,label:`معلومات الشهر`,group:`الدوال الأساسية`},{id:`sec-day-of-week`,icon:`📆`,label:`يوم الأسبوع`,group:`الدوال الأساسية`},{id:`sec-leap-year`,icon:`🔢`,label:`السنة الكبيسة`,group:`الدوال الأساسية`},{id:`sec-julian`,icon:`🔬`,label:`Julian Day (JD)`,group:`الدوال الأساسية`},{id:`sec-constants`,icon:`📚`,label:`الثوابت والأسماء`,group:`المرجع`},{id:`sec-api-ref`,icon:`📋`,label:`مرجع API كامل`,group:`المرجع`},{id:`sec-angular`,icon:`🅰️`,label:`Angular 14+ Directive`,group:`تكامل Angular`},{id:`sec-legacy`,icon:`🔶`,label:`Legacy Angular (7–13)`,group:`تكامل Angular`}];function a(e){let t=document.getElementById(e);if(!t)return;let n=new Map;for(let e of i)n.has(e.group)||n.set(e.group,[]),n.get(e.group).push(e);let r=``;for(let[e,t]of n){r+=`<div class="sb-group">
      <span class="sb-group-lbl">${e}</span>
      <ul class="sb-list">`;for(let e of t)r+=`<li>
        <a class="sb-link" href="#${e.id}" data-target="${e.id}">
          <span class="sb-ico">${e.icon}</span>
          ${e.label}
        </a>
      </li>`;r+=`</ul></div>`}t.innerHTML=r,t.querySelectorAll(`.sb-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.target;document.getElementById(n)?.scrollIntoView({behavior:`smooth`,block:`start`})})});let a=new IntersectionObserver(e=>{for(let n of e)if(n.isIntersecting){let e=n.target.id;t.querySelectorAll(`.sb-link`).forEach(e=>e.classList.remove(`active`)),t.querySelector(`.sb-link[data-target="${e}"]`)?.classList.add(`active`)}},{rootMargin:`-15% 0px -80% 0px`,threshold:0});document.querySelectorAll(`.doc-section[id]`).forEach(e=>a.observe(e))}function o(e){let t=document.getElementById(e);t&&(t.innerHTML=`
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

</section>`)}function s(e){let t=document.getElementById(e);t&&(t.innerHTML=`
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
        ${n(`<!-- أضف في <head> أو قبل </body> -->
<script src="./lib/hijri-calendar.lib.js"><\/script>
<script>
  // متاح فوراً عبر HijriCalendar
  var date = HijriCalendar.gregorianToHijri(2026, 4, 12);
  console.log(date.formatted); // "1447/10/14"
<\/script>`,`html`,`HTML — بدون build`)}

        <p style="font-size:.85rem; color:var(--txt2); margin:.75rem 0; font-weight:600;">الطريقة ب — TypeScript / Vite / Webpack</p>
        ${n(`// انسخ hijri-calendar.lib.ts إلى مشروعك ثم استورد:
import { gregorianToHijri, todayHijri } from './lib/hijri-calendar.lib';

const date = gregorianToHijri(2026, 4, 12);
console.log(date.formatted); // "1447/10/14"`,`typescript`,`TypeScript / Vite`)}

      </div>
    </div>

    <!-- Step 3: CSS (optional) -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 3 — إضافة CSS (اختياري)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          مطلوب فقط عند استخدام <code>createCalendarInput</code> (التقويم البصري).
        </p>
        ${n(`<!-- الطريقة أ: HTML -->
<link rel="stylesheet" href="./lib/hijri-calendar.css">

// الطريقة ب: TypeScript / Vite
import './lib/hijri-calendar.css';`,`html`,`CSS Import`)}
      </div>
    </div>

    <!-- Step 4: Quick examples -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 4 — مثال سريع</span></div>
      <div class="card-body">
        ${n(`import {
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
});`,`typescript`,`مثال شامل`)}
      </div>
    </div>

    <!-- TypeScript types -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الأنواع الرئيسية (TypeScript)</span></div>
      <div class="card-body">
        ${n(`interface HijriDateObj {
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
}`,`typescript`,`TypeScript Types`)}
      </div>
    </div>

  </div>
</section>`)}var c=[20,50,79,109,138,168,197,227,256,286,315,345,374,404,433,463,492,522,551,581,611,641,670,700,729,759,788,818,847,877,906,936,965,995,1024,1054,1083,1113,1142,1172,1201,1231,1260,1290,1320,1350,1379,1409,1438,1468,1497,1527,1556,1586,1615,1645,1674,1704,1733,1763,1792,1822,1851,1881,1910,1940,1969,1999,2028,2058,2087,2117,2146,2176,2205,2235,2264,2294,2323,2353,2383,2413,2442,2472,2501,2531,2560,2590,2619,2649,2678,2708,2737,2767,2796,2826,2855,2885,2914,2944,2973,3003,3032,3062,3091,3121,3150,3180,3209,3239,3268,3298,3327,3357,3386,3416,3446,3476,3505,3535,3564,3594,3623,3653,3682,3712,3741,3771,3800,3830,3859,3889,3918,3948,3977,4007,4036,4066,4095,4125,4155,4185,4214,4244,4273,4303,4332,4362,4391,4421,4450,4480,4509,4539,4568,4598,4627,4657,4686,4716,4745,4775,4804,4834,4863,4893,4922,4952,4981,5011,5040,5070,5099,5129,5158,5188,5218,5248,5277,5307,5336,5366,5395,5425,5454,5484,5513,5543,5572,5602,5631,5661,5690,5720,5749,5779,5808,5838,5867,5897,5926,5956,5985,6015,6044,6074,6103,6133,6162,6192,6221,6251,6281,6311,6340,6370,6399,6429,6458,6488,6517,6547,6576,6606,6635,6665,6694,6724,6753,6783,6812,6842,6871,6901,6930,6960,6989,7019,7048,7078,7107,7137,7166,7196,7225,7255,7284,7314,7344,7374,7403,7433,7462,7492,7521,7551,7580,7610,7639,7669,7698,7728,7757,7787,7816,7846,7875,7905,7934,7964,7993,8023,8053,8083,8112,8142,8171,8201,8230,8260,8289,8319,8348,8378,8407,8437,8466,8496,8525,8555,8584,8614,8643,8673,8702,8732,8761,8791,8821,8850,8880,8909,8938,8968,8997,9027,9056,9086,9115,9145,9175,9205,9234,9264,9293,9322,9352,9381,9410,9440,9470,9499,9529,9559,9589,9618,9648,9677,9706,9736,9765,9794,9824,9853,9883,9913,9943,9972,10002,10032,10061,10090,10120,10149,10178,10208,10237,10267,10297,10326,10356,10386,10415,10445,10474,10504,10533,10562,10592,10621,10651,10680,10710,10740,10770,10799,10829,10858,10888,10917,10947,10976,11005,11035,11064,11094,11124,11153,11183,11213,11242,11272,11301,11331,11360,11389,11419,11448,11478,11507,11537,11567,11596,11626,11655,11685,11715,11744,11774,11803,11832,11862,11891,11921,11950,11980,12010,12039,12069,12099,12128,12158,12187,12216,12246,12275,12304,12334,12364,12393,12423,12453,12483,12512,12542,12571,12600,12630,12659,12688,12718,12747,12777,12807,12837,12866,12896,12926,12955,12984,13014,13043,13072,13102,13131,13161,13191,13220,13250,13280,13310,13339,13368,13398,13427,13456,13486,13515,13545,13574,13604,13634,13664,13693,13723,13752,13782,13811,13840,13870,13899,13929,13958,13988,14018,14047,14077,14107,14136,14166,14195,14224,14254,14283,14313,14342,14372,14401,14431,14461,14490,14520,14550,14579,14609,14638,14667,14697,14726,14756,14785,14815,14844,14874,14904,14933,14963,14993,15021,15051,15081,15110,15140,15169,15199,15228,15258,15287,15317,15347,15377,15406,15436,15465,15494,15524,15553,15582,15612,15641,15671,15701,15731,15760,15790,15820,15849,15878,15908,15937,15966,15996,16025,16055,16085,16114,16144,16174,16204,16233,16262,16292,16321,16350,16380,16409,16439,16468,16498,16528,16558,16587,16617,16646,16676,16705,16734,16764,16793,16823,16852,16882,16912,16941,16971,17001,17030,17060,17089,17118,17148,17177,17207,17236,17266,17295,17325,17355,17384,17414,17444,17473,17502,17532,17561,17591,17620,17650,17679,17709,17738,17768,17798,17827,17857,17886,17916,17945,17975,18004,18034,18063,18093,18122,18152,18181,18211,18241,18270,18300,18330,18359,18388,18418,18447,18476,18506,18535,18565,18595,18625,18654,18684,18714,18743,18772,18802,18831,18860,18890,18919,18949,18979,19008,19038,19068,19098,19127,19156,19186,19215,19244,19274,19303,19333,19362,19392,19422,19452,19481,19511,19540,19570,19599,19628,19658,19687,19717,19746,19776,19806,19836,19865,19895,19924,19954,19983,20012,20042,20071,20101,20130,20160,20190,20219,20249,20279,20308,20338,20367,20396,20426,20455,20485,20514,20544,20573,20603,20633,20662,20692,20721,20751,20780,20810,20839,20869,20898,20928,20957,20987,21016,21046,21076,21105,21135,21164,21194,21223,21253,21282,21312,21341,21371,21400,21430,21459,21489,21519,21548,21578,21607,21637,21666,21696,21725,21754,21784,21813,21843,21873,21902,21932,21962,21991,22021,22050,22080,22109,22138,22168,22197,22227,22256,22286,22316,22346,22375,22405,22434,22464,22493,22522,22552,22581,22611,22640,22670,22700,22730,22759,22789,22818,22848,22877,22906,22936,22965,22994,23024,23054,23083,23113,23143,23173,23202,23232,23261,23290,23320,23349,23379,23408,23438,23467,23497,23527,23556,23586,23616,23645,23674,23704,23733,23763,23792,23822,23851,23881,23910,23940,23970,23999,24029,24058,24088,24117,24147,24176,24206,24235,24265,24294,24324,24353,24383,24413,24442,24472,24501,24531,24560,24590,24619,24648,24678,24707,24737,24767,24796,24826,24856,24885,24915,24944,24974,25003,25032,25062,25091,25121,25150,25180,25210,25240,25269,25299,25328,25358,25387,25416,25446,25475,25505,25534,25564,25594,25624,25653,25683,25712,25742,25771,25800,25830,25859,25888,25918,25948,25977,26007,26037,26067,26096,26126,26155,26184,26214,26243,26272,26302,26332,26361,26391,26421,26451,26480,26510,26539,26568,26598,26627,26656,26686,26715,26745,26775,26805,26834,26864,26893,26923,26952,26982,27011,27041,27070,27099,27129,27159,27188,27218,27248,27277,27307,27336,27366,27395,27425,27454,27484,27513,27542,27572,27602,27631,27661,27691,27720,27750,27779,27809,27838,27868,27897,27926,27956,27985,28015,28045,28074,28104,28134,28163,28193,28222,28252,28281,28310,28340,28369,28399,28428,28458,28488,28517,28547,28577,28607,28636,28665,28695,28724,28754,28783,28813,28843,28872,28901,28931,28960,28990,29019,29049,29078,29108,29137,29167,29196,29226,29255,29285,29315,29345,29375,29404,29434,29463,29492,29522,29551,29580,29610,29640,29669,29699,29729,29759,29788,29818,29847,29876,29906,29935,29964,29994,30023,30053,30082,30112,30141,30171,30200,30230,30259,30289,30318,30348,30378,30408,30437,30467,30496,30526,30555,30585,30614,30644,30673,30703,30732,30762,30791,30821,30850,30880,30909,30939,30968,30998,31027,31057,31086,31116,31145,31175,31204,31234,31263,31293,31322,31352,31381,31411,31441,31471,31500,31530,31559,31589,31618,31648,31676,31706,31736,31766,31795,31825,31854,31884,31913,31943,31972,32002,32031,32061,32090,32120,32150,32180,32209,32239,32268,32298,32327,32357,32386,32416,32445,32475,32504,32534,32563,32593,32622,32652,32681,32711,32740,32770,32799,32829,32858,32888,32917,32947,32976,33006,33035,33065,33094,33124,33153,33183,33213,33243,33272,33302,33331,33361,33390,33420,33450,33479,33509,33539,33568,33598,33627,33657,33686,33716,33745,33775,33804,33834,33863,33893,33922,33952,33981,34011,34040,34069,34099,34128,34158,34187,34217,34247,34277,34306,34336,34365,34395,34424,34454,34483,34512,34542,34571,34601,34631,34660,34690,34719,34749,34778,34808,34837,34867,34896,34926,34955,34985,35015,35044,35074,35103,35133,35162,35192,35222,35251,35280,35310,35340,35370,35399,35429,35458,35488,35517,35547,35576,35605,35635,35665,35694,35723,35753,35782,35811,35841,35871,35901,35930,35960,35989,36019,36048,36078,36107,36136,36166,36195,36225,36254,36284,36314,36343,36373,36403,36433,36462,36492,36521,36551,36580,36610,36639,36669,36698,36728,36757,36786,36816,36845,36875,36904,36934,36963,36993,37022,37052,37081,37111,37141,37170,37200,37229,37259,37288,37318,37347,37377,37406,37436,37465,37495,37524,37554,37584,37613,37643,37672,37701,37731,37760,37790,37819,37849,37878,37908,37938,37967,37997,38027,38056,38085,38115,38144,38174,38203,38233,38262,38292,38322,38351,38381,38410,38440,38469,38499,38528,38558,38587,38617,38646,38676,38705,38735,38764,38794,38823,38853,38882,38912,38941,38971,39001,39030,39059,39089,39118,39148,39178,39208,39237,39267,39297,39326,39355,39385,39414,39444,39473,39503,39532,39562,39592,39621,39650,39680,39709,39739,39768,39798,39827,39857,39886,39916,39946,39975,40005,40035,40064,40094,40123,40153,40182,40212,40241,40271,40300,40330,40359,40389,40418,40448,40477,40507,40536,40566,40595,40625,40655,40685,40714,40744,40773,40803,40832,40862,40892,40921,40951,40980,41009,41039,41068,41098,41127,41157,41186,41216,41245,41275,41304,41334,41364,41393,41422,41452,41481,41511,41540,41570,41599,41629,41658,41688,41718,41748,41777,41807,41836,41865,41894,41924,41953,41983,42012,42042,42072,42102,42131,42161,42190,42220,42249,42279,42308,42337,42367,42397,42426,42456,42485,42515,42545,42574,42604,42633,42662,42692,42721,42751,42780,42810,42839,42869,42899,42929,42958,42988,43017,43046,43076,43105,43135,43164,43194,43223,43253,43283,43312,43342,43371,43401,43430,43460,43489,43519,43548,43578,43607,43637,43666,43696,43726,43755,43785,43814,43844,43873,43903,43932,43962,43991,44021,44050,44080,44109,44139,44169,44198,44228,44258,44287,44317,44346,44375,44405,44434,44464,44493,44523,44553,44582,44612,44641,44671,44700,44730,44759,44788,44818,44847,44877,44906,44936,44966,44996,45025,45055,45084,45114,45143,45172,45202,45231,45261,45290,45320,45350,45380,45409,45439,45468,45498,45527,45556,45586,45615,45644,45674,45704,45733,45763,45793,45823,45852,45882,45911,45940,45970,45999,46028,46058,46088,46117,46147,46177,46206,46236,46265,46295,46324,46354,46383,46413,46442,46472,46501,46531,46560,46590,46620,46649,46679,46708,46738,46767,46797,46826,46856,46885,46915,46944,46974,47003,47033,47063,47092,47122,47151,47181,47210,47240,47269,47298,47328,47357,47387,47417,47446,47476,47506,47535,47565,47594,47624,47653,47682,47712,47741,47771,47800,47830,47860,47890,47919,47949,47978,48008,48037,48066,48096,48125,48155,48184,48214,48244,48273,48303,48333,48362,48392,48421,48450,48480,48509,48538,48568,48598,48627,48657,48687,48717,48746,48776,48805,48834,48864,48893,48922,48952,48982,49011,49041,49071,49100,49130,49160,49189,49218,49248,49277,49306,49336,49365,49395,49425,49455,49484,49514,49543,49573,49602,49632,49661,49690,49720,49749,49779,49809,49838,49868,49898,49927,49957,49986,50016,50045,50075,50104,50133,50163,50192,50222,50252,50281,50311,50340,50370,50400,50429,50459,50488,50518,50547,50576,50606,50635,50665,50694,50724,50754,50784,50813,50843,50872,50902,50931,50960,50990,51019,51049,51078,51108,51138,51167,51197,51227,51256,51286,51315,51345,51374,51403,51433,51462,51492,51522,51552,51582,51611,51641,51670,51699,51729,51758,51787,51816,51846,51876,51906,51936,51965,51995,52025,52054,52083,52113,52142,52171,52200,52230,52260,52290,52319,52349,52379,52408,52438,52467,52497,52526,52555,52585,52614,52644,52673,52703,52733,52762,52792,52822,52851,52881,52910,52939,52969,52998,53028,53057,53087,53116,53146,53176,53205,53235,53264,53294,53324,53353,53383,53412,53441,53471,53500,53530,53559,53589,53619,53648,53678,53708,53737,53767,53796,53825,53855,53884,53914,53943,53973,54003,54032,54062,54092,54121,54151,54180,54209,54239,54268,54297,54327,54357,54387,54416,54446,54476,54505,54535,54564,54593,54623,54652,54681,54711,54741,54770,54800,54830,54859,54889,54919,54948,54977,55007,55036,55066,55095,55125,55154,55184,55213,55243,55273,55302,55332,55361,55391,55420,55450,55479,55508,55538,55567,55597,55627,55657,55686,55716,55745,55775,55804,55834,55863,55892,55922,55951,55981,55981,56011,56040,56070,56100,56129,56159,56188,56218,56247,56276,56306,56335,56365,56394,56424,56454,56483,56513,56543,56572,56601,56631,56660,56690,56719,56749,56778,56808,56837,56867,56897,56926,56956,56985,57015,57044,57074,57103,57133,57162,57192,57221,57251,57280,57310,57340,57369,57399,57429,57458,57487,57517,57546,57576,57605,57634,57664,57694,57723,57753,57783,57813,57842,57871,57901,57930,57959,57989,58018,58048,58077,58107,58137,58167,58196,58226,58255,58285,58314,58343,58373,58402,58432,58461,58491,58521,58551,58580,58610,58639,58669,58698,58727,58757,58786,58816,58845,58875,58905,58934,58964,58994,59023,59053,59082,59111,59141,59170,59200,59229,59259,59288,59318,59348,59377,59407,59436,59466,59495,59525,59554,59584,59613,59643,59672,59702,59731,59761,59791,59820,59850,59879,59909,59939,59968,59997,60027,60056,60086,60115,60145,60174,60204,60234,60264,60293,60323,60352,60381,60411,60440,60469,60499,60528,60558,60588,60618,60647,60677,60707,60736,60765,60795,60824,60853,60883,60912,60942,60972,61002,61031,61061,61090,61120,61149,61179,61208,61237,61267,61296,61326,61356,61385,61415,61445,61474,61504,61533,61563,61592,61621,61651,61680,61710,61739,61769,61799,61828,61858,61888,61917,61947,61976,62006,62035,62064,62094,62123,62153,62182,62212,62242,62271,62301,62331,62360,62390,62419,62448,62478,62507,62537,62566,62596,62625,62655,62685,62715,62744,62774,62803,62832,62862,62891,62921,62950,62980,63009,63039,63069,63099,63128,63157,63187,63216,63246,63275,63305,63334,63363,63393,63423,63453,63482,63512,63541,63571,63600,63630,63659,63689,63718,63747,63777,63807,63836,63866,63895,63925,63955,63984,64014,64043,64073,64102,64131,64161,64190,64220,64249,64279,64309,64339,64368,64398,64427,64457,64486,64515,64545,64574,64603,64633,64663,64692,64722,64752,64782,64811,64841,64870,64899,64929,64958,64987,65017,65047,65076,65106,65136,65166,65195,65225,65254,65283,65313,65342,65371,65401,65431,65460,65490,65520,65549,65579,65608,65638,65667,65697,65726,65755,65785,65815,65844,65874,65874,65903,65933,65963,65992,66022,66051,66081,66110,66140,66169,66199,66228,66258,66287,66317,66346,66376,66405,66435,66465,66494,66524,66553,66583,66612,66641,66671,66700,66730,66760,66789,66819,66849,66878,66908,66937,66967,66996,67025,67055,67084,67114,67143,67173,67203,67233,67262,67292,67321,67351,67380,67409,67439,67468,67497,67527,67557,67587,67617,67646,67676,67705,67735,67764,67793,67823,67852,67882,67911,67941,67971,68e3,68030,68060,68089,68119,68148,68177,68207,68236,68266,68295,68325,68354,68384,68414,68443,68473,68502,68532,68561,68591,68620,68650,68679,68708,68738,68768,68797,68827,68857,68886,68916,68946,68975,69004,69034,69063,69092,69122,69152,69181,69211,69240,69270,69300,69330,69359,69388,69418,69447,69476,69506,69535,69565,69595,69624,69654,69684,69713,69743,69772,69802,69831,69861,69890,69919,69949,69978,70008,70038,70067,70097,70126,70156,70186,70215,70245,70274,70303,70333,70362,70392,70421,70451,70481,70510,70540,70570,70599,70629,70658,70687,70717,70746,70776,70805,70835,70864,70894,70924,70954,70983,71013,71042,71071,71101,71130,71159,71189,71218,71248,71278,71308,71337,71367,71397,71426,71455,71485,71514,71543,71573,71602,71632,71662,71691,71721,71751,71781,71810,71839,71869,71898,71927,71957,71986,72016,72046,72075,72105,72135,72164,72194,72223,72253,72282,72311,72341,72370,72400,72429,72459,72489,72518,72548,72577,72607,72637,72666,72695,72725,72754,72784,72813,72843,72872,72902,72931,72961,72991,73020,73050,73080,73109,73139,73168,73197,73227,73256,73286,73315,73345,73375,73404,73434,73464,73493,73523,73552,73581,73611,73640,73669,73699,73729,73758,73788,73818,73848,73877,73907,73936,73965,73995,74024,74053,74083,74113,74142,74172,74202,74231,74261,74291,74320,74349,74379,74408,74437,74467,74497,74526,74556,74585,74615,74645,74675,74704,74733,74763,74792,74822,74851,74881,74910,74940,74969,74999,75029,75058,75088,75117,75147,75176,75206,75235,75264,75294,75323,75353,75383,75412,75442,75472,75501,75531,75560,75590,75619,75648,75678,75707,75737,75766,75796,75826,75856,75885,75915,75944,75974,76003,76032,76062,76091,76121,76150,76180,76210,76239,76269,76299,76328,76358,76387,76416,76446,76475,76505,76534,76564,76593,76623,76653,76682,76712,76741,76771,76801,76830,76859,76889,76918,76948,76977,77007,77036,77066,77096,77125,77155,77185,77214,77243,77273,77302,77332,77361,77390,77420,77450,77479,77509,77539,77569,77598,77627,77657,77686,77715,77745,77774,77804,77833,77863,77893,77923,77952,77982,78011,78041,78070,78099,78129,78158,78188,78217,78247,78277,78307,78336,78366,78395,78425,78454,78483,78513,78542,78572,78601,78631,78661,78690,78720,78750,78779,78808,78838,78867,78897,78926,78956,78985,79015,79044,79074,79104,79133,79163,79192,79222,79251,79281,79310,79340,79369,79399,79428,79458,79487,79517,79546,79576,79606,79635,79665,79695,79724,79753,79783,79812,79841,79871,79900,79930,79960,79990],l=2399999.5,u=1276,d=1500;function f(e,t){return 12*(e-1)+t-15291}function p(e,t,n){let r=e,i=t;i<=2&&(r--,i+=12);let a=Math.floor(r/100),o=2-a+Math.floor(a/4);return Math.floor(365.25*(r+4716))+Math.floor(30.6001*(i+1))+n+o-1524.5}function m(e){let t=Math.floor(e+.5),n=Math.floor((t-1867216.25)/36524.25),r=t+1+n-Math.floor(n/4)+1524,i=Math.floor((r-122.1)/365.25),a=Math.floor(365.25*i),o=Math.floor((r-a)/30.6001),s=r-a-Math.floor(30.6001*o),c=o<14?o-1:o-13;return{year:c>2?i-4716:i-4715,month:c,day:s}}function h(e){return String(e).padStart(2,`0`)}var g=[`المحرم`,`صفر`,`ربيع الأول`,`ربيع الآخر`,`جمادى الأولى`,`جمادى الآخرة`,`رجب`,`شعبان`,`رمضان`,`شوال`,`ذو القعدة`,`ذو الحجة`],_=[`Al-Muharram`,`Safar`,`Rabi' al-Awwal`,`Rabi' al-Thani`,`Jumada al-Awwal`,`Jumada al-Thani`,`Rajab`,`Sha'ban`,`Ramadan`,`Shawwal`,`Dhu al-Qi'dah`,`Dhu al-Hijjah`],v=[`الأحد`,`الاثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`],y=[`أحد`,`اثنين`,`ثلاثاء`,`أربعاء`,`خميس`,`جمعة`,`سبت`],b=[`يناير`,`فبراير`,`مارس`,`إبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`];function x(e,t){let n=f(e,t);return c[n]-c[n-1]}function S(e,t,n){return!(e<u||e>d||t<1||t>12||n<1||n>x(e,t))}function C(e,t,n){return n+c[f(e,t)-1]-1+l}function w(e){let t=Math.round(e-l),n=0;for(let e=0;e<c.length&&!(c[e]>t);e++)n++;let r=t-c[n-1],i=n+15291,a=Math.floor((i-1)/12)+1;return{year:a,month:i-12*(a-1),day:r+1}}function T(e){return Math.round(e+1.5)%7}function E(e,t,n){return T(C(e,t,n))}function D(e,t,n){return T(p(e,t,n))}function O(e){return e%4==0&&e%100!=0||e%400==0}function k(e,t){return t===2&&O(e)?29:[31,28,31,30,31,30,31,31,30,31,30,31][t-1]}function A(e,t,n){let r=m(C(e,t,n));return{...r,formatted:`${r.year}/${h(r.month)}/${h(r.day)}`}}function j(e,t,n){let r=w(p(e,t,n));return{...r,formatted:`${r.year}/${h(r.month)}/${h(r.day)}`}}function M(e){let t=I(e);if(!t)return`Invalid date`;let[n,r,i]=t.split(`/`).map(Number);return A(n,r,i).formatted}function N(e){let t=I(e);if(!t)return`Invalid date`;let[n,r,i]=t.split(`/`).map(Number);return j(n,r,i).formatted}function P(){let e=new Date;return j(e.getFullYear(),e.getMonth()+1,e.getDate())}function F(){let e=new Date;return{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate(),formatted:`${e.getFullYear()}/${h(e.getMonth()+1)}/${h(e.getDate())}`}}function I(e){if(!e)return null;let t=e.split(/[\/\-\\]/).map(Number);if(t.length!==3||t.some(isNaN))return null;let[n,r,i]=t,[a,o,s]=n>100?[n,r,i]:[i,r,n];return`${a}/${String(o).padStart(2,`0`)}/${String(s).padStart(2,`0`)}`}var L=!1;function ee(){if(L)return;L=!0;let e=document.createElement(`style`);e.id=`hci-styles`,e.textContent=`
/* Calendar Input - RTL aware with logical properties */
.hci-wrapper { 
  display: inline-flex; 
  align-items: center; 
  gap: 0; 
  font-family: 'Cairo','Segoe UI', Tahoma, sans-serif; 
  vertical-align: middle;
  direction: rtl;
}
.hci-wrapper * { box-sizing: border-box; }

/* Input field - left side in RTL */
.hci-input { 
  flex: 1; 
  min-width: 120px; 
  padding: 8px 14px; 
  border: 1px solid #d0d7de; 
  border-inline-start: none; 
  border-radius: 0 8px 8px 0; 
  font-size: 14px; 
  outline: none; 
  transition: border-color 0.15s;
  background: #fff;
  color: #1a1a2e;
  text-align: start;
  height: 38px;
  cursor: pointer;
}
.hci-input:focus { border-color: #006C35; }

/* Dropdown - same height as input */
.hci-select { 
  flex-shrink: 0; 
  padding: 0 10px; 
  height: 38px; 
  border: 1px solid #d0d7de; 
  border-inline-end: none; 
  border-radius: 8px 0 0 8px; 
  background: #f0f4f1; 
  font-size: 14px; 
  font-weight: 700; 
  cursor: pointer; 
  min-width: 48px; 
  color: #006C35;
  border-right: 1px solid #e0e5dc;
  border-left: 1px solid #e0e5dc;
}
.hci-select:focus { outline: none; border-color: #006C35; }

/* Calendar popup - same width as input+dropdown */
.hci-popup { 
  position: absolute; 
  z-index: 9999; 
  background: #fff; 
  border: 1px solid #e0e5dc; 
  border-radius: 14px; 
  box-shadow: 0 8px 32px rgba(0, 106, 53, 0.15); 
  padding: 16px; 
  box-sizing: border-box;
  overflow: hidden;
}

/* Calendar header */
.hci-head { display: flex; align-items: center; justify-content: space-between; margin-block-end: 12px; }
.hci-title { text-align: center; line-height: 1.4; }
.hci-main { display: block; font-weight: 700; font-size: 16px; color: #006C35; }
.hci-sub { display: block; font-size: 12px; color: #6b7280; }

/* Navigation buttons */
.hci-btn { background: none; border: none; font-size: 26px; cursor: pointer; color: #006C35; padding: 4px 10px; border-radius: 8px; transition: background 0.12s; }
.hci-btn:hover { background: #e8f5e9; }

/* Calendar grid */
.hci-grid { width: 100%; border-collapse: collapse; text-align: center; }
.hci-grid th { font-size: 12px; color: #6b7280; padding: 6px 4px; font-weight: 600; }
.hci-grid td { font-size: 14px; padding: 8px 4px; cursor: pointer; border-radius: 50%; color: #1f2937; transition: all 0.12s; width: 38px; height: 38px; }
.hci-grid td:empty { cursor: default; }
.hci-grid td:not(:empty):hover { background: #e8f5e9; color: #006C35; }
.hci-grid td.hci-today { background: #dcfce7; color: #006C35; font-weight: 700; }
.hci-grid td.hci-selected { background: #006C35 !important; color: #fff !important; font-weight: 700; }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .hci-input { background: #1f2937; border-color: #374151; color: #f3f4f6; }
  .hci-input:focus { border-color: #22c55e; }
  .hci-select { background: #374151; border-color: #4b5563; color: #22c55e; }
  .hci-select:focus { border-color: #22c55e; }
  .hci-popup { background: #1f2937; border-color: #374151; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
  .hci-main { color: #22c55e; }
  .hci-sub { color: #9ca3af; }
  .hci-btn { color: #22c55e; }
  .hci-btn:hover { background: #374151; }
  .hci-grid th { color: #9ca3af; }
  .hci-grid td { color: #e5e7eb; }
  .hci-grid td:not(:empty):hover { background: #374151; color: #22c55e; }
  .hci-grid td.hci-today { background: #064e3b; color: #22c55e; }
  .hci-grid td.hci-selected { background: #22c55e !important; color: #fff !important; }
}

/* Dark mode class override */
html.dark .hci-input { background: #1f2937; border-color: #374151; color: #f3f4f6; }
html.dark .hci-input:focus { border-color: #22c55e; }
html.dark .hci-select { background: #374151; border-color: #4b5563; color: #22c55e; }
html.dark .hci-select:focus { border-color: #22c55e; }
html.dark .hci-popup { background: #1f2937; border-color: #374151; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
html.dark .hci-main { color: #22c55e; }
html.dark .hci-sub { color: #9ca3af; }
html.dark .hci-btn { color: #22c55e; }
html.dark .hci-btn:hover { background: #374151; }
html.dark .hci-grid th { color: #9ca3af; }
html.dark .hci-grid td { color: #e5e7eb; }
html.dark .hci-grid td:not(:empty):hover { background: #374151; color: #22c55e; }
html.dark .hci-grid td.hci-today { background: #064e3b; color: #22c55e; }
html.dark .hci-grid td.hci-selected { background: #22c55e !important; color: #fff !important; }
`,document.head.appendChild(e)}function R(e,t={}){ee();let n=typeof e==`string`?document.getElementById(e):e;if(!n)throw Error(`CalendarInput: container not found`);let r={bindValue:t.bindValue||`hijri`,placeholder:t.placeholder||`انقر للاختيار`,cssClass:t.cssClass||``,initialValue:t.initialValue||``,onDateSelect:t.onDateSelect,onChange:t.onChange,onDisplayModeChange:t.onDisplayModeChange},i=``,a=``,o=r.bindValue,s=1447,c=10,l=null,u=null,d=null,f=P();if(s=f.year,c=f.month,r.initialValue){let e=I(r.initialValue);if(e){r.bindValue===`hijri`?(i=e,a=M(e)):(a=e,i=N(e));let t=e.split(`/`).map(Number);t.length===3&&(s=t[0],c=t[1])}}let p=document.createElement(`div`);p.className=`hci-wrapper`;let m=document.createElement(`input`);m.type=`text`,m.className=`hci-input `+r.cssClass,m.placeholder=r.placeholder,m.readOnly=!0;let _=document.createElement(`select`);_.className=`hci-select`,_.title=`نوع التقويم`,_.innerHTML=`<option value="hijri">هـ</option><option value="gregorian">م</option>`,_.value=o,p.appendChild(m),p.appendChild(_),n.appendChild(p);function v(){let e=o===`hijri`?i:a;m.value=e,r.onChange&&r.onChange(e)}function S(){let e=o===`hijri`?i:a;if(e){let t=e.split(`/`).map(Number);if(t.length===3&&t[0]>100){s=t[0],c=t[1];return}}let t=o===`hijri`?P():F();s=t.year,c=t.month}function C(){let e=P(),t=x(s,c),n=E(s,c,1),r=g[c-1],a=M(`${s}/${h(c)}/01`).split(`/`),o=b[a[1]-1]+` `+a[0];return T(`${r} ${s}`,`${o} م`,t,n,e=>i===`${s}/${h(c)}/${h(e)}`,t=>e.year===s&&e.month===c&&e.day===t)}function w(){let e=F(),t=k(s,c),n=D(s,c,1),r=b[c-1],i=N(`${s}/${h(c)}/01`).split(`/`),o=g[i[1]-1]+` `+i[0];return T(`${r} ${s}`,`${o} هـ`,t,n,e=>a===`${s}/${h(c)}/${h(e)}`,t=>e.year===s&&e.month===c&&e.day===t)}function T(e,t,n,r,i,a){let o=y.map(e=>`<th>${e}</th>`).join(``),s=``;for(let e=0;e<r;e++)s+=`<td></td>`;for(let e=1;e<=n;e++){let t=i(e)?`hci-selected`:a(e)?`hci-today`:``;s+=`<td class="${t}" data-d="${e}">${e}</td>`,(r+e)%7==0&&e<n&&(s+=`</tr><tr>`)}return`
      <div class="hci-head">
        <button class="hci-btn hci-prev">&#8249;</button>
        <div class="hci-title">
          <span class="hci-main">${e}</span>
          <span class="hci-sub">${t}</span>
        </div>
        <button class="hci-btn hci-next">&#8250;</button>
      </div>
      <table class="hci-grid" dir="rtl">
        <thead><tr>${o}</tr></thead>
        <tbody><tr>${s}</tr></tbody>
      </table>`}function O(){if(!l)return;l.innerHTML=o===`hijri`?C():w(),l.addEventListener(`mousedown`,function(e){e.stopPropagation()});let e=l.querySelector(`.hci-prev`);e&&e.addEventListener(`click`,function(){c--,c<1&&(c=12,s--),O()});let t=l.querySelector(`.hci-next`);t&&t.addEventListener(`click`,function(){c++,c>12&&(c=1,s++),O()});let n=l.querySelectorAll(`[data-d]`);for(let e=0;e<n.length;e++)(function(e){e.addEventListener(`click`,function(){R(+(e.getAttribute(`data-d`)||`0`))})})(n[e])}function A(){if(l){j();return}l=document.createElement(`div`),l.className=`hci-popup`,document.body.appendChild(l),O(),L(),d=function(e){(!l||!l.contains(e.target))&&e.target!==m&&e.target!==_&&j()},document.addEventListener(`mousedown`,d)}function j(){l&&l.remove(),l=null,d&&=(document.removeEventListener(`mousedown`,d),null)}function L(){if(!l)return;let e=p.getBoundingClientRect(),t=e.width,n=window.innerHeight-e.bottom,r=e.top;l.style.width=t+`px`,l.style.left=e.left+`px`,l.style.right=`auto`,n>=330||r>=330?n>=r?(l.style.top=e.bottom+window.scrollY+8+`px`,l.style.bottom=`auto`):(l.style.top=e.top+window.scrollY-320-8+`px`,l.style.bottom=`auto`):(l.style.top=e.bottom+window.scrollY+8+`px`,l.style.bottom=`auto`)}function R(e){let t=`${s}/${h(c)}/${h(e)}`;o===`hijri`?(i=t,a=M(t)):(a=t,i=N(t)),v();let n={year:s,month:c,day:e,formatted:i},l=a.split(`/`).map(Number);u={hijri:n,greg:{year:l[0],month:l[1],day:l[2],formatted:a},displayMode:o},r.onDateSelect&&r.onDateSelect(u),j()}return m.addEventListener(`click`,e=>{e.stopPropagation(),A()}),_.addEventListener(`change`,()=>{o=_.value,S(),v(),r.onDisplayModeChange&&r.onDisplayModeChange(o),l&&O()}),_.addEventListener(`click`,e=>e.stopPropagation()),v(),{getValue:()=>o===`hijri`?i:a,setValue:e=>{let t=I(e);if(!t)return;r.bindValue===`hijri`?(i=t,a=M(t)):(a=t,i=N(t));let n=t.split(`/`).map(Number);n.length===3&&(s=n[0],c=n[1]),v()},destroy:()=>{j(),p.remove()},getEvent:()=>u}}function te(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
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

    <!-- New: Input with Dropdown (ه/م) -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">حقل إدخال مع التقويم (input + dropdown)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          دالة <code>createCalendarInput</code> تنشئ حقل إدخال مع قائمة منسدلة (هـ / م) وتقويم يظهر عند النقر. يرجع التاريخ الهجري والميلادي معاً.
        </p>
        
        <div class="demo-zone" style="margin-bottom:1rem;">
          <div id="input-calendar-demo" style="max-width:350px;"></div>
        </div>

        ${n({vanilla:`<!-- HTML: حاوية فارغة للتقويم -->
<div id="my-calendar" style="max-width:350px;"></div>

<!-- JS/TS: إنشاء حقل التقويم -->
<script type="module">
import { createCalendarInput } from './hijri-calendar.lib';

const cal = createCalendarInput('my-calendar', {
  bindValue: 'hijri',        // القيمة المخزنة: 'hijri' أو 'gregorian'
  placeholder: 'اختر التاريخ',
  
  // حدث اختيار التاريخ - يرجع كائنين
  onDateSelect: (event) => {
    // event.hijri = { year: 1447, month: 10, day: 15, formatted: "1447/10/15" }
    // event.greg  = { year: 2025, month: 4, day: 13, formatted: "2025/04/13" }
    
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
});

// الحصول على القيمة الحالية
const value = cal.getValue();

// تعيين قيمة برمجياً
cal.setValue('1448/01/01');

// حذف المكون عند الحاجة
cal.destroy();
<\/script>`,angular:`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <!-- استخدم directive على أي input -->
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p>التاريخ المختار: {{ selectedDate }}</p>
  \`
})
export class DatePickerComponent {
  selectedDate = '';
  
  onDateSelected(event: any) {
    // event = { hijri: {...}, greg: {...} }
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`,legacy:`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-date-picker',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p>التاريخ المختار: {{ selectedDate }}</p>
  \`
})
export class DatePickerComponent {
  selectedDate = '';
  
  onDateSelected(event: any) {
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`},`typescript`,`مثال كامل`)}
      </div>
    </div>


</section>`;try{R(`input-calendar-demo`,{bindValue:`hijri`,placeholder:`اختر التاريخ`,onDateSelect:e=>{console.log(`Date selected:`,e);let t=document.getElementById(`input-cal-result`);t&&(t.innerHTML=`
            <div style="font-size:.85rem; color:var(--txt); margin-top:.5rem;">
              <div>📅 هجري: <strong>${e.hijri.formatted}</strong></div>
              <div>📆 ميلادي: <strong>${e.greg.formatted}</strong></div>
            </div>
          `)}})}catch(e){console.error(`Failed to create calendar input:`,e)}let r=document.getElementById(`input-calendar-demo`);if(r){let e=document.createElement(`div`);e.id=`input-cal-result`,e.style.marginTop=`0.5rem`,r.appendChild(e)}}function ne(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
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



    <!-- ─── Code: how to build the callback calendar ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الكود الكامل — بناء تقويم مع callback</span></div>
      <div class="card-body">
        ${n({vanilla:`import {
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
});`,angular:`// في Angular - استخدم الـ Directive
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-hijri-calendar',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <!-- استخدم directive على أي input -->
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p>التاريخ المختار: {{ selectedDate }}</p>
  \`
})
export class HijriCalendarComponent {
  selectedDate = '';
  
  onDateSelected(event: any) {
    // event = { hijri: {...}, greg: {...} }
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`,legacy:`// Angular 7-13 - استخدم الـ Directive في NgModule
import { Component } from '@angular/core';

@Component({
  selector: 'app-hijri-calendar',
  template: \`
    <!-- استخدم directive على أي input -->
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p>التاريخ المختار: {{ selectedDate }}</p>
  \`
})
export class HijriCalendarComponent {
  selectedDate = '';
  
  onDateSelected(event: any) {
    // event = { hijri: {...}, greg: {...} }
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`},`typescript`,`الكود الكامل`)}
      </div>
    </div>

    <!-- ─── Patterns ─── -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">أنماط شائعة لاستخدام الحدث</span></div>
      <div class="card-body">
        <div style="display:grid; gap:.75rem;">

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">1. تصفية جدول بيانات</div>
            <p style="font-size:.8rem; color:var(--txt2); margin-bottom:.75rem;">
              في Angular، استخدم directive مع (dateChange):
            </p>
            ${n({vanilla:`// Vanilla JS
let filterDate = '';
let rows = [...]; // بيانات الجدول
let filteredRows = [];

function filterByDate(event) {
  const gregDate = event.greg.formatted; // "2025/04/13"
  // استخدم gregDate للتصفية
  filteredRows = rows.filter(r => r.date === gregDate);
}`,angular:`// Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-data-filter',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="filterDate"
           (dateChange)="filterByDate($event)"
           placeholder="تصفية حسب التاريخ" />
    
    <table>
      <tr *ngFor="let row of filteredRows">
        <td>{{ row.name }}</td>
        <td>{{ row.date }}</td>
      </tr>
    </table>
  \`
})
export class DataFilterComponent {
  filterDate = '';
  rows = [...]; // بيانات الجدول
  filteredRows = [];
  
  filterByDate(event: any) {
    const gregDate = event.greg.formatted; // "2025/04/13"
    // استخدم gregDate للتصفية
    this.filteredRows = this.rows.filter(r => r.date === gregDate);
  }
}`,legacy:`// Angular 7-13
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-filter',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="filterDate"
           (dateChange)="filterByDate($event)"
           placeholder="تصفية حسب التاريخ" />
    
    <table>
      <tr *ngFor="let row of filteredRows">
        <td>{{ row.name }}</td>
        <td>{{ row.date }}</td>
      </tr>
    </table>
  \`
})
export class DataFilterComponent {
  filterDate = '';
  rows = [...]; // بيانات الجدول
  filteredRows = [];
  
  filterByDate(event: any) {
    const gregDate = event.greg.formatted; // "2025/04/13"
    // استخدم gregDate للتصفية
    this.filteredRows = this.rows.filter(r => r.date === gregDate);
  }
}`},`typescript`)}
          </div>
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">2. حساب الفرق بين تاريخين</div>
            <p style="font-size:.8rem; color:var(--txt2); margin-bottom:.75rem;">
              في Angular، احسب JD باستخدام دالة <code>hijriToJD</code> من المكتبة:
            </p>
            ${n({vanilla:`// Vanilla JS
let firstDate = null;

function onDateSelected(event) {
  const jd = hijriToJD(event.hijri.year, event.hijri.month, event.hijri.day);
  
  if (!firstDate) {
    firstDate = { hijri: event.hijri.formatted, jd };
    console.log('التاريخ الأول:', event.hijri.formatted);
  } else {
    const diff = Math.abs(jd - firstDate.jd);
    console.log('الفرق:', diff, 'يوم');
    firstDate = null;
  }
}`,angular:`// Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-date-diff',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p *ngIf="firstDate">التاريخ الأول: {{ firstDate.hijri }}</p>
    <p *ngIf="diffDays !== null">الفرق: {{ diffDays }} يوم</p>
  \`
})
export class DateDiffComponent {
  selectedDate = '';
  firstDate: { hijri: string; jd: number } | null = null;
  diffDays: number | null = null;
  
  onDateSelected(event: any) {
    const jd = hijriToJD(event.hijri.year, event.hijri.month, event.hijri.day);
    
    if (!this.firstDate) {
      this.firstDate = { hijri: event.hijri.formatted, jd };
      this.diffDays = null;
    } else {
      this.diffDays = Math.abs(jd - this.firstDate.jd);
      this.firstDate = null;
    }
  }
}`,legacy:`// Angular 7-13
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-diff',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />
    
    <p *ngIf="firstDate">التاريخ الأول: {{ firstDate.hijri }}</p>
    <p *ngIf="diffDays !== null">الفرق: {{ diffDays }} يوم</p>
  \`
})
export class DateDiffComponent {
  selectedDate = '';
  firstDate: { hijri: string; jd: number } | null = null;
  diffDays: number | null = null;
  
  onDateSelected(event: any) {
    const jd = hijriToJD(event.hijri.year, event.hijri.month, event.hijri.day);
    
    if (!this.firstDate) {
      this.firstDate = { hijri: event.hijri.formatted, jd };
      this.diffDays = null;
    } else {
      this.diffDays = Math.abs(jd - this.firstDate.jd);
      this.firstDate = null;
    }
  }
}`},`typescript`)}
          </div>
          </div>



        </div>
      </div>
    </div>

  </div>
</section>`;let r=P(),i=r.year,a=r.month,o=null,s=document.getElementById(`evt-log`),c=0,l=!1;function u(e){!l&&c===0&&(s.innerHTML=``),c++;let t=new Date,n=`${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}:${String(t.getSeconds()).padStart(2,`0`)}`,r=document.createElement(`div`);r.innerHTML=`<span style="color:var(--code-cmt)">[${n}]</span> <span style="color:var(--code-kw)">onDateSelect</span><span style="color:var(--code-op)">(</span><span style="color:var(--code-str)">"${e.hijri.formatted}"</span><span style="color:var(--code-op)"> → </span><span style="color:var(--code-str)">"${e.greg.formatted}"</span><span style="color:var(--code-op)">)</span> <span style="color:var(--code-cmt)">// ${e.dayName}</span>`,s.appendChild(r),s.scrollTop=s.scrollHeight}document.getElementById(`evt-clear-log`)?.addEventListener(`click`,()=>{s.innerHTML=`<span style="opacity:.5;">// تم مسح السجل…</span>`,c=0,l=!0});function d(){let e=document.getElementById(`evt-cal-wrap`),t=x(i,a),n=T(C(i,a,1)),r=P();e.innerHTML=`
      <div class="hcal-ui-container" style="width:300px;">
        <div class="hcal-ui-header">
          <div class="hcal-ui-title-group">
            <span class="hcal-ui-month-name">${g[a-1]}</span>
            <span class="hcal-ui-year-label">${i} هـ</span>
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
          ${y.map(e=>`<div class="hcal-ui-weekday">${e}</div>`).join(``)}
          ${Array(n).fill(`<div class="hcal-ui-day hcal-ui-empty"></div>`).join(``)}
          ${Array.from({length:t},(e,t)=>{let n=t+1,s=r.year===i&&r.month===a&&r.day===n,c=o===n,l=`hcal-ui-day`;return s&&(l+=` is-today`),c&&(l+=` is-selected`),`<div class="${l}" data-day="${n}">${n}</div>`}).join(``)}
        </div>

        <div class="hcal-ui-footer">
          <span class="hcal-ui-today-link" id="evt-goto-today">اليوم</span>
          <span style="font-size:.7rem; color:var(--code-cmt);">انقر يوماً لتشغيل الحدث</span>
        </div>
      </div>`,e.querySelector(`#evt-prev`)?.addEventListener(`click`,()=>{--a<1&&(a=12,i--),o=null,d()}),e.querySelector(`#evt-next`)?.addEventListener(`click`,()=>{++a>12&&(a=1,i++),o=null,d()}),e.querySelector(`#evt-goto-today`)?.addEventListener(`click`,()=>{let e=P();i=e.year,a=e.month,o=null,d()}),e.querySelectorAll(`.hcal-ui-day[data-day]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.day);o=t;let n=A(i,a,t),r=C(i,a,t),s=v[E(i,a,t)];f({hijri:{year:i,month:a,day:t,formatted:`${i}/${String(a).padStart(2,`0`)}/${String(t).padStart(2,`0`)}`},greg:n,dayName:s,jd:r}),d()})})}function f(e){let{hijri:t,greg:n,dayName:r,jd:i}=e;z(`evt-selected-hijri`,`${t.day} ${g[t.month-1]} ${t.year} هـ`),z(`evt-selected-greg`,`${n.day} ${[`يناير`,`فبراير`,`مارس`,`إبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][n.month-1]} ${n.year} م`),z(`evt-selected-day`,`يوم الأسبوع: ${r}`),u(e)}d()}function z(e,t){let n=document.getElementById(e);n&&(n.textContent=t)}function re(e){let t=document.getElementById(e);t&&(t.innerHTML=`
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
    ${n({vanilla:`# Option 1: Pure JS - no import needed
var h = HijriCalendar.todayHijri();
console.log(h.formatted);               // "1447/10/14"

var g = HijriCalendar.todayGregorian();
console.log(g.formatted);               // "2026/04/12"

# Option 2: With Vite
import { todayHijri, todayGregorian } from './lib/hijri-calendar.lib';
const h = todayHijri();`,angular:`// In Angular component
import { Component } from '@angular/core';
import { todayHijri, todayGregorian, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

@Component({
  selector: 'app-today',
  template: \`
    <p>اليوم الهجري: {{ hijri.formatted }}</p>
    <p>اليوم الميلادي: {{ greg.formatted }}</p>
  \`
})
export class TodayComponent {
  hijri = todayHijri();
  greg = todayGregorian();
}`,legacy:`// Angular 7-13
import { Component } from '@angular/core';
import { todayHijri, todayGregorian, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

@Component({
  selector: 'app-today',
  template: \`
    <p>اليوم الهجري: {{ hijri.formatted }}</p>
    <p>اليوم الميلادي: {{ greg.formatted }}</p>
  \`
})
export class TodayComponent {
  hijri = todayHijri();
  greg = todayGregorian();
}`},`typescript`,`Today`)}

  </div>
</section>`,B(),document.getElementById(`refresh-today-btn`)?.addEventListener(`click`,B))}function B(){let e=P(),t=F(),n=E(e.year,e.month,e.day),r=g[e.month-1],i=v[n];V(`live-hijri-formatted`,e.formatted),V(`live-hijri-name`,`${e.day} ${r} ${e.year} هـ`),V(`live-hijri-day`,i),V(`live-greg-formatted`,t.formatted),V(`live-greg-name`,`${t.day} ${[`يناير`,`فبراير`,`مارس`,`إبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`][t.month-1]} ${t.year} م`),V(`live-greg-day`,``);let a=document.getElementById(`today-obj-output`);a&&(a.innerHTML=`<span style="color:var(--code-cmt)">// todayHijri()</span>
{ <span style="color:var(--code-kw)">year</span>: <span style="color:var(--code-num)">${e.year}</span>, <span style="color:var(--code-kw)">month</span>: <span style="color:var(--code-num)">${e.month}</span>, <span style="color:var(--code-kw)">day</span>: <span style="color:var(--code-num)">${e.day}</span>, <span style="color:var(--code-kw)">formatted</span>: <span style="color:var(--code-str)">"${e.formatted}"</span> }

<span style="color:var(--code-cmt)">// todayGregorian()</span>
{ <span style="color:var(--code-kw)">year</span>: <span style="color:var(--code-num)">${t.year}</span>, <span style="color:var(--code-kw)">month</span>: <span style="color:var(--code-num)">${t.month}</span>, <span style="color:var(--code-kw)">day</span>: <span style="color:var(--code-num)">${t.day}</span>, <span style="color:var(--code-kw)">formatted</span>: <span style="color:var(--code-str)">"${t.formatted}"</span> }`)}function V(e,t){let n=document.getElementById(e);n&&(n.textContent=t)}function H(e){let t=document.getElementById(e);if(!t)return;let r=F(),i=P();t.innerHTML=`
<section class="doc-section" id="sec-conversion">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔄</div>
    <div class="sec-meta">
      <h2 class="sec-title">تحويل التواريخ</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">gregorianToHijri()</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriToGregorian()</code>
        — محوّل تفاعلي لكلا الاتجاهين
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- ─── ميلادي → هجري ─── -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">ميلادي ← هجري &nbsp;<span class="badge badge-fn">gregorianToHijri(year, month, day)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">

          <!-- Native date picker (primary input) -->
          <div class="inp-grp" style="margin-bottom:1rem;">
            <label class="inp-lbl">اختر تاريخاً ميلادياً</label>
            <input class="inp" type="date" id="g2h-picker" value="${`${r.year}-${String(r.month).padStart(2,`0`)}-${String(r.day).padStart(2,`0`)}`}"
              min="1859-01-01" max="2077-11-28"
              style="width:100%; max-width:240px; cursor:pointer;">
            <span style="font-size:.78rem; color:var(--txt3); margin-top:.3rem; display:block;">أو أدخل يدوياً أدناه</span>
          </div>

          <!-- Manual inputs -->
          <div class="demo-3col" style="margin-bottom:1rem;">
            <div class="inp-grp">
              <label class="inp-lbl">السنة</label>
              <input class="inp" type="number" id="g2h-year" value="${r.year}" min="1859" max="2077">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر (1–12)</label>
              <input class="inp" type="number" id="g2h-month" value="${r.month}" min="1" max="12">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم (1–31)</label>
              <input class="inp" type="number" id="g2h-day" value="${r.day}" min="1" max="31">
            </div>
          </div>

          <!-- Result -->
          <div style="margin-bottom:.75rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الهجري</div>
            <div class="result-box" id="g2h-result" style="font-size:1.25rem;"></div>
          </div>
          <div style="padding:.75rem 1rem; background:var(--surf); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; color:var(--txt2);" id="g2h-details"></div>
        </div>

        ${n({vanilla:`# Option 1: Pure JS
var result = HijriCalendar.gregorianToHijri(2026, 4, 12);
// { year: 1447, month: 10, day: 14, formatted: "1447/10/14" }

# Option 2: With Vite
import { gregorianToHijri } from './lib/hijri-calendar.lib';
const result = gregorianToHijri(2026, 4, 12);`,angular:`// Convert in component
import { Component } from '@angular/core';
import { gregorianToHijri } from './hijri-calendar.lib';

@Component({ 
  selector: 'app-conv', 
  template: \`
    <p>الميلادي: 2026/04/12</p>
    <p>الهجري: {{ hijri.formatted }}</p>
  \`
})
export class ConvComponent {
  hijri = gregorianToHijri(2026, 4, 12);
}`,legacy:`// Angular 7-13
import { Component } from '@angular/core';
import { gregorianToHijri } from './hijri-calendar.lib';

@Component({
  selector: 'app-conv',
  template: '<p>{{ hijri.formatted }}</p>'
})
export class ConvComponent {
  hijri = gregorianToHijri(2026, 4, 12);
}`},`typescript`,`Gregorian to Hijri`)}
      </div>
    </div>

    <!-- ─── هجري → ميلادي ─── -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">هجري ← ميلادي &nbsp;<span class="badge badge-fn">hijriToGregorian(year, month, day)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-3col" style="margin-bottom:1rem;">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الهجرية</label>
              <input class="inp" type="number" id="h2g-year" value="${i.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="h2g-month">
                ${g.map((e,t)=>`<option value="${t+1}" ${t+1===i.month?`selected`:``}>${t+1} — ${e}</option>`).join(``)}
              </select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم (1–30)</label>
              <input class="inp" type="number" id="h2g-day" value="${i.day}" min="1" max="30">
            </div>
          </div>

          <!-- Result -->
          <div style="margin-bottom:.75rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الميلادي</div>
            <div class="result-box" id="h2g-result" style="font-size:1.25rem;"></div>
          </div>
          <div style="padding:.75rem 1rem; background:var(--surf); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; color:var(--txt2);" id="h2g-details"></div>
        </div>

        ${n({vanilla:`import { hijriToGregorian, DAY_NAMES_AR, hijriDayOfWeek } from './hijri-calendar.lib';

const result  = hijriToGregorian(1447, 10, 14);
// { year: 2026, month: 4, day: 12, formatted: "2026/04/12" }

const dayIdx  = hijriDayOfWeek(1447, 10, 14);
const dayName = DAY_NAMES_AR[dayIdx]; // "الأحد"`,angular:`import { Component } from '@angular/core';
import { hijriToGregorian, DAY_NAMES_AR, hijriDayOfWeek } from './hijri-calendar.lib';

@Component({
  selector: 'app-conversion',
  template: \`
    <p>الهجري: 1447/10/14</p>
    <p>الميلادي: {{ greg.formatted }}</p>
    <p>يوم الأسبوع: {{ dayName }}</p>
  \`
})
export class ConversionComponent {
  greg = hijriToGregorian(1447, 10, 14);
  dayIdx = hijriDayOfWeek(1447, 10, 14);
  dayName = DAY_NAMES_AR[this.dayIdx];
}`,legacy:`// Angular 7-13
// نفس الكود مع تعديل imports حسب الإصدار`},`typescript`,`hijriToGregorian()`)}
      </div>
    </div>

    <!-- Quick tests -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">أمثلة جاهزة — انقر لاختبار فوري</span></div>
      <div class="card-body">
        <div style="font-size:.8rem; color:var(--txt3); margin-bottom:.625rem;">
          انقر أي زر لتعبئة الحقول وعرض النتيجة تلقائياً ↓
        </div>
        <div class="test-btns" id="quick-test-btns">
          <button class="test-btn" data-g="2026/04/12">2026/04/12 →</button>
          <button class="test-btn" data-g="2025/01/01">2025/01/01 →</button>
          <button class="test-btn" data-g="2024/03/10">2024/03/10 (رمضان) →</button>
          <button class="test-btn" data-g="2023/12/31">2023/12/31 →</button>
          <button class="test-btn" data-g="2077/11/28">2077/11/28 (آخر يوم) →</button>
          <button class="test-btn" data-h="1447/09/01">← 1447/09/01</button>
          <button class="test-btn" data-h="1446/09/01">← 1446/09/01 (رمضان)</button>
          <button class="test-btn" data-h="1276/01/01">← 1276/01/01 (أول يوم)</button>
        </div>
      </div>
    </div>

  </div>
</section>`,U(),W(),G()}function U(){let e=document.getElementById(`g2h-picker`),t=document.getElementById(`g2h-year`),n=document.getElementById(`g2h-month`),r=document.getElementById(`g2h-day`);e?.addEventListener(`change`,()=>{if(!e.value)return;let[a,o,s]=e.value.split(`-`).map(Number);t.value=String(a),n.value=String(o),r.value=String(s),i()}),[t,n,r].forEach(a=>a?.addEventListener(`input`,()=>{let a=parseInt(t.value),o=parseInt(n.value),s=parseInt(r.value);a>=1859&&a<=2077&&o>=1&&o<=12&&s>=1&&s<=31&&(e.value=`${a}-${String(o).padStart(2,`0`)}-${String(s).padStart(2,`0`)}`),i()}));function i(){let e=parseInt(t.value),i=parseInt(n.value),a=parseInt(r.value);if(!(!e||!i||!a))try{let t=j(e,i,a),n=g[t.month-1],r=v[D(e,i,a)];K(`g2h-result`,`${t.day} ${n} ${t.year} هـ`,!1);let o=document.getElementById(`g2h-details`);o&&(o.innerHTML=`
        <strong>مُنسَّق:</strong>&nbsp;${t.formatted}&nbsp;·&nbsp;
        <strong>الشهر:</strong>&nbsp;${t.month} — ${n}&nbsp;·&nbsp;
        <strong>يوم الأسبوع:</strong>&nbsp;${r}`)}catch{K(`g2h-result`,`تاريخ خارج النطاق (1859–2077)`,!0);let e=document.getElementById(`g2h-details`);e&&(e.textContent=``)}}i()}function W(){let e=document.getElementById(`h2g-year`),t=document.getElementById(`h2g-month`),n=document.getElementById(`h2g-day`);function r(){let r=parseInt(e.value),i=parseInt(t.value),a=parseInt(n.value);if(!(!r||!i||!a))try{let e=A(r,i,a),t=v[E(r,i,a)],n=[`يناير`,`فبراير`,`مارس`,`إبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`];K(`h2g-result`,`${e.day} ${n[e.month-1]} ${e.year} م`,!1);let o=document.getElementById(`h2g-details`);o&&(o.innerHTML=`
        <strong>مُنسَّق:</strong>&nbsp;${e.formatted}&nbsp;·&nbsp;
        <strong>الشهر:</strong>&nbsp;${e.month} — ${n[e.month-1]}&nbsp;·&nbsp;
        <strong>يوم الأسبوع:</strong>&nbsp;${t}`)}catch{K(`h2g-result`,`تاريخ غير صالح`,!0);let e=document.getElementById(`h2g-details`);e&&(e.textContent=``)}}[e,t,n].forEach(e=>e?.addEventListener(`change`,r)),[e,n].forEach(e=>e?.addEventListener(`input`,r)),r()}function G(){document.querySelectorAll(`#quick-test-btns .test-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.g,n=e.dataset.h;if(t){let[e,n,r]=t.split(`/`).map(Number);document.getElementById(`g2h-year`).value=String(e),document.getElementById(`g2h-month`).value=String(n),document.getElementById(`g2h-day`).value=String(r);let i=document.getElementById(`g2h-picker`);i&&(i.value=`${e}-${String(n).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`),document.getElementById(`g2h-year`)?.dispatchEvent(new Event(`input`))}if(n){let[e,t,r]=n.split(`/`).map(Number);document.getElementById(`h2g-year`).value=String(e),document.getElementById(`h2g-month`).value=String(t),document.getElementById(`h2g-day`).value=String(r),document.getElementById(`h2g-year`)?.dispatchEvent(new Event(`input`))}})})}function K(e,t,n){let r=document.getElementById(e);r&&(r.textContent=t,r.classList.toggle(`is-invalid`,n),r.classList.toggle(`is-valid`,!n&&t!==``))}function q(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
<section class="doc-section" id="sec-string-conv">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔤</div>
    <div class="sec-meta">
      <h2 class="sec-title">تحويل النصوص</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriToGregorianStr()</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">gregorianToHijriStr()</code>
        — إدخال وإخراج بصيغة نصية مرنة
      </p>
    </div>
  </div>

  <div class="sec-body">

    <div style="
      background: var(--warn-bg);
      border: 1px solid rgba(217,119,6,.25);
      border-radius: var(--radius-sm);
      padding: .75rem 1rem;
      font-size: .85rem; color: var(--txt2); line-height: 1.6;
    ">
      💡 <strong>مرونة الصيغة:</strong>
      تقبل الدالتان أي من الصيغ التالية:
      <span style="font-family:monospace; color:var(--warn)">yyyy/mm/dd</span> أو
      <span style="font-family:monospace; color:var(--warn)">dd/mm/yyyy</span> أو
      <span style="font-family:monospace; color:var(--warn)">yyyy-mm-dd</span> أو
      <span style="font-family:monospace; color:var(--warn)">dd-mm-yyyy</span>
    </div>

    <!-- هجري → ميلادي (نص) -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">هجري → ميلادي (نص) &nbsp;<span class="badge badge-fn">hijriToGregorianStr(hijriStr)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="inp-grp" style="max-width:360px;">
            <label class="inp-lbl">أدخل التاريخ الهجري</label>
            <input class="inp" type="text" id="str-h2g-input"
              value="1447/10/14"
              placeholder="1447/10/14 أو 1447-10-14 أو 14/10/1447"
              dir="ltr" style="text-align:left; font-family:'Fira Code',monospace;">
          </div>
          <div style="margin-top:.875rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">النتيجة الميلادية</div>
            <div class="result-box" id="str-h2g-result" dir="ltr"></div>
          </div>
          <div class="test-btns">
            <button class="test-btn" data-val="1447/10/14">1447/10/14</button>
            <button class="test-btn" data-val="14/10/1447">14/10/1447</button>
            <button class="test-btn" data-val="1447-10-14">1447-10-14</button>
            <button class="test-btn" data-val="1446/09/01">1446/09/01</button>
            <button class="test-btn" data-val="1276/01/01">1276/01/01</button>
          </div>
        </div>

        ${n({vanilla:`import { hijriToGregorianStr } from './hijri-calendar.lib';

// تقبل صيغ متعددة
hijriToGregorianStr('1447/10/14');  // "2026/04/12"
hijriToGregorianStr('14/10/1447');  // "2026/04/12"
hijriToGregorianStr('1447-10-14'); // "2026/04/12"

// تاريخ غير صالح
hijriToGregorianStr('1600/01/01'); // "Invalid date"`,angular:`import { hijriToGregorianStr } from './hijri-calendar.lib';

// تقبل صيغ متعددة
this.result = hijriToGregorianStr('1447/10/14');  // "2026/04/12"
this.result = hijriToGregorianStr('1447-10-14'); // "2026/04/12"`,legacy:`import { hijriToGregorianStr } from './hijri-calendar.lib';

// تقبل صيغ متعددة
this.result = hijriToGregorianStr('1447/10/14');  // "2026/04/12"
this.result = hijriToGregorianStr('1447-10-14'); // "2026/04/12"`},`typescript`,`hijriToGregorianStr()`)}
      </div>
    </div>

    <!-- ميلادي → هجري (نص) -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">ميلادي → هجري (نص) &nbsp;<span class="badge badge-fn">gregorianToHijriStr(gregStr)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="inp-grp" style="max-width:360px;">
            <label class="inp-lbl">أدخل التاريخ الميلادي</label>
            <input class="inp" type="text" id="str-g2h-input"
              value="2026/04/12"
              placeholder="2026/04/12 أو 2026-04-12 أو 12/04/2026"
              dir="ltr" style="text-align:left; font-family:'Fira Code',monospace;">
          </div>
          <div style="margin-top:.875rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">النتيجة الهجرية</div>
            <div class="result-box" id="str-g2h-result" dir="ltr"></div>
          </div>
          <div class="test-btns">
            <button class="test-btn" data-val="2026/04/12">2026/04/12</button>
            <button class="test-btn" data-val="12/04/2026">12/04/2026</button>
            <button class="test-btn" data-val="2026-04-12">2026-04-12</button>
            <button class="test-btn" data-val="2025/03/10">2025/03/10</button>
            <button class="test-btn" data-val="2077/11/28">2077/11/28</button>
          </div>
        </div>

        ${n({vanilla:`import { gregorianToHijriStr } from './hijri-calendar.lib';

gregorianToHijriStr('2026/04/12');  // "1447/10/14"
gregorianToHijriStr('12/04/2026');  // "1447/10/14"
gregorianToHijriStr('2026-04-12'); // "1447/10/14"

// خارج النطاق
gregorianToHijriStr('1800/01/01'); // "Invalid date"`,angular:`import { gregorianToHijriStr } from './hijri-calendar.lib';

this.result = gregorianToHijriStr('2026/04/12');  // "1447/10/14"
this.result = gregorianToHijriStr('12/04/2026');  // "1447/10/14"`,legacy:`import { gregorianToHijriStr } from './hijri-calendar.lib';

this.result = gregorianToHijriStr('2026/04/12');  // "1447/10/14"
this.result = gregorianToHijriStr('12/04/2026');  // "1447/10/14"`},`typescript`,`gregorianToHijriStr()`)}
      </div>
    </div>

  </div>
</section>`;let r=document.getElementById(`str-h2g-input`),i=document.getElementById(`str-h2g-result`);function a(){let e=r.value.trim();if(!e)return;let t=M(e);i.textContent=t,i.className=`result-box `+(t===`Invalid date`?`is-invalid`:`is-valid`)}r.addEventListener(`input`,a),a(),r.closest(`.card-body`)?.querySelectorAll(`.test-btn`).forEach(e=>{e.addEventListener(`click`,()=>{r.value=e.dataset.val||``,a()})});let o=document.getElementById(`str-g2h-input`),s=document.getElementById(`str-g2h-result`);function c(){let e=o.value.trim();if(!e)return;let t=N(e);s.textContent=t,s.className=`result-box `+(t===`Invalid date`?`is-invalid`:`is-valid`)}o.addEventListener(`input`,c),c(),o.closest(`.card-body`)?.querySelectorAll(`.test-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.value=e.dataset.val||``,c()})})}function J(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
<section class="doc-section" id="sec-validation">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">✅</div>
    <div class="sec-meta">
      <h2 class="sec-title">التحقق من صحة التاريخ</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriIsValid(year, month, day)</code>
        — تحقق دقيق من نطاق الجدول وعدد أيام كل شهر
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Interactive validator -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">اختبر تاريخاً هجرياً</span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-3col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الهجرية (1276–1500)</label>
              <input class="inp" type="number" id="val-year" value="1447" min="1200" max="1600" placeholder="1447">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر (1–12)</label>
              <select class="inp inp-sel" id="val-month">
                ${g.map((e,t)=>`<option value="${t+1}" ${t===0?`selected`:``}>${t+1} — ${e}</option>`).join(``)}
              </select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم (1–30)</label>
              <input class="inp" type="number" id="val-day" value="1" min="1" max="30" placeholder="1">
            </div>
          </div>

          <!-- Result -->
          <div style="margin-top:1rem; display:flex; gap:.75rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="val-result" style="flex:1; font-size:1rem; min-width:180px;"></div>
            <div style="font-size:.84rem; color:var(--txt2);" id="val-max-days"></div>
          </div>

          <!-- Reason -->
          <div style="margin-top:.5rem; font-size:.83rem; color:var(--txt3);" id="val-reason"></div>

          <!-- Quick tests -->
          <div class="test-btns">
            <button class="test-btn" data-y="1447" data-m="1" data-d="1">✓ 1447/1/1</button>
            <button class="test-btn" data-y="1447" data-m="9" data-d="29">✓ 1447/9/29</button>
            <button class="test-btn" data-y="1447" data-m="9" data-d="30">1447/9/30 (صحيح؟)</button>
            <button class="test-btn" data-y="1500" data-m="12" data-d="30">✓ 1500/12/30 (آخر)</button>
            <button class="test-btn" data-y="1276" data-m="1" data-d="1">✓ 1276/1/1 (أول)</button>
            <button class="test-btn" data-y="1447" data-m="13" data-d="1">✗ شهر 13</button>
            <button class="test-btn" data-y="1447" data-m="1" data-d="0">✗ يوم 0</button>
            <button class="test-btn" data-y="1501" data-m="1" data-d="1">✗ 1501 (خارج النطاق)</button>
            <button class="test-btn" data-y="1275" data-m="12" data-d="30">✗ 1275 (قبل الجدول)</button>
          </div>
        </div>

        ${n({vanilla:`import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

// صحيح
hijriIsValid(1447, 1, 1);    // true
hijriIsValid(1447, 9, 29);   // true (رمضان 1447 = 29 يوم)
hijriIsValid(1276, 1, 1);    // true (أول تاريخ في الجدول)
hijriIsValid(1500, 12, 30);  // true (آخر تاريخ في الجدول)

// غير صحيح
hijriIsValid(1447, 13, 1);   // false — شهر 13 غير موجود
hijriIsValid(1447, 1, 0);    // false — يوم 0 غير صالح
hijriIsValid(1501, 1, 1);    // false — خارج نطاق الجدول (1276-1500)
hijriIsValid(1447, 9, 31);   // false — عدد أيام رمضان أقل من 31

// معرفة عدد أيام شهر معين
const days = hijriDaysInMonth(1447, 9); // 29 (رمضان 1447)`,angular:`import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

const isValid = hijriIsValid(1447, 1, 1);    // true
const days = hijriDaysInMonth(1447, 9);     // 29`,legacy:`import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

const isValid = hijriIsValid(1447, 1, 1);    // true
const days = hijriDaysInMonth(1447, 9);      // 29`},`typescript`,`hijriIsValid()`)}
      </div>
    </div>

    <!-- Validation rules info -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">قواعد التحقق</span></div>
      <div class="card-body">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:.875rem;">
          ${Y(`✅`,`نطاق السنة`,`1276 هـ ← 1500 هـ`,`الجدول الرسمي لأم القرى`)}
          ${Y(`✅`,`نطاق الشهر`,`1 ← 12`,`لا يقبل الشهر 0 أو 13`)}
          ${Y(`✅`,`نطاق اليوم`,`1 ← max`,`الحد الأقصى حسب بيانات الشهر الفعلية`)}
          ${Y(`✅`,`دقة الشهر`,`من 29 إلى 30 يوم`,`بناءً على جدول أم القرى الحقيقي`)}
        </div>
      </div>
    </div>

  </div>
</section>`;let r=document.getElementById(`val-year`),i=document.getElementById(`val-month`),a=document.getElementById(`val-day`),o=document.getElementById(`val-result`),s=document.getElementById(`val-max-days`),c=document.getElementById(`val-reason`);function l(){let e=parseInt(r.value),t=parseInt(i.value),n=parseInt(a.value);if(!e||!t||!n)return;let l=S(e,t,n);o.textContent=l?`✓ صحيح — hijriIsValid(${e}, ${t}, ${n}) = true`:`✗ غير صحيح — hijriIsValid(${e}, ${t}, ${n}) = false`,o.className=`result-box `+(l?`is-valid`:`is-invalid`);try{if(e>=1276&&e<=1500&&t>=1&&t<=12){let r=x(e,t);s.textContent=`الشهر ${g[t-1]} ${e} هـ = ${r} يوم`,c.textContent=l?``:n<1?`السبب: اليوم لا يمكن أن يكون أقل من 1`:n>r?`السبب: هذا الشهر يحتوي ${r} يوماً فقط`:e<1276?`السبب: السنة أصغر من نطاق الجدول (1276 هـ)`:e>1500?`السبب: السنة أكبر من نطاق الجدول (1500 هـ)`:t<1||t>12?`السبب: رقم الشهر خارج النطاق (1-12)`:``}else s.textContent=``,c.textContent=e<1276?`السبب: السنة أصغر من نطاق الجدول (بداية: 1276 هـ)`:e>1500?`السبب: السنة أكبر من نطاق الجدول (نهاية: 1500 هـ)`:t<1||t>12?`السبب: رقم الشهر خارج النطاق (1-12)`:``}catch{s.textContent=``,c.textContent=``}}[r,a].forEach(e=>e?.addEventListener(`input`,l)),i?.addEventListener(`change`,l),l(),document.querySelectorAll(`.sec-body .test-btn[data-y]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e;r.value=t.dataset.y||`1447`,i.value=t.dataset.m||`1`,a.value=t.dataset.d||`1`,l()})})}function Y(e,t,n,r){return`<div style="display:flex; gap:.5rem; align-items:flex-start;">
    <span style="font-size:1.1rem; margin-top:.1rem;">${e}</span>
    <div>
      <div style="font-size:.85rem; font-weight:600; color:var(--txt); margin-bottom:.2rem;">${t}</div>
      <div style="font-family:'Fira Code',monospace; font-size:.78rem; color:var(--accent); margin-bottom:.2rem;">${n}</div>
      <div style="font-size:.78rem; color:var(--txt3);">${r}</div>
    </div>
  </div>`}function ie(e){let t=document.getElementById(e);if(!t)return;let r=g.map((e,t)=>`<option value="${t+1}" ${t===0?`selected`:``}>${t+1} — ${e}</option>`).join(``),i=[`يناير`,`فبراير`,`مارس`,`إبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`].map((e,t)=>`<option value="${t+1}" ${t===0?`selected`:``}>${t+1} — ${e}</option>`).join(``);t.innerHTML=`
<section class="doc-section" id="sec-month-info">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🗓️</div>
    <div class="sec-meta">
      <h2 class="sec-title">معلومات الشهر</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriDaysInMonth(year, month)</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">gregDaysInMonth(year, month)</code>
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- hijriDaysInMonth -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">الأشهر الهجرية &nbsp;<span class="badge badge-fn">hijriDaysInMonth(year, month)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-2col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الهجرية (1276–1500)</label>
              <input class="inp" type="number" id="hdim-year" value="1447" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="hdim-month">${r}</select>
            </div>
          </div>

          <!-- Visual days display -->
          <div style="margin-top:1rem; display:flex; gap:.75rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="hdim-result" style="font-size:1.3rem; padding:.75rem 1.5rem;"></div>
            <div style="font-size:.9rem; color:var(--txt2);" id="hdim-desc"></div>
          </div>

          <!-- Days dot grid -->
          <div id="hdim-dots" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:.875rem;"></div>
        </div>

        ${n({vanilla:`import { hijriDaysInMonth, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

// عدد أيام شهر رمضان 1447
const days = hijriDaysInMonth(1447, 9);
console.log(days); // 29

// عرض اسم الشهر
const name = HIJRI_MONTH_NAMES[8]; // "رمضان"

// فائدة: توليد أيام شهر للتقويم
const daysArr = Array.from({ length: days }, (_, i) => i + 1);
// [1, 2, 3, ..., 29]`,angular:`import { hijriDaysInMonth, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

const days = hijriDaysInMonth(1447, 9); // 29
const name = HIJRI_MONTH_NAMES[8];      // "رمضان"`,legacy:`import { hijriDaysInMonth, HIJRI_MONTH_NAMES } from './hijri-calendar.lib';

const days = hijriDaysInMonth(1447, 9); // 29
const name = HIJRI_MONTH_NAMES[8];      // "رمضان"`},`typescript`,`hijriDaysInMonth()`)}
      </div>
    </div>

    <!-- gregDaysInMonth -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">الأشهر الميلادية &nbsp;<span class="badge badge-fn">gregDaysInMonth(year, month)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-2col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الميلادية</label>
              <input class="inp" type="number" id="gdim-year" value="2026" min="1800" max="2100">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="gdim-month">${i}</select>
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:.75rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="gdim-result" style="font-size:1.3rem; padding:.75rem 1.5rem;"></div>
            <div style="font-size:.9rem; color:var(--txt2);" id="gdim-desc"></div>
          </div>
        </div>

        ${n({vanilla:`import { gregDaysInMonth, gregIsLeapYear } from './hijri-calendar.lib';

// أيام فبراير 2024 (سنة كبيسة)
gregDaysInMonth(2024, 2); // 29

// أيام فبراير 2026 (ليست كبيسة)
gregDaysInMonth(2026, 2); // 28

// أيام يناير دائماً
gregDaysInMonth(2026, 1); // 31

// التحقق من السنة الكبيسة
gregIsLeapYear(2024); // true
gregIsLeapYear(2025); // false`,angular:`import { gregDaysInMonth, gregIsLeapYear } from './hijri-calendar.lib';

const febDays = gregDaysInMonth(2024, 2); // 29
const isLeap = gregIsLeapYear(2024);      // true`,legacy:`import { gregDaysInMonth, gregIsLeapYear } from './hijri-calendar.lib';

const febDays = gregDaysInMonth(2024, 2); // 29
const isLeap = gregIsLeapYear(2024);       // true`},`typescript`,`gregDaysInMonth()`)}
      </div>
    </div>

  </div>
</section>`;let a=document.getElementById(`hdim-year`),o=document.getElementById(`hdim-month`);function s(){let e=parseInt(a.value),t=parseInt(o.value);if(!e||!t||e<1276||e>1500){let e=document.getElementById(`hdim-result`);e.textContent=`—`,e.className=`result-box`;return}let n=x(e,t),r=document.getElementById(`hdim-result`);r.textContent=`${n} يوم`,r.className=`result-box is-valid`,document.getElementById(`hdim-desc`).textContent=`شهر ${g[t-1]} ${e} هـ`;let i=document.getElementById(`hdim-dots`);i.innerHTML=Array.from({length:n},(e,t)=>{let r=t+1,i=r===1||r===n;return`<div title="${r}" style="
        width: 28px; height: 28px;
        border-radius: 6px;
        background: ${i?`var(--accent)`:`var(--surf)`};
        border: 1px solid ${i?`var(--accent)`:`var(--bdr)`};
        display: flex; align-items: center; justify-content: center;
        font-size: .72rem; font-family: 'Fira Code', monospace;
        color: ${i?`#fff`:`var(--txt2)`};
        cursor: default;
        transition: background .15s;
      ">${r}</div>`}).join(``)}a.addEventListener(`input`,s),o.addEventListener(`change`,s),s();let c=document.getElementById(`gdim-year`),l=document.getElementById(`gdim-month`);function u(){let e=parseInt(c.value),t=parseInt(l.value);if(!e||!t)return;let n=k(e,t),r=document.getElementById(`gdim-result`);r.textContent=`${n} يوم`,r.className=`result-box is-valid`;let i=O(e);document.getElementById(`gdim-desc`).textContent=`${t===2?i?`(سنة كبيسة)`:`(ليست كبيسة)`:``} السنة ${e}`}c.addEventListener(`input`,u),l.addEventListener(`change`,u),u()}function ae(e){let t=document.getElementById(e);if(!t)return;let r=P(),i=F(),a=g.map((e,t)=>`<option value="${t+1}" ${t+1===r.month?`selected`:``}>${t+1} — ${e}</option>`).join(``);t.innerHTML=`
<section class="doc-section" id="sec-day-of-week">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📆</div>
    <div class="sec-meta">
      <h2 class="sec-title">يوم الأسبوع</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriDayOfWeek()</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">gregDayOfWeek()</code>
        و
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Day-of-week visual reference -->
    <div class="demo-zone" style="margin-bottom:0;">
      <div class="inp-lbl" style="margin-bottom:.75rem;">الأيام وأرقامها (0 = الأحد)</div>
      <div style="display:flex; gap:.5rem; flex-wrap:wrap;" id="dow-ref-grid"></div>
    </div>

    <!-- hijriDayOfWeek -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">من تاريخ هجري &nbsp;<span class="badge badge-fn">hijriDayOfWeek(year, month, day)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-3col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الهجرية</label>
              <input class="inp" type="number" id="hdow-year" value="${r.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="hdow-month">${a}</select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="hdow-day" value="${r.day}" min="1" max="30">
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="hdow-result" style="font-size:1.2rem; padding:.75rem 1.5rem; min-width:180px;"></div>
            <div style="font-size:.84rem; color:var(--txt2);" id="hdow-idx"></div>
          </div>
        </div>

        ${n({vanilla:`import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0 (الأحد)
const name = DAY_NAMES_AR[idx];            // "الأحد"
const abbr = DAY_NAMES_SHORT_AR[idx];      // "أحد"

// مصفوفة الأسماء الكاملة (0=أحد ... 6=سبت)
// DAY_NAMES_AR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']`,angular:`import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0
const name = DAY_NAMES_AR[idx];            // "الأحد"`,legacy:`import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0
const name = DAY_NAMES_AR[idx];            // "الأحد"`},`typescript`,`hijriDayOfWeek()`)}
      </div>
    </div>

    <!-- gregDayOfWeek -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">من تاريخ ميلادي &nbsp;<span class="badge badge-fn">gregDayOfWeek(year, month, day)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-3col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الميلادية</label>
              <input class="inp" type="number" id="gdow-year" value="${i.year}" min="1859" max="2077">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر (1–12)</label>
              <input class="inp" type="number" id="gdow-month" value="${i.month}" min="1" max="12">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="gdow-day" value="${i.day}" min="1" max="31">
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="gdow-result" style="font-size:1.2rem; padding:.75rem 1.5rem; min-width:180px;"></div>
            <div style="font-size:.84rem; color:var(--txt2);" id="gdow-idx"></div>
          </div>
        </div>

        ${n({vanilla:`import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0 (الأحد)
const name = DAY_NAMES_AR[idx];          // "الأحد"

// التحقق من يوم الجمعة
const isFriday = gregDayOfWeek(2026, 4, 17) === 5; // true`,angular:`import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0
const name = DAY_NAMES_AR[idx];          // "الأحد"`,legacy:`import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0
const name = DAY_NAMES_AR[idx];          // "الأحد"`},`typescript`,`gregDayOfWeek()`)}
      </div>
    </div>

  </div>
</section>`;let o=document.getElementById(`dow-ref-grid`);v.forEach((e,t)=>{let n=t===5;o.innerHTML+=`<div style="
      background: ${n?`var(--accent)`:`var(--surf)`};
      border: 1px solid ${n?`var(--accent)`:`var(--bdr)`};
      border-radius: 8px; padding: .5rem .875rem;
      text-align: center; min-width: 72px;
    ">
      <div style="font-family:'Fira Code',monospace; font-size:.72rem; color:${n?`rgba(255,255,255,.7)`:`var(--txt3)`}; margin-bottom:.2rem;">${t}</div>
      <div style="font-size:.85rem; font-weight:600; color:${n?`#fff`:`var(--txt)`};">${e}</div>
      <div style="font-size:.72rem; color:${n?`rgba(255,255,255,.6)`:`var(--txt3)`}; margin-top:.1rem;">${y[t]}</div>
    </div>`});let s=document.getElementById(`hdow-year`),c=document.getElementById(`hdow-month`),l=document.getElementById(`hdow-day`);function u(){let e=parseInt(s.value),t=parseInt(c.value),n=parseInt(l.value);if(!(!e||!t||!n))try{let r=E(e,t,n);document.getElementById(`hdow-result`).textContent=v[r],document.getElementById(`hdow-result`).className=`result-box is-valid`,document.getElementById(`hdow-idx`).textContent=`الفهرس: ${r} · ${y[r]}`}catch{document.getElementById(`hdow-result`).textContent=`تاريخ غير صالح`,document.getElementById(`hdow-result`).className=`result-box is-invalid`}}[s,l].forEach(e=>e.addEventListener(`input`,u)),c.addEventListener(`change`,u),u();let d=document.getElementById(`gdow-year`),f=document.getElementById(`gdow-month`),p=document.getElementById(`gdow-day`);function m(){let e=parseInt(d.value),t=parseInt(f.value),n=parseInt(p.value);if(!(!e||!t||!n))try{let r=D(e,t,n);document.getElementById(`gdow-result`).textContent=v[r],document.getElementById(`gdow-result`).className=`result-box is-valid`,document.getElementById(`gdow-idx`).textContent=`الفهرس: ${r} · ${y[r]}`}catch{document.getElementById(`gdow-result`).textContent=`تاريخ غير صالح`,document.getElementById(`gdow-result`).className=`result-box is-invalid`}}[d,f,p].forEach(e=>e.addEventListener(`input`,m)),m()}function oe(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
<section class="doc-section" id="sec-leap-year">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔢</div>
    <div class="sec-meta">
      <h2 class="sec-title">السنة الكبيسة</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">gregIsLeapYear(year)</code>
        — تحديد ما إذا كانت السنة الميلادية كبيسة
      </p>
    </div>
  </div>

  <div class="sec-body">

    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">اختبر سنة ميلادية &nbsp;<span class="badge badge-fn">gregIsLeapYear(year)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="inp-grp" style="max-width:280px;">
            <label class="inp-lbl">السنة الميلادية</label>
            <input class="inp" type="number" id="leap-year-inp" value="2024" min="1" max="9999"
              style="font-size:1.1rem; padding:10px 14px; text-align:center; font-family:'Fira Code',monospace;">
          </div>

          <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="leap-result" style="font-size:1.1rem; padding:.875rem 1.5rem;"></div>
            <div style="font-size:.84rem; color:var(--txt2); line-height:1.6;" id="leap-explain"></div>
          </div>

          <!-- Feb days visual -->
          <div style="margin-top:.875rem; display:flex; align-items:center; gap:.75rem;">
            <div style="
              background: var(--surf);
              border: 1px solid var(--bdr);
              border-radius: 8px;
              padding: .6rem 1.25rem;
              font-size:.88rem; color:var(--txt2);
            ">
              فبراير في هذه السنة:
              <strong id="leap-feb-days" style="color:var(--accent); font-family:'Fira Code',monospace; font-size:1rem; margin-inline-start:.5rem;"></strong>
              يوم
            </div>
          </div>

          <!-- Quick test buttons -->
          <div class="test-btns">
            <button class="test-btn" data-year="2024">2024 ✓</button>
            <button class="test-btn" data-year="2000">2000 ✓</button>
            <button class="test-btn" data-year="1900">1900 ✗</button>
            <button class="test-btn" data-year="1600">1600 ✓</button>
            <button class="test-btn" data-year="2025">2025 ✗</button>
            <button class="test-btn" data-year="2026">2026 ✗</button>
            <button class="test-btn" data-year="2028">2028 ✓</button>
            <button class="test-btn" data-year="2100">2100 ✗</button>
          </div>
        </div>

        ${n(`import { gregIsLeapYear, gregDaysInMonth } from '@core-components/calendar';

// سنوات كبيسة
gregIsLeapYear(2024); // true  — قابلة للقسمة على 4، وليست على 100
gregIsLeapYear(2000); // true  — قابلة للقسمة على 400
gregIsLeapYear(1600); // true  — قابلة للقسمة على 400

// ليست كبيسة
gregIsLeapYear(2025); // false — غير قابلة للقسمة على 4
gregIsLeapYear(1900); // false — قابلة على 100 لكن ليس على 400
gregIsLeapYear(2100); // false — نفس القاعدة

// عدد أيام فبراير
gregDaysInMonth(2024, 2); // 29
gregDaysInMonth(2025, 2); // 28`,`typescript`,`gregIsLeapYear()`)}

        <!-- Rule explanation -->
        <div style="
          background: var(--accent-bg);
          border: 1px solid var(--accent-bdr);
          border-radius: var(--radius-sm);
          padding: .875rem 1rem;
          margin-top: .25rem;
          font-size: .84rem;
          line-height: 1.65;
          color: var(--txt2);
        ">
          📐 <strong>قاعدة السنة الكبيسة (Gregorian):</strong><br>
          السنة كبيسة إذا <strong>كانت قابلة للقسمة على 4</strong>،
          <strong>إلا</strong> إذا كانت قابلة على 100،
          <strong>إلا</strong> إذا كانت قابلة على 400.<br>
          <code style="font-family:monospace; direction:ltr; display:inline-block; margin-top:.4rem; color:var(--accent);">
            (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          </code>
        </div>
      </div>
    </div>

  </div>
</section>`;let r=document.getElementById(`leap-year-inp`),i=document.getElementById(`leap-result`),a=document.getElementById(`leap-explain`),o=document.getElementById(`leap-feb-days`);function s(){let e=parseInt(r.value);if(!e)return;let t=O(e),n=k(e,2);i.textContent=t?`✓ ${e} — سنة كبيسة`:`✗ ${e} — ليست كبيسة`,i.className=`result-box `+(t?`is-valid`:`is-invalid`),o.textContent=String(n),t?e%400==0?a.textContent=`قابلة للقسمة على 400 ← كبيسة`:e%100==0?a.textContent=`قابلة على 100 لكن ليس 400 ← ليست كبيسة (لكنها قابلة على 4 فهي كبيسة)`:a.textContent=`قابلة للقسمة على 4 وليس 100 ← كبيسة`:e%100==0?a.textContent=`قابلة على 100 لكن ليس 400 ← ليست كبيسة`:a.textContent=`غير قابلة للقسمة على 4 ← ليست كبيسة`}r.addEventListener(`input`,s),s(),document.querySelectorAll(`.test-btn[data-year]`).forEach(e=>{e.addEventListener(`click`,()=>{r.value=e.dataset.year||`2024`,s()})})}function se(e){let t=document.getElementById(e);if(!t)return;let r=P(),i=g.map((e,t)=>`<option value="${t+1}" ${t+1===r.month?`selected`:``}>${t+1} — ${e}</option>`).join(``),a=C(r.year,r.month,r.day);t.innerHTML=`
<section class="doc-section" id="sec-julian">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔬</div>
    <div class="sec-meta">
      <h2 class="sec-title">Julian Day Number (JD)</h2>
      <p class="sec-desc">
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">hijriToJD()</code>
        و
        <code style="font-family:monospace;font-size:.85em;background:var(--surf2);padding:1px 6px;border-radius:4px;border:1px solid var(--bdr)">jdToHijri()</code>
        — تحويل إلى وسيط Julian Day لحسابات فلكية ومقارنة تواريخ
      </p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Explainer -->
    <div style="
      background: var(--surf2);
      border: 1px solid var(--bdr);
      border-radius: var(--radius-sm);
      padding: .875rem 1rem;
      font-size: .85rem; line-height: 1.65; color: var(--txt2);
    ">
      💡 <strong>ما هو Julian Day؟</strong><br>
      Julian Day Number هو عدد الأيام منذ الظهيرة (12:00 UT) في
      <strong>1 يناير 4713 قبل الميلاد</strong>.
      يُستخدم في علم الفلك وأنظمة التقويم كوسيط محايد للتحويل بين أنظمة التقويم المختلفة.
      يوم الأحد الحالي (${r.year}/${String(r.month).padStart(2,`0`)}/${String(r.day).padStart(2,`0`)} هـ) يساوي
      <strong style="color:var(--accent); font-family:'Fira Code',monospace;">${a.toFixed(1)}</strong> JD.
    </div>

    <!-- hijriToJD -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">هجري → JD &nbsp;<span class="badge badge-fn">hijriToJD(year, month, day)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="demo-3col">
            <div class="inp-grp">
              <label class="inp-lbl">السنة الهجرية</label>
              <input class="inp" type="number" id="h2jd-year" value="${r.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="h2jd-month">${i}</select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="h2jd-day" value="${r.day}" min="1" max="30">
            </div>
          </div>
          <div style="margin-top:1rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">Julian Day Number</div>
            <div class="result-box" id="h2jd-result" style="font-size:1.1rem; font-family:'Fira Code',monospace; direction:ltr;"></div>
          </div>
          <div style="margin-top:.5rem; font-size:.8rem; color:var(--txt3);" id="h2jd-info"></div>
        </div>

        ${n(`import { hijriToJD } from '@core-components/calendar';

const jd = hijriToJD(1447, 10, 14);
// jd ≈ 2461163.5  (Julian Day Number)

// فائدة: حساب الفرق بالأيام بين تاريخين
const jd1 = hijriToJD(1447, 1, 1);
const jd2 = hijriToJD(1447, 12, 30);
const diff = Math.round(jd2 - jd1); // عدد أيام السنة الهجرية`,`typescript`,`hijriToJD()`)}
      </div>
    </div>

    <!-- jdToHijri -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">JD → هجري &nbsp;<span class="badge badge-fn">jdToHijri(jd)</span></span>
      </div>
      <div class="card-body">
        <div class="demo-zone">
          <div class="inp-grp" style="max-width:320px;">
            <label class="inp-lbl">Julian Day Number</label>
            <input class="inp" type="number" id="jd2h-inp" value="${a.toFixed(1)}"
              step="1" placeholder="2461163.5"
              style="font-family:'Fira Code',monospace; direction:ltr; text-align:left;">
          </div>

          <div style="margin-top:1rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الهجري المقابل</div>
            <div class="result-box" id="jd2h-result" style="font-size:1.1rem;"></div>
          </div>
          <div style="margin-top:.5rem; font-size:.8rem; color:var(--txt3);" id="jd2h-info"></div>

          <div class="test-btns">
            <button class="test-btn" data-jd="${C(1276,1,1).toFixed(1)}">أول يوم (1276/1/1)</button>
            <button class="test-btn" data-jd="${C(1500,12,30).toFixed(1)}">آخر يوم (1500/12/30)</button>
            <button class="test-btn" data-jd="${a.toFixed(1)}">اليوم (${r.year}/${r.month}/${r.day})</button>
            <button class="test-btn" data-jd="${C(1446,9,1).toFixed(1)}">1 رمضان 1446</button>
          </div>
        </div>

        ${n(`import { jdToHijri, hijriToJD } from '@core-components/calendar';

// تحويل JD إلى هجري
const h = jdToHijri(2461163.5);
// h = { year: 1447, month: 10, day: 14 }

// جولة كاملة: هجري → JD → هجري (اختبار دقة)
const original = { year: 1447, month: 9, day: 1 };
const jd = hijriToJD(original.year, original.month, original.day);
const back = jdToHijri(jd);
// back.year === 1447, back.month === 9, back.day === 1`,`typescript`,`jdToHijri()`)}
      </div>
    </div>

  </div>
</section>`;let o=document.getElementById(`h2jd-year`),s=document.getElementById(`h2jd-month`),c=document.getElementById(`h2jd-day`);function l(){let e=parseInt(o.value),t=parseInt(s.value),n=parseInt(c.value);if(!(!e||!t||!n))try{let r=C(e,t,n);document.getElementById(`h2jd-result`).textContent=r.toFixed(1),document.getElementById(`h2jd-result`).className=`result-box is-valid`,document.getElementById(`h2jd-info`).textContent=`MCJDN = ${Math.round(r-24e5+.5)} · هجري ${e}/${String(t).padStart(2,`0`)}/${String(n).padStart(2,`0`)}`}catch{document.getElementById(`h2jd-result`).textContent=`خارج النطاق`,document.getElementById(`h2jd-result`).className=`result-box is-invalid`}}[o,c].forEach(e=>e.addEventListener(`input`,l)),s.addEventListener(`change`,l),l();let u=document.getElementById(`jd2h-inp`);function d(){let e=parseFloat(u.value);if(e)try{let t=w(e),n=g[t.month-1];document.getElementById(`jd2h-result`).textContent=`${t.year}/${String(t.month).padStart(2,`0`)}/${String(t.day).padStart(2,`0`)} — ${t.day} ${n} ${t.year} هـ`,document.getElementById(`jd2h-result`).className=`result-box is-valid`,document.getElementById(`jd2h-info`).textContent=`JD = ${e.toFixed(1)}`}catch{document.getElementById(`jd2h-result`).textContent=`خارج نطاق الجدول`,document.getElementById(`jd2h-result`).className=`result-box is-invalid`}}u.addEventListener(`input`,d),d(),document.querySelectorAll(`.test-btn[data-jd]`).forEach(e=>{e.addEventListener(`click`,()=>{u.value=e.dataset.jd||``,d()})})}function ce(e){let t=document.getElementById(e);t&&(t.innerHTML=`
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
          ${g.map((e,t)=>`
            <div class="month-cell">
              <div>
                <div class="month-cell-name">${e}</div>
                <div class="month-cell-en">${_[t]}</div>
              </div>
              <span class="month-cell-num">${t+1}</span>
            </div>
          `).join(``)}
        </div>
        ${n(`import { HIJRI_MONTH_NAMES, HIJRI_MONTH_NAMES_EN } from '@core-components/calendar';

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
const monthEn = HIJRI_MONTH_NAMES_EN[hijri.month - 1];  // "Shawwal"`,`typescript`,`HIJRI_MONTH_NAMES`)}
      </div>
    </div>

    <!-- Day names -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">أسماء الأيام &nbsp;<span class="badge badge-const">DAY_NAMES_AR</span> &nbsp;<span class="badge badge-const">DAY_NAMES_SHORT_AR</span></span>
      </div>
      <div class="card-body">
        <div class="days-grid">
          ${v.map((e,t)=>`
            <div class="day-cell" style="${t===5?`background:var(--accent-bg);border-color:var(--accent-bdr);`:``}">
              <div class="day-cell-full" style="${t===5?`color:var(--accent);`:``}">${e}</div>
              <div class="day-cell-short">${y[t]}</div>
              <div style="font-family:'Fira Code',monospace;font-size:.68rem;color:var(--txt3);margin-top:.1rem;">[${t}]</div>
            </div>
          `).join(``)}
        </div>
        ${n(`import { DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from '@core-components/calendar';

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
const isFriday = idx === 5; // الجمعة = 5`,`typescript`,`DAY_NAMES_AR`)}
      </div>
    </div>

    <!-- Gregorian month names -->
    <div class="card">
      <div class="card-hdr">
        <span class="card-hdr-title">أسماء الأشهر الميلادية &nbsp;<span class="badge badge-const">GREG_MONTH_NAMES_AR</span></span>
      </div>
      <div class="card-body">
        <div class="months-grid">
          ${b.map((e,t)=>`
            <div class="month-cell">
              <div class="month-cell-name">${e}</div>
              <span class="month-cell-num">${t+1}</span>
            </div>
          `).join(``)}
        </div>
        ${n(`import { GREG_MONTH_NAMES_AR } from '@core-components/calendar';

GREG_MONTH_NAMES_AR[0];   // "يناير"
GREG_MONTH_NAMES_AR[11];  // "ديسمبر"

// مثال: تنسيق تاريخ ميلادي بالعربي
const greg = hijriToGregorian(1447, 10, 14);
const label = \`\${greg.day} \${GREG_MONTH_NAMES_AR[greg.month - 1]} \${greg.year}\`;
// "12 إبريل 2026"`,`typescript`,`GREG_MONTH_NAMES_AR`)}
      </div>
    </div>

  </div>
</section>`)}var X=[{kind:`fn`,name:`todayHijri`,signature:`(): HijriDateObj`,returns:`HijriDateObj`,description:`التاريخ الهجري لليوم (أم القرى)`},{kind:`fn`,name:`todayGregorian`,signature:`(): GregDateObj`,returns:`GregDateObj`,description:`التاريخ الميلادي لليوم`},{kind:`fn`,name:`gregorianToHijri`,signature:`(year, month, day): HijriDateObj`,returns:`HijriDateObj`,description:`تحويل تاريخ ميلادي (أعداد صحيحة) إلى هجري`},{kind:`fn`,name:`hijriToGregorian`,signature:`(year, month, day): GregDateObj`,returns:`GregDateObj`,description:`تحويل تاريخ هجري (أعداد صحيحة) إلى ميلادي`},{kind:`fn`,name:`gregorianToHijriStr`,signature:`(gregStr: string): string`,returns:`string`,description:`تحويل نص ميلادي إلى هجري — يقبل yyyy/mm/dd أو dd/mm/yyyy`},{kind:`fn`,name:`hijriToGregorianStr`,signature:`(hijriStr: string): string`,returns:`string`,description:`تحويل نص هجري إلى ميلادي — يقبل صيغ متعددة`},{kind:`fn`,name:`hijriIsValid`,signature:`(year, month, day): boolean`,returns:`boolean`,description:`تحقق من صحة تاريخ هجري (النطاق + عدد الأيام الحقيقي)`},{kind:`fn`,name:`hijriDaysInMonth`,signature:`(year, month): number`,returns:`number`,description:`عدد أيام شهر هجري بناءً على جدول أم القرى`},{kind:`fn`,name:`gregDaysInMonth`,signature:`(year, month): number`,returns:`number`,description:`عدد أيام شهر ميلادي (يحسب السنوات الكبيسة)`},{kind:`fn`,name:`hijriDayOfWeek`,signature:`(year, month, day): number`,returns:`0–6`,description:`يوم الأسبوع لتاريخ هجري (0=أحد … 6=سبت)`},{kind:`fn`,name:`gregDayOfWeek`,signature:`(year, month, day): number`,returns:`0–6`,description:`يوم الأسبوع لتاريخ ميلادي (0=أحد … 6=سبت)`},{kind:`fn`,name:`dayOfWeekForJD`,signature:`(jd: number): number`,returns:`0–6`,description:`يوم الأسبوع من رقم Julian Day`},{kind:`fn`,name:`gregIsLeapYear`,signature:`(year): boolean`,returns:`boolean`,description:`هل السنة الميلادية كبيسة؟ (Gregorian calendar rule)`},{kind:`fn`,name:`hijriToJD`,signature:`(year, month, day): number`,returns:`number`,description:`تحويل تاريخ هجري إلى رقم Julian Day (JD)`},{kind:`fn`,name:`jdToHijri`,signature:`(jd: number): {year, month, day}`,returns:`object`,description:`تحويل رقم Julian Day إلى تاريخ هجري`},{kind:`fn`,name:`getDayNameHijri`,signature:`(hijriStr: string): string`,returns:`string`,description:`اسم يوم الأسبوع بالعربية من تاريخ هجري — مثال: "1446/01/15" ← "الأربعاء"`},{kind:`type`,name:`HijriDateObj`,signature:`{ year, month, day, formatted }`,returns:`interface`,description:`كائن نتيجة التاريخ الهجري`},{kind:`type`,name:`GregDateObj`,signature:`{ year, month, day, formatted }`,returns:`interface`,description:`كائن نتيجة التاريخ الميلادي`},{kind:`type`,name:`DateFormat`,signature:`'yyyy/mm/dd' | 'dd/mm/yyyy' | …`,returns:`type`,description:`صيغ التاريخ المدعومة`},{kind:`type`,name:`DateRange`,signature:`{ hijri: string; greg: string }`,returns:`interface`,description:`نطاق تاريخ`},{kind:`type`,name:`ValidationResult`,signature:`{ isValid: boolean; errorMessage? }`,returns:`interface`,description:`نتيجة التحقق من تاريخ`},{kind:`type`,name:`CalendarInputOptions`,signature:`{ bindValue, placeholder, ... }`,returns:`interface`,description:`خيارات حقل التقويم`},{kind:`type`,name:`CalendarInputEvent`,signature:`{ hijri, greg, formatted, displayMode }`,returns:`interface`,description:`حدث اختيار التاريخ`},{kind:`type`,name:`HijriGregDate`,signature:`{ hijri: HijriDateObj; greg: GregDateObj }`,returns:`interface`,description:`كائن يحتوي التاريخين`},{kind:`fn`,name:`createCalendarInput`,signature:`(container, options): {...}`,returns:`object`,description:`إنشاء حقل تقويم تفاعلي`}],Z={fn:`badge-fn`,const:`badge-const`,type:`badge-type`},Q={fn:`fn`,const:`const`,type:`type`};function le(e){let t=document.getElementById(e);if(!t)return;let n=X.map(e=>`
    <tr>
      <td>${e.name}</td>
      <td><span class="badge ${Z[e.kind]}">${Q[e.kind]}</span></td>
      <td><code>${$(e.signature)}</code></td>
      <td><code>${$(e.returns)}</code></td>
      <td>${e.description}</td>
    </tr>
  `).join(``);t.innerHTML=`
<section class="doc-section" id="sec-api-ref">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📋</div>
    <div class="sec-meta">
      <h2 class="sec-title">مرجع API الكامل</h2>
      <p class="sec-desc">جميع الدوال والثوابت والأنواع المُصدَّرة من المكتبة</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Filter -->
    <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:.75rem; align-items:center;">
      <input class="inp" type="search" id="api-search" placeholder="بحث في الدوال والأنواع…"
        style="max-width:300px; font-size:.85rem;" dir="rtl">
      <div style="display:flex; gap:.35rem;">
        <button class="test-btn active" data-filter="all"  id="filter-all">الكل (${X.length})</button>
        <button class="test-btn" data-filter="fn"    id="filter-fn">دوال (${X.filter(e=>e.kind===`fn`).length})</button>
        <button class="test-btn" data-filter="const" id="filter-const">ثوابت (${X.filter(e=>e.kind===`const`).length})</button>
        <button class="test-btn" data-filter="type"  id="filter-type">أنواع (${X.filter(e=>e.kind===`type`).length})</button>
      </div>
    </div>

    <div class="api-tbl-wrap">
      <table class="api-tbl" id="api-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>النوع</th>
            <th>التوقيع</th>
            <th>يُرجع</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody id="api-tbody">${n}</tbody>
      </table>
    </div>

    <p style="margin-top:.75rem; font-size:.78rem; color:var(--txt3); text-align:center;">
      ${X.length} عنصر مُصدَّر · النطاق: 1276–1500 هـ (1859–2077 م) · Zero Dependencies
    </p>

  </div>
</section>`;let r=document.getElementById(`api-search`),i=document.getElementById(`api-tbody`),a=`all`;function o(){let e=r.value.trim().toLowerCase();i.innerHTML=X.filter(t=>{let n=a===`all`||t.kind===a,r=!e||t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)||t.signature.toLowerCase().includes(e);return n&&r}).map(e=>`
      <tr>
        <td>${e.name}</td>
        <td><span class="badge ${Z[e.kind]}">${Q[e.kind]}</span></td>
        <td><code>${$(e.signature)}</code></td>
        <td><code>${$(e.returns)}</code></td>
        <td>${e.description}</td>
      </tr>
    `).join(``)}r.addEventListener(`input`,o),[`all`,`fn`,`const`,`type`].forEach(e=>{document.getElementById(`filter-${e}`)?.addEventListener(`click`,()=>{a=e,[`all`,`fn`,`const`,`type`].forEach(e=>{document.getElementById(`filter-${e}`)?.classList.remove(`active`)}),document.getElementById(`filter-${e}`)?.classList.add(`active`),o()})})}function $(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function ue(e){let t=document.getElementById(e);t&&(t.innerHTML=`
<section class="doc-section" id="sec-angular">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🅰️</div>
    <div class="sec-meta">
      <h2 class="sec-title">Angular Directive (14+)</h2>
      <p class="sec-desc">مكوّن Angular 14+ standalone — انسخه إلى مشروعك</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Download links -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">تحميل الملفات</span></div>
      <div class="card-body">
        <div style="display:flex; flex-wrap:wrap; gap:.625rem;">
          <a href="../../angular/hijri-calendar.directive.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.directive.ts
          </a>
          <a href="../../src/hijri-calendar.lib.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.ts
          </a>
          <a href="../../src/hijri-calendar.css" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.css
          </a>
        </div>
      </div>
    </div>

    <!-- Files to copy -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الملفات المطلوبة</span></div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1rem;">
          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">المكتبة الأساسية — نفس الملف المستخدم في Vanilla</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.directive.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">الـ Directive — انسخه من مجلد angular/</div>
            </div>
          </div>
        </div>

        ${n(`src/app/hijri-calendar/
├── hijri-calendar.lib.ts        ← انسخ هذا
└── hijri-calendar.directive.ts ← انسخ هذا`,`bash`,`هيكل الملفات`)}
      </div>
    </div>

    <!-- Component import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستيراد في Component</span></div>
      <div class="card-body">
        ${n(`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calendar.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  visitDate = '';      // "1446/09/15"
  gregDate  = '';      // "2025/03/15"
}`,`typescript`,`app.component.ts`)}
      </div>
    </div>

    <!-- Template usage -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستخدام في الـ Template</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          أضف الـ directive على أي <code>&lt;input&gt;</code> مع <code>readonly</code> لمنع الكتابة اليدوية.
        </p>
        ${n(`<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input type="text" readonly hijri-calender
       [(ngModel)]="visitDate" name="visitDate"
       placeholder="انقر لاختيار التاريخ" />

<!-- bindValue='gregorian': ngModel يستقبل تاريخ ميلادي -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       [(ngModel)]="gregDate" name="gregDate" />`,`html`,`app.component.html`)}
      </div>
    </div>

    <!-- Full example -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال كامل مع Validation</span></div>
      <div class="card-body">
        ${n(`<form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
  <div class="field">
    <label>اسم المريض <span style="color:red">*</span></label>
    <input type="text" class="inp" name="patientName"
           [(ngModel)]="model.patientName" required />
  </div>

  <div class="field">
    <label>تاريخ الزيارة <span style="color:red">*</span></label>
    <input required type="text" readonly hijri-calender
           class="inp" name="visitDate"
           #visitDate="ngModel"
           [(ngModel)]="model.visitDate"
           placeholder="انقر لاختيار التاريخ" />
    @if (visitDate.invalid && visitDate.touched) {
      <span style="color:red; font-size:12px">هذا الحقل مطلوب</span>
    }
  </div>

  <button type="submit" [disabled]="f.invalid">حفظ</button>
</form>`,`html`,`قالب مع validation`)}
        ${n(`export class MyComponent {
  model = { patientName: '', visitDate: '' };

  onSubmit(f: NgForm) {
    console.log('التاريخ الهجري:', this.model.visitDate);  // "1446/09/15"
  }
}`,`typescript`,`Component class`)}
      </div>
    </div>

    <!-- bindValue explanation -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">bindValue — سلوك الاستقبال والإرسال</span></div>
      <div class="card-body">

        <table class="api-table" style="margin-bottom:1rem;">
          <thead>
            <tr><th>bindValue</th><th>يُرسَل لـ ngModel / الباكاند</th><th>يُستقبَل من الباكاند</th><th>القائمة تبدأ بـ</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'hijri'</code> <small>(افتراضي)</small></td>
              <td>هجري <code>"1446/09/15"</code></td>
              <td>قيمة هجرية → تُعرض في وضع <strong>هـ</strong></td>
              <td>هـ</td>
            </tr>
            <tr>
              <td><code>'gregorian'</code></td>
              <td>ميلادي <code>"2025/03/15"</code></td>
              <td>قيمة ميلادية → تُعرض في وضع <strong>م</strong></td>
              <td>م</td>
            </tr>
          </tbody>
        </table>

        <div style="padding:.75rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; line-height:1.75; color:var(--txt2);">
          <strong>القائمة (هـ / م) = طريقة العرض فقط</strong> — لا تُغيّر القيمة المُخزَّنة.<br>
          مثال: الحقل <code>[bindValue]="'gregorian'"</code> مع الباكاند يُرسل ويستقبل <strong>ميلادي دائماً</strong>، حتى لو اختار المستخدم عرض هجري من القائمة.
        </div>

        ${n(`// مثال: استقبال تاريخ ميلادي من الباكاند
export class VisitFormComponent {
  // الباكاند يُرسل "2025/03/15" → يُعرض في وضع م تلقائياً
  visitDate = '2025/03/15';

  // عند اختيار تاريخ جديد → ngModel يُخزَّن دائماً كميلادي
  // حتى لو اختار المستخدم عرض هجري من القائمة
}`,`typescript`,`مثال bindValue gregorian`)}

      </div>
    </div>

    <!-- dateChange Event -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">dateChange — حدث اختيار التاريخ</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          حدث <code>(dateChange)</code> يُرجع <strong>كائنين</strong>: التاريخ الهجري والميلادي معاً. مفيد عند الحاجة لكلا القيمتين.
        </p>
        ${n(`<!-- Template: bindValue + dateChange -->
<input type="text" readonly hijri-calender
       [bindValue]="'hijri'"
       [(ngModel)]="visitDate"
       (dateChange)="onDateSelected($event)"
       placeholder="اختر التاريخ" />

<!-- أو لجعل ngModel يستقبل الميلادي: -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       [(ngModel)]="gregDate"
       (dateChange)="onDateSelected($event)" />

<!-- $event = { hijri: {year,month,day,formatted}, greg: {...} } -->`,`html`,`Template`)}
        ${n(`// Component
import { HijriGregDate } from './hijri-calendar/hijri-calendar.directive';

export class MyComponent {
  visitDate = '';
  
  onDateSelected(event: HijriGregDate) {
    console.log('الهجري:', event.hijri.formatted);  // "1447/10/15"
    console.log('الميلادي:', event.greg.formatted);  // "2025/04/13"
    console.log('السنة الهجرية:', event.hijri.year);   // 1447
    console.log('الشهر الميلادي:', event.greg.month);  // 4
  }
}`,`typescript`,`Component`)}
      </div>
    </div>

    <!-- Full example with both values -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال كامل: استخدام القيمتين</span></div>
      <div class="card-body">
        ${n(`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective, HijriGregDate } from './hijri-calendar/hijri-calendar.directive';
import { getDayNameHijri } from './hijri-calendar/hijri-calendar.lib';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <div class="booking-form">
      <h3>حجز موعد</h3>

      <label>اختر التاريخ:</label>
      <input type="text" readonly hijri-calender
             [(ngModel)]="hijriDate"
             [bindValue]="'hijri'"
             (dateChange)="onDateChange($event)"
             placeholder="انقر للاختيار" />

      @if (selectedDate) {
        <div class="date-info">
          <p>📅 التاريخ الهجري: <strong>{{ selectedDate.hijri.formatted }}</strong></p>
          <p>📆 التاريخ الميلادي: <strong>{{ selectedDate.greg.formatted }}</strong></p>
          <p>🏷️ اليوم: {{ dayName }}</p>
        </div>
      }
    </div>
  \`
})
export class BookingComponent {
  hijriDate = '';
  selectedDate: HijriGregDate | null = null;
  dayName = '';

  onDateChange(event: HijriGregDate) {
    this.selectedDate = event;
    this.dayName = getDayNameHijri(event.hijri.formatted);
  }
}`,`typescript`,`مثال كامل`)}
      </div>
    </div>

  </div>
</section>`)}function de(e){let t=document.getElementById(e);t&&(t.innerHTML=`
<section class="doc-section" id="sec-legacy">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔶</div>
    <div class="sec-meta">
      <h2 class="sec-title">Legacy Angular (7–13)</h2>
      <p class="sec-desc">متوافق مع Angular 7 إلى 13 — يستخدم NgModule</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Download links -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">تحميل الملفات</span></div>
      <div class="card-body">
        <div style="display:flex; flex-wrap:wrap; gap:.625rem;">
          <a href="../../legacy/hijri-calender-ng7.directive.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calender-ng7.directive.ts
          </a>
          <a href="../../src/hijri-calendar.lib.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.ts
          </a>
          <a href="../../src/hijri-calendar.css" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.css
          </a>
        </div>
      </div>
    </div>

    <!-- Files to copy -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الملفات المطلوبة</span></div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1rem;">
          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">المكتبة الأساسية — نفس الملف المستخدم في Vanilla</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calender-ng7.directive.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">الـ Directive المخصص للنسخ القديمة — من مجلد legacy/ — <strong>ليس نفس ملف Angular 14+</strong></div>
            </div>
          </div>
        </div>

        ${n(`src/app/directives/
├── hijri-calendar.lib.ts             ← انسخ هذا (من src/)
└── hijri-calender-ng7.directive.ts  ← انسخ هذا (من legacy/)`,`bash`,`هيكل الملفات`)}
        <p style="font-size:.82rem; color:var(--txt3); margin-top:.5rem;">
          ⚠️ انتبه: اسم الملف هو <code>hijri-calender-ng7.directive.ts</code> وليس <code>hijri-calendar.directive.ts</code> — فالملف مختلف عن نسخة Angular 14+
        </p>
      </div>
    </div>

    <!-- AppModule setup -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الإضافة في AppModule</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          أضف الـ directive في قسم <code>declarations</code> في الـ NgModule.
        </p>
        ${n(`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HijriCalenderDirective } from './directives/hijri-calender-ng7.directive';

@NgModule({
  declarations: [
    AppComponent,
    HijriCalenderDirective,   // ← أضف هنا
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }`,`typescript`,`app.module.ts`)}
      </div>
    </div>

    <!-- Template usage -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستخدام في الـ Template</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          نفس أسلوب الاستخدام كـ Angular 14+ من حيث الـ inputs والـ outputs — لكن استخدم <code>*ngIf</code> بدلاً من <code>@if</code>.
        </p>
        ${n(`<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input type="text" readonly hijri-calender
       class="form-control" name="visitDate"
       [(ngModel)]="model.visitDate"
       placeholder="انقر لاختيار التاريخ" />

<!-- ngModel يستقبل تاريخ ميلادي — القائمة تبدأ بـ م تلقائياً -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       class="form-control" name="gregDate"
       [(ngModel)]="model.gregDate" />

<!-- مع dateChange event -->
<input type="text" readonly hijri-calender
       [(ngModel)]="selectedDate"
       (dateChange)="onDateSelected($event)"
       placeholder="اختر التاريخ" />`,`html`,`app.component.html`)}
        ${n(`<!-- مع validation -->
<div *ngIf="visitDate.invalid && visitDate.touched"
     style="color:red; font-size:12px">
  هذا الحقل مطلوب
</div>`,`html`,`استخدام *ngIf`)}
      </div>
    </div>

    <!-- Component examples -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">أمثلة كاملة في الـ Component</span></div>
      <div class="card-body">
        <div style="display:grid; gap:.75rem;">

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">1. استخدام مع ngModel</div>
            ${n(`import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="visitDate"
           placeholder="اختر التاريخ" />

    <p>التاريخ الهجري: {{ visitDate }}</p>
  \`
})
export class DatePickerComponent {
  visitDate = '';   // "1446/09/15"
}`,`typescript`)}
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">2. استخدام مع dateChange event</div>
            ${n(`import { Component } from '@angular/core';

@Component({
  selector: 'app-date-event',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />

    <div *ngIf="lastEvent">
      <p>الهجري: {{ lastEvent.hijri.formatted }}</p>
      <p>الميلادي: {{ lastEvent.greg.formatted }}</p>
    </div>
  \`
})
export class DateEventComponent {
  selectedDate = '';
  lastEvent: any = null;

  onDateSelected(event: any) {
    this.lastEvent = event;
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`,`typescript`)}
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">3. استخدام bindValue مع gregorian (بيانات من الباكاند)</div>
            ${n(`import { Component } from '@angular/core';

@Component({
  selector: 'app-gregorian-picker',
  template: \`
    <!-- bindValue='gregorian': القائمة تبدأ بـ م والـ ngModel يستقبل/يرسل ميلادي -->
    <input type="text" readonly hijri-calender
           [bindValue]="'gregorian'"
           [(ngModel)]="gregorianDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ الميلادي" />

    <p>الميلادي: {{ gregorianDate }}</p>
    <p *ngIf="hijriEquivalent">الهجري المقابل: {{ hijriEquivalent }}</p>
  \`
})
export class GregorianPickerComponent {
  gregorianDate = '2024/07/19';  // من الباكاند — يُعرض كميلادي تلقائياً
  hijriEquivalent = '';

  onDateSelected(event: any) {
    this.hijriEquivalent = event.hijri.formatted;
  }
}`,`typescript`)}
          </div>

        </div>
      </div>
    </div>

    <!-- Differences -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الفروق بين النسختين</span></div>
      <div class="card-body">
        <table class="api-table">
          <thead>
            <tr><th>الميزة</th><th>Angular 14+</th><th>Angular 7–13</th></tr>
          </thead>
          <tbody>
            <tr><td>ملف الـ Directive</td><td><code>hijri-calendar.directive.ts</code></td><td><code>hijri-calender-ng7.directive.ts</code></td></tr>
            <tr><td><code>standalone: true</code></td><td>✅</td><td>❌ — يُضاف في NgModule</td></tr>
            <tr><td>TypeScript</td><td>5.x (modern)</td><td>3.x–4.x compatible</td></tr>
            <tr><td>Template control flow</td><td><code>@if</code> / <code>@for</code></td><td><code>*ngIf</code> / <code>*ngFor</code></td></tr>
            <tr><td><code>bindValue</code></td><td>✅</td><td>✅</td></tr>
            <tr><td>قائمة هـ / م</td><td>✅</td><td>✅</td></tr>
            <tr><td><code>dateChange</code> event</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</section>`)}e.init(),document.addEventListener(`DOMContentLoaded`,()=>{r(`doc-header`,`vanilla`),o(`s-hero`),s(`s-getting-started`),te(`s-widget`),ne(`s-event-handling`),re(`s-today`),H(`s-conversion`),q(`s-string-conv`),J(`s-validation`),ie(`s-month-info`),ae(`s-day-of-week`),oe(`s-leap-year`),se(`s-julian`),ce(`s-constants`),le(`s-api-ref`),ue(`s-angular`),de(`s-legacy`),a(`doc-sidebar`)});