import {
  gregorianToHijri, hijriToGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_AR,
  gregDayOfWeek, hijriDayOfWeek,
  todayGregorian, todayHijri,
} from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderConversion(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  const tg = todayGregorian();
  const th = todayHijri();

  // Build today's ISO date string for the date picker default value
  const todayISO = `${tg.year}-${String(tg.month).padStart(2,'0')}-${String(tg.day).padStart(2,'0')}`;

  el.innerHTML = `
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
            <input class="inp" type="date" id="g2h-picker" value="${todayISO}"
              min="1859-01-01" max="2077-11-28"
              style="width:100%; max-width:240px; cursor:pointer;">
            <span style="font-size:.78rem; color:var(--txt3); margin-top:.3rem; display:block;">أو أدخل يدوياً أدناه</span>
          </div>

          <!-- Manual inputs -->
          <div class="demo-3col" style="margin-bottom:1rem;">
            <div class="inp-grp">
              <label class="inp-lbl">السنة</label>
              <input class="inp" type="number" id="g2h-year" value="${tg.year}" min="1859" max="2077">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر (1–12)</label>
              <input class="inp" type="number" id="g2h-month" value="${tg.month}" min="1" max="12">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم (1–31)</label>
              <input class="inp" type="number" id="g2h-day" value="${tg.day}" min="1" max="31">
            </div>
          </div>

          <!-- Result -->
          <div style="margin-bottom:.75rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الهجري</div>
            <div class="result-box" id="g2h-result" style="font-size:1.25rem;"></div>
          </div>
          <div style="padding:.75rem 1rem; background:var(--surf); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; color:var(--txt2);" id="g2h-details"></div>
        </div>

        ${codeBlock({
  vanilla: `# Option 1: Pure JS
var result = HijriCalendar.gregorianToHijri(2026, 4, 12);
// { year: 1447, month: 10, day: 14, formatted: "1447/10/14" }

# Option 2: With Vite
import { gregorianToHijri } from './lib/hijri-calendar.lib';
const result = gregorianToHijri(2026, 4, 12);`,
  angular: `// Convert in component
import { Component } from '@angular/core';
import { gregorianToHijri } from './hijri-calendar.lib';

@Component({ selector: 'app-conv', template: '' })
export class ConvComponent {
  convert() {
    const hijri = gregorianToHijri(2026, 4, 12);
    console.log(hijri.formatted); // "1447/10/14"
  }
}`,
  legacy: `// Angular 7-13
import { Component } from '@angular/core';
import { gregorianToHijri } from './hijri-calendar.lib';

@Component({
  selector: 'app-conv',
  template: '<p>{{ hijri.formatted }}</p>'
})
export class ConvComponent {
  hijri = gregorianToHijri(2026, 4, 12);
}`
}, 'typescript', 'Gregorian to Hijri')}
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
              <input class="inp" type="number" id="h2g-year" value="${th.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="h2g-month">
                ${HIJRI_MONTH_NAMES.map((n, i) =>
                  `<option value="${i+1}" ${(i+1) === th.month ? 'selected' : ''}>${i+1} — ${n}</option>`
                ).join('')}
              </select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم (1–30)</label>
              <input class="inp" type="number" id="h2g-day" value="${th.day}" min="1" max="30">
            </div>
          </div>

          <!-- Result -->
          <div style="margin-bottom:.75rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الميلادي</div>
            <div class="result-box" id="h2g-result" style="font-size:1.25rem;"></div>
          </div>
          <div style="padding:.75rem 1rem; background:var(--surf); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; color:var(--txt2);" id="h2g-details"></div>
        </div>

        ${codeBlock(`import { hijriToGregorian, DAY_NAMES_AR, hijriDayOfWeek } from './hijri-calendar.lib';

const result  = hijriToGregorian(1447, 10, 14);
// { year: 2026, month: 4, day: 12, formatted: "2026/04/12" }

const dayIdx  = hijriDayOfWeek(1447, 10, 14);
const dayName = DAY_NAMES_AR[dayIdx]; // "الأحد"`, 'typescript', 'hijriToGregorian()')}
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
</section>`;

  initG2H();
  initH2G();
  initQuickTests();
}

/* ── Gregorian → Hijri ── */
function initG2H(): void {
  const picker = document.getElementById('g2h-picker') as HTMLInputElement;
  const yEl    = document.getElementById('g2h-year')   as HTMLInputElement;
  const mEl    = document.getElementById('g2h-month')  as HTMLInputElement;
  const dEl    = document.getElementById('g2h-day')    as HTMLInputElement;

  // Sync date picker → manual inputs
  picker?.addEventListener('change', () => {
    if (!picker.value) return;
    const [y, m, d] = picker.value.split('-').map(Number);
    yEl.value = String(y);
    mEl.value = String(m);
    dEl.value = String(d);
    compute();
  });

  // Sync manual inputs → date picker
  [yEl, mEl, dEl].forEach(el => el?.addEventListener('input', () => {
    const y = parseInt(yEl.value), m = parseInt(mEl.value), d = parseInt(dEl.value);
    if (y >= 1859 && y <= 2077 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      picker.value = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
    compute();
  }));

  function compute(): void {
    const y = parseInt(yEl.value), m = parseInt(mEl.value), d = parseInt(dEl.value);
    if (!y || !m || !d) return;
    try {
      const r         = gregorianToHijri(y, m, d);
      const monthName = HIJRI_MONTH_NAMES[r.month - 1];
      const dayIdx    = gregDayOfWeek(y, m, d);
      const dayName   = DAY_NAMES_AR[dayIdx];

      setResult('g2h-result', `${r.day} ${monthName} ${r.year} هـ`, false);
      const det = document.getElementById('g2h-details');
      if (det) det.innerHTML = `
        <strong>مُنسَّق:</strong>&nbsp;${r.formatted}&nbsp;·&nbsp;
        <strong>الشهر:</strong>&nbsp;${r.month} — ${monthName}&nbsp;·&nbsp;
        <strong>يوم الأسبوع:</strong>&nbsp;${dayName}`;
    } catch {
      setResult('g2h-result', 'تاريخ خارج النطاق (1859–2077)', true);
      const det = document.getElementById('g2h-details');
      if (det) det.textContent = '';
    }
  }

  compute();
}

/* ── Hijri → Gregorian ── */
function initH2G(): void {
  const yEl = document.getElementById('h2g-year')  as HTMLInputElement;
  const mEl = document.getElementById('h2g-month') as HTMLSelectElement;
  const dEl = document.getElementById('h2g-day')   as HTMLInputElement;

  function compute(): void {
    const y = parseInt(yEl.value), m = parseInt(mEl.value), d = parseInt(dEl.value);
    if (!y || !m || !d) return;
    try {
      const r        = hijriToGregorian(y, m, d);
      const dayIdx   = hijriDayOfWeek(y, m, d);
      const dayName  = DAY_NAMES_AR[dayIdx];
      const gregMons = ['يناير','فبراير','مارس','إبريل','مايو','يونيو',
                        'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

      setResult('h2g-result', `${r.day} ${gregMons[r.month - 1]} ${r.year} م`, false);
      const det = document.getElementById('h2g-details');
      if (det) det.innerHTML = `
        <strong>مُنسَّق:</strong>&nbsp;${r.formatted}&nbsp;·&nbsp;
        <strong>الشهر:</strong>&nbsp;${r.month} — ${gregMons[r.month - 1]}&nbsp;·&nbsp;
        <strong>يوم الأسبوع:</strong>&nbsp;${dayName}`;
    } catch {
      setResult('h2g-result', 'تاريخ غير صالح', true);
      const det = document.getElementById('h2g-details');
      if (det) det.textContent = '';
    }
  }

  [yEl, mEl, dEl].forEach(el => el?.addEventListener('change', compute));
  [yEl, dEl].forEach(el => el?.addEventListener('input', compute));
  compute();
}

/* ── Quick tests ── */
function initQuickTests(): void {
  document.querySelectorAll('#quick-test-btns .test-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const gDate = (btn as HTMLElement).dataset['g'];
      const hDate = (btn as HTMLElement).dataset['h'];

      if (gDate) {
        const [y, m, d] = gDate.split('/').map(Number);
        (document.getElementById('g2h-year')   as HTMLInputElement).value = String(y);
        (document.getElementById('g2h-month')  as HTMLInputElement).value = String(m);
        (document.getElementById('g2h-day')    as HTMLInputElement).value = String(d);
        const picker = document.getElementById('g2h-picker') as HTMLInputElement;
        if (picker) picker.value = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        document.getElementById('g2h-year')?.dispatchEvent(new Event('input'));
      }

      if (hDate) {
        const [y, m, d] = hDate.split('/').map(Number);
        (document.getElementById('h2g-year')  as HTMLInputElement).value  = String(y);
        (document.getElementById('h2g-month') as HTMLSelectElement).value = String(m);
        (document.getElementById('h2g-day')   as HTMLInputElement).value  = String(d);
        document.getElementById('h2g-year')?.dispatchEvent(new Event('input'));
      }
    });
  });
}

function setResult(id: string, text: string, isError: boolean): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('is-invalid', isError);
  el.classList.toggle('is-valid',  !isError && text !== '');
}
