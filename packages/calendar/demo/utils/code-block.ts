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

  // Known lib functions
  const fns = [
    'todayHijri','todayGregorian','hijriToGregorian','gregorianToHijri',
    'hijriToGregorianStr','gregorianToHijriStr','hijriIsValid',
    'hijriDaysInMonth','gregDaysInMonth','hijriDayOfWeek','gregDayOfWeek',
    'gregIsLeapYear','hijriToJD','jdToHijri','dayOfWeekForJD','pad2',
  ].join('|');

  // Define tokens with their regexes in a single array
  // We use this to build a combined regex so tokens are processed in a single pass.
  const tokenSpecs = [
    { name: 'cmt', rex: /\/\/[^\n]*/ },
    { name: 'str', rex: /`[^`]*`|'[^'\n]*'|"[^"\n]*"/ },
    { name: 'kw',  rex: /\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in)\b/ },
    { name: 'fn',  rex: new RegExp(`\\b(${fns})\\b`) },
    { name: 'tp',  rex: /\b[A-Z][A-Za-z0-9]+\b/ },
    { name: 'num', rex: /\b\d+(?:\.\d+)?\b/ },
  ];

  // Build the combined regex: (rex1)|(rex2)|...
  const combinedRex = new RegExp(tokenSpecs.map(t => `(${t.rex.source})`).join('|'), 'g');

  // Replace tokens with span-wrapped versions
  return s.replace(combinedRex, (match, ...args) => {
    // args contains the captured groups. The first index that is not undefined (up to tokenSpecs.length)
    // tells us which token pattern matched.
    for (let i = 0; i < tokenSpecs.length; i++) {
      if (args[i] !== undefined) {
        return `<span class="${tokenSpecs[i].name}">${match}</span>`;
      }
    }
    return match;
  });
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
