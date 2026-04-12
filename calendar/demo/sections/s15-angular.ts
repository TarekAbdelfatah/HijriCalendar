import { codeBlock } from '../utils/code-block';

export function renderAngularSection(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-angular">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🅰️</div>
    <div class="sec-meta">
      <h2 class="sec-title">Angular Directive</h2>
      <p class="sec-desc">مكوّن Angular 14+ standalone — انسخه إلى مشروعك</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Files to copy -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الملفات المطلوبة</span></div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1rem;">
          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">المكتبة الأساسية — نفس الملف المستخدم في Vanilla</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.directive.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">الـ Directive — انسخه من مجلد angular/</div>
            </div>
          </div>
        </div>

        ${codeBlock(`src/app/hijri-calendar/
├── hijri-calendar.lib.ts        ← انسخ هذا
└── hijri-calendar.directive.ts ← انسخ هذا`, 'bash', 'هيكل الملفات')}
      </div>
    </div>

    <!-- Component import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستيراد في Component</span></div>
      <div class="card-body">
        ${codeBlock(`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calendar.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  visitDate = '';      // "1446/09/15"
  gregDate  = '';      // "2025/03/15"
}`, 'typescript', 'app.component.ts')}
      </div>
    </div>

    <!-- Template usage -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستخدام في الـ Template</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          أضف الـ directive على أي <code>&lt;input&gt;</code> مع <code>readonly</code> لمنع الكتابة اليدوية.
        </p>
        ${codeBlock(`<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input type="text" readonly hijri-calender
       [(ngModel)]="visitDate" name="visitDate"
       placeholder="انقر لاختيار التاريخ" />

<!-- bindValue='gregorian': ngModel يستقبل تاريخ ميلادي -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       [(ngModel)]="gregDate" name="gregDate" />`, 'html', 'app.component.html')}
      </div>
    </div>

    <!-- Full example -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال كامل مع Validation</span></div>
      <div class="card-body">
        ${codeBlock(`<form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
  <div class="field">
    <label>اسم المريض <span style="color:red">*</span></label>
    <input type="text" class="inp" name="patientName"
           [(ngModel)]="model.patientName" required />
  </div>

  <div class="field">
    <label>تاريخ الزيارة <span style="color:red">*</span></label>
    <input required type="text" readonly hijri-calender
           class="inp" name="visitDate"
           #visitDate="ngModel"
           [(ngModel)]="model.visitDate"
           placeholder="انقر لاختيار التاريخ" />
    @if (visitDate.invalid && visitDate.touched) {
      <span style="color:red; font-size:12px">هذا الحقل مطلوب</span>
    }
  </div>

  <button type="submit" [disabled]="f.invalid">حفظ</button>
</form>`, 'html', 'قالب مع validation')}
        ${codeBlock(`export class MyComponent {
  model = { patientName: '', visitDate: '' };

  onSubmit(f: NgForm) {
    console.log('التاريخ الهجري:', this.model.visitDate);  // "1446/09/15"
  }
}`, 'typescript', 'Component class')}
      </div>
    </div>

    <!-- bindValue explanation -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">bindValue — التحكم في صيغة القيمة</span></div>
      <div class="card-body">
        <table class="api-table">
          <thead>
            <tr><th>bindValue</th><th>ما يُخزَّن في ngModel</th><th>ما يعرضه التقويم</th></tr>
          </thead>
          <tbody>
            <tr><td><code>'hijri'</code> (افتراضي)</td><td><code>"1446/09/15"</code></td><td>التقويم الهجري</td></tr>
            <tr><td><code>'gregorian'</code></td><td><code>"2025/03/15"</code></td><td>التقويم الميلادي</td></tr>
          </tbody>
        </table>
        <p style="font-size:.85rem; color:var(--txt2); margin-top:1rem;">
          ملاحظة: القائمة المنسدلة (هـ / م) بجانب الحقل تتحكم في <strong>طريقة العرض</strong> فقط، وليس في القيمة المُخزَّنة.
        </p>
      </div>
    </div>

  </div>
</section>`;
}