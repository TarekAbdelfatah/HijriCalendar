import { hijriIsValid, hijriDaysInMonth, HIJRI_MONTH_NAMES } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderValidation(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
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
                ${HIJRI_MONTH_NAMES.map((n,i) =>
                  `<option value="${i+1}" ${i===0?'selected':''}>${i+1} — ${n}</option>`
                ).join('')}
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

        ${codeBlock({
  vanilla: `import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

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
const days = hijriDaysInMonth(1447, 9); // 29 (رمضان 1447)`,
  angular: `import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

const isValid = hijriIsValid(1447, 1, 1);    // true
const days = hijriDaysInMonth(1447, 9);     // 29`,
  legacy: `import { hijriIsValid, hijriDaysInMonth } from './hijri-calendar.lib';

const isValid = hijriIsValid(1447, 1, 1);    // true
const days = hijriDaysInMonth(1447, 9);      // 29`
}, 'typescript', 'hijriIsValid()')}
      </div>
    </div>

    <!-- Validation rules info -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">قواعد التحقق</span></div>
      <div class="card-body">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:.875rem;">
          ${rule('✅', 'نطاق السنة', '1276 هـ ← 1500 هـ', 'الجدول الرسمي لأم القرى')}
          ${rule('✅', 'نطاق الشهر', '1 ← 12', 'لا يقبل الشهر 0 أو 13')}
          ${rule('✅', 'نطاق اليوم', '1 ← max', 'الحد الأقصى حسب بيانات الشهر الفعلية')}
          ${rule('✅', 'دقة الشهر', 'من 29 إلى 30 يوم', 'بناءً على جدول أم القرى الحقيقي')}
        </div>
      </div>
    </div>

  </div>
</section>`;

  // Init
  const yEl = document.getElementById('val-year') as HTMLInputElement;
  const mEl = document.getElementById('val-month') as HTMLSelectElement;
  const dEl = document.getElementById('val-day') as HTMLInputElement;
  const resEl = document.getElementById('val-result')!;
  const maxEl = document.getElementById('val-max-days')!;
  const reasonEl = document.getElementById('val-reason')!;

  function compute(): void {
    const y = parseInt(yEl.value), m = parseInt(mEl.value), d = parseInt(dEl.value);
    if (!y || !m || !d) return;

    const valid = hijriIsValid(y, m, d);
    resEl.textContent = valid ? `✓ صحيح — hijriIsValid(${y}, ${m}, ${d}) = true` : `✗ غير صحيح — hijriIsValid(${y}, ${m}, ${d}) = false`;
    resEl.className = 'result-box ' + (valid ? 'is-valid' : 'is-invalid');

    // Max days for this month/year
    try {
      if (y >= 1276 && y <= 1500 && m >= 1 && m <= 12) {
        const max = hijriDaysInMonth(y, m);
        maxEl.textContent = `الشهر ${HIJRI_MONTH_NAMES[m-1]} ${y} هـ = ${max} يوم`;
        reasonEl.textContent = !valid
          ? d < 1 ? 'السبب: اليوم لا يمكن أن يكون أقل من 1'
          : d > max ? `السبب: هذا الشهر يحتوي ${max} يوماً فقط`
          : y < 1276 ? 'السبب: السنة أصغر من نطاق الجدول (1276 هـ)'
          : y > 1500 ? 'السبب: السنة أكبر من نطاق الجدول (1500 هـ)'
          : m < 1 || m > 12 ? 'السبب: رقم الشهر خارج النطاق (1-12)'
          : ''
          : '';
      } else {
        maxEl.textContent = '';
        reasonEl.textContent = y < 1276 ? 'السبب: السنة أصغر من نطاق الجدول (بداية: 1276 هـ)'
          : y > 1500 ? 'السبب: السنة أكبر من نطاق الجدول (نهاية: 1500 هـ)'
          : m < 1 || m > 12 ? 'السبب: رقم الشهر خارج النطاق (1-12)' : '';
      }
    } catch {
      maxEl.textContent = '';
      reasonEl.textContent = '';
    }
  }

  [yEl, dEl].forEach(el => el?.addEventListener('input', compute));
  mEl?.addEventListener('change', compute);
  compute();

  // Quick tests
  document.querySelectorAll('.sec-body .test-btn[data-y]').forEach(btn => {
    btn.addEventListener('click', () => {
      const b = btn as HTMLElement;
      yEl.value = b.dataset['y'] || '1447';
      mEl.value = b.dataset['m'] || '1';
      dEl.value = b.dataset['d'] || '1';
      compute();
    });
  });
}

function rule(icon: string, title: string, range: string, desc: string): string {
  return `<div style="display:flex; gap:.5rem; align-items:flex-start;">
    <span style="font-size:1.1rem; margin-top:.1rem;">${icon}</span>
    <div>
      <div style="font-size:.85rem; font-weight:600; color:var(--txt); margin-bottom:.2rem;">${title}</div>
      <div style="font-family:'Fira Code',monospace; font-size:.78rem; color:var(--accent); margin-bottom:.2rem;">${range}</div>
      <div style="font-size:.78rem; color:var(--txt3);">${desc}</div>
    </div>
  </div>`;
}
