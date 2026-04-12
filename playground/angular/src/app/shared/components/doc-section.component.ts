import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="doc-section" [id]="id">
      <hr class="sec-divider">
      <div class="sec-head">
        <div class="sec-ico" *ngIf="icon">{{ icon }}</div>
        <div class="sec-meta">
          <h2 class="sec-title">{{ title }}</h2>
          <p class="sec-desc" *ngIf="description">{{ description }}</p>
        </div>
      </div>
      <div class="sec-body">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: [`
    .doc-section { padding: 2.5rem 0 0.5rem; }
    .sec-divider {
      border: 0;
      height: 1px;
      background: linear-gradient(to left, var(--bdr-light) 0%, var(--bdr) 50%, var(--bdr-light) 100%);
      margin-bottom: 3.5rem;
      opacity: 0.6;
    }
    .sec-head {
      display: flex;
      align-items: flex-start;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }
    .sec-ico {
      width: 48px;
      height: 48px;
      background: var(--surf2);
      border: 1px solid var(--bdr);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .sec-meta { flex: 1; }
    .sec-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--txt);
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .sec-desc {
      font-size: 1.05rem;
      color: var(--txt2);
      line-height: 1.6;
    }
    .sec-body { padding-inline-start: 4.15rem; }
    @media (max-width: 768px) {
      .sec-body { padding-inline-start: 0; }
    }
  `]
})
export class DocSectionComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
}
