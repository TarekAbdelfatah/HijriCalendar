import { hijriToJD, jdToHijri, HIJRI_MONTH_NAMES, todayHijri } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderJulian(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  const th = todayHijri();

  const hMonthOpts = HIJRI_MONTH_NAMES.map((n, i) =>
    `<option value="${i+1}" ${(i+1)===th.month?'selected':''}>${i+1} — ${n}</option>`
  ).join('');

  // Today's JD
  const todayJD = hijriToJD(th.year, th.month, th.day);

  el.innerHTML = `
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
      يوم الأحد الحالي (${th.year}/${String(th.month).padStart(2,'0')}/${String(th.day).padStart(2,'0')} هـ) يساوي
      <strong style="color:var(--accent); font-family:'Fira Code',monospace;">${todayJD.toFixed(1)}</strong> JD.
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
              <input class="inp" type="number" id="h2jd-year" value="${th.year}" min="1276" max="1500">
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">الشهر</label>
              <select class="inp inp-sel" id="h2jd-month">${hMonthOpts}</select>
            </div>
            <div class="inp-grp">
              <label class="inp-lbl">اليوم</label>
              <input class="inp" type="number" id="h2jd-day" value="${th.day}" min="1" max="30">
            </div>
          </div>
          <div style="margin-top:1rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">Julian Day Number</div>
            <div class="result-box" id="h2jd-result" style="font-size:1.1rem; font-family:'Fira Code',monospace; direction:ltr;"></div>
          </div>
          <div style="margin-top:.5rem; font-size:.8rem; color:var(--txt3);" id="h2jd-info"></div>
        </div>

        ${codeBlock(`import { hijriToJD } from '@core-components/calendar';

const jd = hijriToJD(1447, 10, 14);
// jd ≈ 2461163.5  (Julian Day Number)

// فائدة: حساب الفرق بالأيام بين تاريخين
const jd1 = hijriToJD(1447, 1, 1);
const jd2 = hijriToJD(1447, 12, 30);
const diff = Math.round(jd2 - jd1); // عدد أيام السنة الهجرية`, 'typescript', 'hijriToJD()')}
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
            <input class="inp" type="number" id="jd2h-inp" value="${todayJD.toFixed(1)}"
              step="1" placeholder="2461163.5"
              style="font-family:'Fira Code',monospace; direction:ltr; text-align:left;">
          </div>

          <div style="margin-top:1rem;">
            <div class="inp-lbl" style="margin-bottom:.4rem;">التاريخ الهجري المقابل</div>
            <div class="result-box" id="jd2h-result" style="font-size:1.1rem;"></div>
          </div>
          <div style="margin-top:.5rem; font-size:.8rem; color:var(--txt3);" id="jd2h-info"></div>

          <div class="test-btns">
            <button class="test-btn" data-jd="${hijriToJD(1276, 1, 1).toFixed(1)}">أول يوم (1276/1/1)</button>
            <button class="test-btn" data-jd="${hijriToJD(1500, 12, 30).toFixed(1)}">آخر يوم (1500/12/30)</button>
            <button class="test-btn" data-jd="${todayJD.toFixed(1)}">اليوم (${th.year}/${th.month}/${th.day})</button>
            <button class="test-btn" data-jd="${hijriToJD(1446, 9, 1).toFixed(1)}">1 رمضان 1446</button>
          </div>
        </div>

        ${codeBlock(`import { jdToHijri, hijriToJD } from '@core-components/calendar';

// تحويل JD إلى هجري
const h = jdToHijri(2461163.5);
// h = { year: 1447, month: 10, day: 14 }

// جولة كاملة: هجري → JD → هجري (اختبار دقة)
const original = { year: 1447, month: 9, day: 1 };
const jd = hijriToJD(original.year, original.month, original.day);
const back = jdToHijri(jd);
// back.year === 1447, back.month === 9, back.day === 1`, 'typescript', 'jdToHijri()')}
      </div>
    </div>

  </div>
</section>`;

  // hijriToJD
  const h2jdYear = document.getElementById('h2jd-year') as HTMLInputElement;
  const h2jdMonth = document.getElementById('h2jd-month') as HTMLSelectElement;
  const h2jdDay = document.getElementById('h2jd-day') as HTMLInputElement;

  function computeH2JD(): void {
    const y = parseInt(h2jdYear.value), m = parseInt(h2jdMonth.value), d = parseInt(h2jdDay.value);
    if (!y || !m || !d) return;
    try {
      const jd = hijriToJD(y, m, d);
      document.getElementById('h2jd-result')!.textContent = jd.toFixed(1);
      document.getElementById('h2jd-result')!.className = 'result-box is-valid';
      document.getElementById('h2jd-info')!.textContent =
        `MCJDN = ${Math.round(jd - 2400000 + 0.5)} · هجري ${y}/${String(m).padStart(2,'0')}/${String(d).padStart(2,'0')}`;
    } catch {
      document.getElementById('h2jd-result')!.textContent = 'خارج النطاق';
      document.getElementById('h2jd-result')!.className = 'result-box is-invalid';
    }
  }

  [h2jdYear, h2jdDay].forEach(e => e.addEventListener('input', computeH2JD));
  h2jdMonth.addEventListener('change', computeH2JD);
  computeH2JD();

  // jdToHijri
  const jd2hInp = document.getElementById('jd2h-inp') as HTMLInputElement;

  function computeJD2H(): void {
    const jd = parseFloat(jd2hInp.value);
    if (!jd) return;
    try {
      const h = jdToHijri(jd);
      const monthName = HIJRI_MONTH_NAMES[h.month - 1];
      document.getElementById('jd2h-result')!.textContent =
        `${h.year}/${String(h.month).padStart(2,'0')}/${String(h.day).padStart(2,'0')} — ${h.day} ${monthName} ${h.year} هـ`;
      document.getElementById('jd2h-result')!.className = 'result-box is-valid';
      document.getElementById('jd2h-info')!.textContent = `JD = ${jd.toFixed(1)}`;
    } catch {
      document.getElementById('jd2h-result')!.textContent = 'خارج نطاق الجدول';
      document.getElementById('jd2h-result')!.className = 'result-box is-invalid';
    }
  }

  jd2hInp.addEventListener('input', computeJD2H);
  computeJD2H();

  document.querySelectorAll('.test-btn[data-jd]').forEach(btn => {
    btn.addEventListener('click', () => {
      jd2hInp.value = (btn as HTMLElement).dataset['jd'] || '';
      computeJD2H();
    });
  });
}
