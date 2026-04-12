import { hijriDaysInMonth, gregDaysInMonth, HIJRI_MONTH_NAMES, gregIsLeapYear } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderMonthInfo(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  // Build hijri month options
  const hMonthOpts = HIJRI_MONTH_NAMES.map((n, i) =>
    `<option value="${i+1}" ${i===0?'selected':''}>${i+1} — ${n}</option>`
  ).join('');

  const gregMonths = ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const gMonthOpts = gregMonths.map((n, i) =>
    `<option value="${i+1}" ${i===0?'selected':''}>${i+1} — ${n}</option>`
  ).join('');

  el.innerHTML = `
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
              <select class="inp inp-sel" id="hdim-month">${hMonthOpts}</select>
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

        ${codeBlock(`import { hijriDaysInMonth, HIJRI_MONTH_NAMES } from '@core-components/calendar';

// عدد أيام شهر رمضان 1447
const days = hijriDaysInMonth(1447, 9);
console.log(days); // 29

// عرض اسم الشهر
const name = HIJRI_MONTH_NAMES[8]; // "رمضان"

// فائدة: توليد أيام شهر للتقويم
const daysArr = Array.from({ length: days }, (_, i) => i + 1);
// [1, 2, 3, ..., 29]`, 'typescript', 'hijriDaysInMonth()')}
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
              <select class="inp inp-sel" id="gdim-month">${gMonthOpts}</select>
            </div>
          </div>

          <div style="margin-top:1rem; display:flex; gap:.75rem; align-items:center; flex-wrap:wrap;">
            <div class="result-box" id="gdim-result" style="font-size:1.3rem; padding:.75rem 1.5rem;"></div>
            <div style="font-size:.9rem; color:var(--txt2);" id="gdim-desc"></div>
          </div>
        </div>

        ${codeBlock(`import { gregDaysInMonth, gregIsLeapYear } from '@core-components/calendar';

// أيام فبراير 2024 (سنة كبيسة)
gregDaysInMonth(2024, 2); // 29

// أيام فبراير 2026 (ليست كبيسة)
gregDaysInMonth(2026, 2); // 28

// أيام يناير دائماً
gregDaysInMonth(2026, 1); // 31

// التحقق من السنة الكبيسة
gregIsLeapYear(2024); // true
gregIsLeapYear(2025); // false`, 'typescript', 'gregDaysInMonth()')}
      </div>
    </div>

  </div>
</section>`;

  // Init hijri
  const hYear = document.getElementById('hdim-year') as HTMLInputElement;
  const hMonth = document.getElementById('hdim-month') as HTMLSelectElement;

  function computeHijri(): void {
    const y = parseInt(hYear.value), m = parseInt(hMonth.value);
    if (!y || !m || y < 1276 || y > 1500) {
      const r = document.getElementById('hdim-result')!;
      r.textContent = '—';
      r.className = 'result-box';
      return;
    }
    const days = hijriDaysInMonth(y, m);
    const r = document.getElementById('hdim-result')!;
    r.textContent = `${days} يوم`;
    r.className = 'result-box is-valid';
    document.getElementById('hdim-desc')!.textContent =
      `شهر ${HIJRI_MONTH_NAMES[m-1]} ${y} هـ`;

    // Dots
    const dotsEl = document.getElementById('hdim-dots')!;
    dotsEl.innerHTML = Array.from({ length: days }, (_, i) => {
      const d = i + 1;
      const isStart = d === 1 || d === days;
      return `<div title="${d}" style="
        width: 28px; height: 28px;
        border-radius: 6px;
        background: ${isStart ? 'var(--accent)' : 'var(--surf)'};
        border: 1px solid ${isStart ? 'var(--accent)' : 'var(--bdr)'};
        display: flex; align-items: center; justify-content: center;
        font-size: .72rem; font-family: 'Fira Code', monospace;
        color: ${isStart ? '#fff' : 'var(--txt2)'};
        cursor: default;
        transition: background .15s;
      ">${d}</div>`;
    }).join('');
  }

  hYear.addEventListener('input', computeHijri);
  hMonth.addEventListener('change', computeHijri);
  computeHijri();

  // Init gregorian
  const gYear = document.getElementById('gdim-year') as HTMLInputElement;
  const gMonth = document.getElementById('gdim-month') as HTMLSelectElement;

  function computeGreg(): void {
    const y = parseInt(gYear.value), m = parseInt(gMonth.value);
    if (!y || !m) return;
    const days = gregDaysInMonth(y, m);
    const r = document.getElementById('gdim-result')!;
    r.textContent = `${days} يوم`;
    r.className = 'result-box is-valid';
    const isLeap = gregIsLeapYear(y);
    document.getElementById('gdim-desc')!.textContent =
      `${m === 2 ? (isLeap ? '(سنة كبيسة)' : '(ليست كبيسة)') : ''} السنة ${y}`;
  }

  gYear.addEventListener('input', computeGreg);
  gMonth.addEventListener('change', computeGreg);
  computeGreg();
}
