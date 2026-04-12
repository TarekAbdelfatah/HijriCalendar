/**
 * Code Block Builder — syntax-highlighted, copy-enabled
 * Direction is always LTR for code content
 */

/** Minimal syntax highlighter for TypeScript/JS snippets */
function highlight(raw: string): string {
  // Escape HTML first
  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Order matters — apply from most specific to least
  // 1. Comments (single-line)
  s = s.replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>');
  // 2. Strings (single + double + template — simple, non-nested)
  s = s.replace(/(`[^`]*`|'[^'\n]*'|"[^"\n]*")/g, '<span class="str">$1</span>');
  // 3. Keywords
  s = s.replace(/\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in)\b/g, '<span class="kw">$1</span>');
  // 4. Numbers
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');
  // 5. Types (PascalCase identifiers)
  s = s.replace(/\b([A-Z][A-Za-z0-9]+)\b/g, '<span class="tp">$1</span>');
  // 6. Known lib functions
  const fns = [
    'todayHijri','todayGregorian','hijriToGregorian','gregorianToHijri',
    'hijriToGregorianStr','gregorianToHijriStr','hijriIsValid',
    'hijriDaysInMonth','gregDaysInMonth','hijriDayOfWeek','gregDayOfWeek',
    'gregIsLeapYear','hijriToJD','jdToHijri','dayOfWeekForJD','pad2',
  ].join('|');
  s = s.replace(new RegExp(`\\b(${fns})\\b`, 'g'), '<span class="fn">$1</span>');

  return s;
}

/** Build a single code block */
export function codeBlock(code: string, lang = 'typescript', title?: string): string {
  const label = title || lang;
  return `
<div class="code-wrap">
  <div class="code-top">
    <span class="code-lang-tag">${label}</span>
    <button class="code-copy-btn" onclick="ccCopy(this)">نسخ</button>
  </div>
  <pre class="code-pre">${highlight(code.trim())}</pre>
</div>`;
}

/** Expose global copy helper — called from onclick in rendered HTML */
declare global { interface Window { ccCopy: (btn: HTMLButtonElement) => void; } }

window.ccCopy = (btn: HTMLButtonElement): void => {
  const pre = btn.closest('.code-wrap')?.querySelector('.code-pre');
  const text = pre?.textContent ?? '';
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent!;
    btn.textContent = '✓ تم';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    /* clipboard blocked — silent fail */
  });
};
