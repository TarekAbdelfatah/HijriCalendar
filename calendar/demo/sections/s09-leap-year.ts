import { gregIsLeapYear, gregDaysInMonth } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderLeapYear(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
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

        ${codeBlock(`import { gregIsLeapYear, gregDaysInMonth } from '@core-components/calendar';

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
gregDaysInMonth(2025, 2); // 28`, 'typescript', 'gregIsLeapYear()')}

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
</section>`;

  const inp = document.getElementById('leap-year-inp') as HTMLInputElement;
  const resEl = document.getElementById('leap-result')!;
  const expEl = document.getElementById('leap-explain')!;
  const febEl = document.getElementById('leap-feb-days')!;

  function compute(): void {
    const y = parseInt(inp.value);
    if (!y) return;
    const isLeap = gregIsLeapYear(y);
    const febDays = gregDaysInMonth(y, 2);

    resEl.textContent = isLeap ? `✓ ${y} — سنة كبيسة` : `✗ ${y} — ليست كبيسة`;
    resEl.className = 'result-box ' + (isLeap ? 'is-valid' : 'is-invalid');
    febEl.textContent = String(febDays);

    if (isLeap) {
      if (y % 400 === 0) expEl.textContent = `قابلة للقسمة على 400 ← كبيسة`;
      else if (y % 100 === 0) expEl.textContent = `قابلة على 100 لكن ليس 400 ← ليست كبيسة (لكنها قابلة على 4 فهي كبيسة)`;
      else expEl.textContent = `قابلة للقسمة على 4 وليس 100 ← كبيسة`;
    } else {
      if (y % 100 === 0) expEl.textContent = `قابلة على 100 لكن ليس 400 ← ليست كبيسة`;
      else expEl.textContent = `غير قابلة للقسمة على 4 ← ليست كبيسة`;
    }
  }

  inp.addEventListener('input', compute);
  compute();

  document.querySelectorAll('.test-btn[data-year]').forEach(btn => {
    btn.addEventListener('click', () => {
      inp.value = (btn as HTMLElement).dataset['year'] || '2024';
      compute();
    });
  });
}
