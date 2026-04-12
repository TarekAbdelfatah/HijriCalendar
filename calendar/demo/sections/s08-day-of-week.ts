import {
  hijriDayOfWeek, gregDayOfWeek,
  DAY_NAMES_AR, DAY_NAMES_SHORT_AR,
  HIJRI_MONTH_NAMES, todayHijri, todayGregorian,
} from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderDayOfWeek(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  const th = todayHijri();
  const tg = todayGregorian();

  const hMonthOpts = HIJRI_MONTH_NAMES.map((n, i) =>
    `<option value="${i+1}" ${(i+1)===th.month?'selected':''}>${i+1} — ${n}</option>`
  ).join('');

  el.innerHTML = `
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
        — يُرجعان رقم اليوم (0=الأحد) مع دعم الأسماء العربية
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
              <input class="inp" type="number" id="hdow-year" value="${th.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="hdow-month">${hMonthOpts}</select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="hdow-day" value="${th.day}" min="1" max="30">
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="hdow-result" style="font-size:1.2rem; padding:.75rem 1.5rem; min-width:180px;"></div>
            <div style="font-size:.84rem; color:var(--txt2);" id="hdow-idx"></div>
          </div>
        </div>

        ${codeBlock({
  vanilla: `import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0 (الأحد)
const name = DAY_NAMES_AR[idx];            // "الأحد"
const abbr = DAY_NAMES_SHORT_AR[idx];      // "أحد"

// مصفوفة الأسماء الكاملة (0=أحد ... 6=سبت)
// DAY_NAMES_AR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']`,
  angular: `import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0
const name = DAY_NAMES_AR[idx];            // "الأحد"`,
  legacy: `import { hijriDayOfWeek, DAY_NAMES_AR, DAY_NAMES_SHORT_AR } from './hijri-calendar.lib';

const idx  = hijriDayOfWeek(1447, 10, 14); // 0
const name = DAY_NAMES_AR[idx];            // "الأحد"`
}, 'typescript', 'hijriDayOfWeek()')}
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
              <input class="inp" type="number" id="gdow-year" value="${tg.year}" min="1859" max="2077">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر (1–12)</label>
              <input class="inp" type="number" id="gdow-month" value="${tg.month}" min="1" max="12">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="gdow-day" value="${tg.day}" min="1" max="31">
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="gdow-result" style="font-size:1.2rem; padding:.75rem 1.5rem; min-width:180px;"></div>
            <div style="font-size:.84rem; color:var(--txt2);" id="gdow-idx"></div>
          </div>
        </div>

        ${codeBlock({
  vanilla: `import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0 (الأحد)
const name = DAY_NAMES_AR[idx];          // "الأحد"

// التحقق من يوم الجمعة
const isFriday = gregDayOfWeek(2026, 4, 17) === 5; // true`,
  angular: `import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0
const name = DAY_NAMES_AR[idx];          // "الأحد"`,
  legacy: `import { gregDayOfWeek, DAY_NAMES_AR } from './hijri-calendar.lib';

const idx  = gregDayOfWeek(2026, 4, 12); // 0
const name = DAY_NAMES_AR[idx];          // "الأحد"`
}, 'typescript', 'gregDayOfWeek()')}
      </div>
    </div>

  </div>
</section>`;

  // Build reference grid
  const refGrid = document.getElementById('dow-ref-grid')!;
  DAY_NAMES_AR.forEach((name, idx) => {
    const isFri = idx === 5;
    refGrid.innerHTML += `<div style="
      background: ${isFri ? 'var(--accent)' : 'var(--surf)'};
      border: 1px solid ${isFri ? 'var(--accent)' : 'var(--bdr)'};
      border-radius: 8px; padding: .5rem .875rem;
      text-align: center; min-width: 72px;
    ">
      <div style="font-family:'Fira Code',monospace; font-size:.72rem; color:${isFri?'rgba(255,255,255,.7)':'var(--txt3)'}; margin-bottom:.2rem;">${idx}</div>
      <div style="font-size:.85rem; font-weight:600; color:${isFri?'#fff':'var(--txt)'};">${name}</div>
      <div style="font-size:.72rem; color:${isFri?'rgba(255,255,255,.6)':'var(--txt3)'}; margin-top:.1rem;">${DAY_NAMES_SHORT_AR[idx]}</div>
    </div>`;
  });

  // Hijri DOW
  const hyEl = document.getElementById('hdow-year') as HTMLInputElement;
  const hmEl = document.getElementById('hdow-month') as HTMLSelectElement;
  const hdEl = document.getElementById('hdow-day') as HTMLInputElement;

  function computeHijriDow(): void {
    const y = parseInt(hyEl.value), m = parseInt(hmEl.value), d = parseInt(hdEl.value);
    if (!y || !m || !d) return;
    try {
      const idx = hijriDayOfWeek(y, m, d);
      document.getElementById('hdow-result')!.textContent = DAY_NAMES_AR[idx];
      document.getElementById('hdow-result')!.className = 'result-box is-valid';
      document.getElementById('hdow-idx')!.textContent = `الفهرس: ${idx} · ${DAY_NAMES_SHORT_AR[idx]}`;
    } catch {
      document.getElementById('hdow-result')!.textContent = 'تاريخ غير صالح';
      document.getElementById('hdow-result')!.className = 'result-box is-invalid';
    }
  }

  [hyEl, hdEl].forEach(e => e.addEventListener('input', computeHijriDow));
  hmEl.addEventListener('change', computeHijriDow);
  computeHijriDow();

  // Greg DOW
  const gyEl = document.getElementById('gdow-year') as HTMLInputElement;
  const gmEl = document.getElementById('gdow-month') as HTMLInputElement;
  const gdEl = document.getElementById('gdow-day') as HTMLInputElement;

  function computeGregDow(): void {
    const y = parseInt(gyEl.value), m = parseInt(gmEl.value), d = parseInt(gdEl.value);
    if (!y || !m || !d) return;
    try {
      const idx = gregDayOfWeek(y, m, d);
      document.getElementById('gdow-result')!.textContent = DAY_NAMES_AR[idx];
      document.getElementById('gdow-result')!.className = 'result-box is-valid';
      document.getElementById('gdow-idx')!.textContent = `الفهرس: ${idx} · ${DAY_NAMES_SHORT_AR[idx]}`;
    } catch {
      document.getElementById('gdow-result')!.textContent = 'تاريخ غير صالح';
      document.getElementById('gdow-result')!.className = 'result-box is-invalid';
    }
  }

  [gyEl, gmEl, gdEl].forEach(e => e.addEventListener('input', computeGregDow));
  computeGregDow();
}
