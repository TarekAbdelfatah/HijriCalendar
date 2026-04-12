/**
 * Code Block Builder - syntax-highlighted, copy-enabled, framework-switchable
 * Direction is always LTR for code content
 */

export type Framework = 'vanilla' | 'angular' | 'legacy';
type CodeVersions = Partial<Record<Framework, string>>;

/** Minimal syntax highlighter for TypeScript/JS snippets */
function highlight(raw: string): string {
  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const fns = [
    'todayHijri','todayGregorian','hijriToGregorian','gregorianToHijri',
    'hijriToGregorianStr','gregorianToHijriStr','hijriIsValid',
    'hijriDaysInMonth','gregDaysInMonth','hijriDayOfWeek','gregDayOfWeek',
    'gregIsLeapYear','hijriToJD','jdToHijri','dayOfWeekForJD','pad2',
  ].join('|');

  const tokenSpecs = [
    { name: 'cmt', rex: /\/\/[^\n]*/ },
    { name: 'str', rex: /`[^`]*`|'[^'\n]*'|"[^"\n]*"/ },
    { name: 'kw',  rex: /\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in)\b/ },
    { name: 'fn',  rex: new RegExp(`\\b(${fns})\\b`) },
    { name: 'tp',  rex: /\b[A-Z][A-Za-z0-9]+\b/ },
    { name: 'num', rex: /\b\d+(?:\.\d+)?\b/ },
  ];

  const combinedRex = new RegExp(tokenSpecs.map(t => `(${t.rex.source})`).join('|'), 'g');

  return s.replace(combinedRex, (match, ...args) => {
    for (let i = 0; i < tokenSpecs.length; i++) {
      if (args[i] !== undefined) {
        return `<span class="${tokenSpecs[i].name}">${match}</span>`;
      }
    }
    return match;
  });
}

function getActiveFramework(): Framework {
  const saved = localStorage.getItem('cc-code-framework') as Framework;
  return saved || 'vanilla';
}

export function switchAllCodeBlocks(framework: Framework): void {
  localStorage.setItem('cc-code-framework', framework);
  document.querySelectorAll('.code-fw-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-fw') === framework);
  });
  document.querySelectorAll('.code-fw-content').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-fw') === framework);
  });
}

export function codeBlock(
  codes: CodeVersions | string,
  lang: string = 'typescript',
  title?: string
): string {
  if (typeof codes === 'string') {
    codes = { vanilla: codes };
  }

  const frameworks: Framework[] = ['vanilla', 'angular', 'legacy'];
  const icons: Record<Framework, string> = { vanilla: 'V', angular: 'A', legacy: 'L' };
  const labels: Record<Framework, string> = { vanilla: 'Vanilla', angular: 'Angular', legacy: 'Legacy' };

  const active = getActiveFramework();

  const tabsHtml = frameworks.map(fw => {
    const isActive = fw === active ? 'active' : '';
    return `<button class="code-fw-tab ${isActive}" data-fw="${fw}" onclick="ccSwitchFramework('${fw}')">${icons[fw]} ${labels[fw]}</button>`;
  }).join('');

  const contentsHtml = frameworks.map(fw => {
    const code = codes[fw] || codes.vanilla || '';
    const isActive = fw === active ? 'active' : '';
    return `<pre class="code-pre code-fw-content ${isActive}" data-fw="${fw}">${highlight(code.trim())}</pre>`;
  }).join('');

  const label = title || lang;

  return `<div class="code-wrap">
  <div class="code-top">
    <div class="code-fw-tabs">${tabsHtml}</div>
    <button class="code-copy-btn" onclick="ccCopy(this)">Copy</button>
  </div>
  <div class="code-versions">${contentsHtml}</div>
  ${label && label !== lang ? `<div class="code-title">${label}</div>` : ''}
</div>`;
}

export function codeBlockSingle(code: string, lang = 'typescript', title?: string): string {
  return codeBlock({ vanilla: code }, lang, title);
}

declare global { 
  interface Window { 
    ccCopy: (btn: HTMLButtonElement) => void;
    ccSwitchFramework: (fw: Framework) => void;
  }
}

window.ccCopy = (btn: HTMLButtonElement): void => {
  const active = localStorage.getItem('cc-code-framework') || 'vanilla';
  const pre = btn.closest('.code-wrap')?.querySelector(`.code-pre[data-fw="${active}"]`);
  const text = pre?.textContent ?? '';
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent!;
    btn.textContent = 'Done';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {});
};

window.ccSwitchFramework = (fw: Framework): void => {
  switchAllCodeBlocks(fw);
};

export function initCodeFramework(): void {
  const active = getActiveFramework();
  document.querySelectorAll('.code-fw-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-fw') === active);
  });
  document.querySelectorAll('.code-fw-content').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-fw') === active);
  });
}