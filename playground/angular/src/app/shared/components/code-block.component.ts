import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-wrap">
      <div class="code-top">
        <span class="code-lang-tag">{{ title || lang }}</span>
        <button class="code-copy-btn" (click)="copy()" [class.copied]="isCopied">
          {{ isCopied ? '✓ تم' : 'نسخ' }}
        </button>
      </div>
      <pre class="code-pre" [innerHTML]="highlightedCode"></pre>
    </div>
  `,
  styles: [`
    .code-wrap {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 12px;
      margin: 1.5rem 0;
      overflow: hidden;
      direction: ltr; /* Code always LTR */
    }
    .code-top {
      background: #161b22;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #30363d;
    }
    .code-lang-tag {
      color: #7d8590;
      font-size: 0.75rem;
      font-family: 'Fira Code', monospace;
      text-transform: uppercase;
    }
    .code-copy-btn {
      background: transparent;
      border: 1px solid #30363d;
      color: #8b949e;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .code-copy-btn:hover {
      background: #21262d;
      color: #c9d1d9;
    }
    .code-copy-btn.copied {
      color: #3fb950;
      border-color: #3fb950;
    }
    .code-pre {
      padding: 16px;
      margin: 0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.88rem;
      line-height: 1.6;
      overflow-x: auto;
      color: #c9d1d9;
      text-align: left;
    }
    ::ng-deep .cmt { color: #8b949e; font-style: italic; }
    ::ng-deep .str { color: #a5d6ff; }
    ::ng-deep .kw  { color: #ff7b72; font-weight: 600; }
    ::ng-deep .fn  { color: #d2a8ff; }
    ::ng-deep .num { color: #79c0ff; }
    ::ng-deep .tp  { color: #ffa657; }
  `]
})
export class CodeBlockComponent implements OnInit {
  @Input() code = '';
  @Input() lang = 'typescript';
  @Input() title = '';

  highlightedCode = '';
  isCopied = false;

  ngOnInit() {
    this.highlightedCode = this.highlight(this.code.trim());
  }

  copy() {
    navigator.clipboard.writeText(this.code.trim()).then(() => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 2000);
    });
  }

  private highlight(raw: string): string {
    let s = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const fns = [
      'todayHijri','todayGregorian','hijriToGregorian','gregorianToHijri',
      'hijriToGregorianStr','gregorianToHijriStr','hijriIsValid','hijriDaysInMonth',
    ].join('|');

    const tokenSpecs = [
      { name: 'cmt', rex: /\/\/[^\n]*/ },
      { name: 'str', rex: /`[^`]*`|'[^'\n]*'|"[^"\n]*"/ },
      { name: 'kw',  rex: /\b(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|new|type|interface|class|extends|async|await|for|of|in|@Component|@Directive|@NgModule|@Injectable|@Input|@Output)\b/ },
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
}
