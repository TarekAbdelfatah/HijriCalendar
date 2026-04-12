import { hijriToGregorianStr, gregorianToHijriStr } from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

export function renderStringConversion(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
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

        ${codeBlock(`import { hijriToGregorianStr } from '@core-components/calendar';

// تقبل صيغ متعددة
hijriToGregorianStr('1447/10/14');  // "2026/04/12"
hijriToGregorianStr('14/10/1447');  // "2026/04/12"
hijriToGregorianStr('1447-10-14'); // "2026/04/12"

// تاريخ غير صالح
hijriToGregorianStr('1600/01/01'); // "Invalid date"`, 'typescript', 'hijriToGregorianStr()')}
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

        ${codeBlock(`import { gregorianToHijriStr } from '@core-components/calendar';

gregorianToHijriStr('2026/04/12');  // "1447/10/14"
gregorianToHijriStr('12/04/2026');  // "1447/10/14"
gregorianToHijriStr('2026-04-12'); // "1447/10/14"

// خارج النطاق
gregorianToHijriStr('1800/01/01'); // "Invalid date"`, 'typescript', 'gregorianToHijriStr()')}
      </div>
    </div>

  </div>
</section>`;

  // Init h2g string
  const h2gInput = document.getElementById('str-h2g-input') as HTMLInputElement;
  const h2gResult = document.getElementById('str-h2g-result')!;

  function computeH2G(): void {
    const val = h2gInput.value.trim();
    if (!val) return;
    const res = hijriToGregorianStr(val);
    h2gResult.textContent = res;
    h2gResult.className = 'result-box ' + (res === 'Invalid date' ? 'is-invalid' : 'is-valid');
  }
  h2gInput.addEventListener('input', computeH2G);
  computeH2G();

  // Quick tests for h2g
  h2gInput.closest('.card-body')
    ?.querySelectorAll('.test-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        h2gInput.value = (btn as HTMLElement).dataset['val'] || '';
        computeH2G();
      });
    });

  // Init g2h string
  const g2hInput = document.getElementById('str-g2h-input') as HTMLInputElement;
  const g2hResult = document.getElementById('str-g2h-result')!;

  function computeG2H(): void {
    const val = g2hInput.value.trim();
    if (!val) return;
    const res = gregorianToHijriStr(val);
    g2hResult.textContent = res;
    g2hResult.className = 'result-box ' + (res === 'Invalid date' ? 'is-invalid' : 'is-valid');
  }
  g2hInput.addEventListener('input', computeG2H);
  computeG2H();

  g2hInput.closest('.card-body')
    ?.querySelectorAll('.test-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        g2hInput.value = (btn as HTMLElement).dataset['val'] || '';
        computeG2H();
      });
    });
}
