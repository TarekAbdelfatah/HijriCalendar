/**
 * Code Block Builder — syntax-highlighted, copy-enabled.
 *
 * Each section shows only its own framework's code directly — no tabs.
 * If a CodeVersions object is passed, `activeVersion` picks which one to show
 * (defaults to 'vanilla'). Sections for Angular/Legacy pass their own code string directly.
 */

export type Framework = 'vanilla' | 'angular' | 'legacy';
type CodeVersions = Partial<Record<Framework, string>>;

/** Minimal syntax highlighter for TypeScript/JS/bash snippets */
function highlight(raw: string): string {
  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const fns = [
    'todayHijri','todayGregorian','hijriToGregorian','gregorianToHijri',
    'hijriToGregorianStr','gregorianToHijriStr','hijriIsValid',
    'hijriDaysInMonth','gregDaysInMonth','hijriDayOfWeek','gregDayOfWeek',
    'gregIsLeapYear','hijriToJD','jdToHijri','dayOfWeekForJD',
    'getDayNameHijri','createCalendarInput',
  ].join('|');

  const tokenSpecs = [
    { name: 'cmt', rex: /\/\/[^\n]*/ },
    { name: 'str', rex: /`[^`]*`|'[^'\n]*'|"[^"\n]*"/ },
    { name: 'kw',  rex: /\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in|readonly|private|public)\b/ },
    { name: 'fn',  rex: new RegExp(`\\b(${fns})\\b`) },
    { name: 'tp',  rex: /\b[A-Z][A-Za-z0-9]+\b/ },
    { name: 'num', rex: /\b\d+(?:\.\d+)?\b/ },
  ];

  const combinedRex = new RegExp(tokenSpecs.map(function(t) { return '(' + t.rex.source + ')'; }).join('|'), 'g');

  return s.replace(combinedRex, function(match) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < tokenSpecs.length; i++) {
      if (args[i] !== undefined) {
        return '<span class="' + tokenSpecs[i].name + '">' + match + '</span>';
      }
    }
    return match;
  });
}

/**
 * Renders a clean code block with copy button — no framework tabs.
 *
 * @param codes  A code string, OR a CodeVersions object (only `vanilla` is used).
 * @param lang   Language hint (for title display only).
 * @param title  Optional label shown in the top bar.
 */
export function codeBlock(
  codes: CodeVersions | string,
  lang: string = 'typescript',
  title?: string
): string {
  const code: string = typeof codes === 'string'
    ? codes
    : (codes.vanilla || codes.angular || codes.legacy || '');

  const label = title || '';

  return '<div class="code-wrap">' +
    '<div class="code-top">' +
      (label ? '<span class="code-title-top">' + label + '</span>' : '<span></span>') +
      '<button class="code-copy-btn" onclick="ccCopy(this)">Copy</button>' +
    '</div>' +
    '<pre class="code-pre">' + highlight(code.trim()) + '</pre>' +
  '</div>';
}

declare global {
  interface Window {
    ccCopy: (btn: HTMLButtonElement) => void;
  }
}

window.ccCopy = function(btn: HTMLButtonElement): void {
  const wrap = btn.closest('.code-wrap') as HTMLElement | null;
  const pre = wrap ? wrap.querySelector('.code-pre') : null;
  const text = pre ? (pre.textContent || '') : '';
  navigator.clipboard.writeText(text).then(function() {
    const orig = btn.textContent || '';
    btn.textContent = 'Done';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(function() {});
};

/** No-op: kept for backward compat — tab system has been removed */
export function initCodeFramework(): void {}
