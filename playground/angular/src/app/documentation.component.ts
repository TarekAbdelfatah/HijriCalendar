import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocSectionComponent } from './shared/components/doc-section.component';
import { CodeBlockComponent } from './shared/components/code-block.component';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';
import {
  todayHijri, todayGregorian,
  gregorianToHijri, hijriToGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_AR
} from '@core-components/calendar';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, FormsModule, DocSectionComponent, CodeBlockComponent, HijriCalenderDirective],
  template: `
    <div class="doc-layout" dir="rtl">
      <!-- Sidebar -->
      <aside class="doc-sidebar">
        <div class="sb-group">
          <span class="sb-group-lbl">البدء</span>
          <a class="sb-link" href="#sec-hero" [class.active]="activeSection === 'hero'">🚀 المقدمة</a>
          <a class="sb-link" href="#sec-start" [class.active]="activeSection === 'start'">📂 التثبيت والإعداد</a>
        </div>
        <div class="sb-group">
          <span class="sb-group-lbl">الـ Directive</span>
          <a class="sb-link" href="#sec-usage" [class.active]="activeSection === 'usage'">📋 الاستخدام الأساسي</a>
          <a class="sb-link" href="#sec-bind" [class.active]="activeSection === 'bind'">🔗 ربط القيم (bindValue)</a>
          <a class="sb-link" href="#sec-forms" [class.active]="activeSection === 'forms'">フォーム التكامل مع النماذج</a>
        </div>
        <div class="sb-group">
          <span class="sb-group-lbl">المرجع</span>
          <a class="sb-link" href="#sec-api" [class.active]="activeSection === 'api'">📚 مكتبة الـ API</a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="doc-main">
        <div class="doc-content">

          <!-- ── SECTION: HERO ── -->
          <app-doc-section id="hero" title="التقويم الهجري لـ Angular" icon="🅰️"
            description="مكتبة متكاملة توفر Directive و Service للتعامل مع التقويم الهجري (أم القرى) والميلادي بدقة 100% وبدون أي اعتماديات خارجية.">

            <div class="hero-stats" style="display: flex; gap: 2rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--bdr);">
              <div><span style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">0</span><br><span style="font-size: 0.75rem; color: var(--txt3);">Dependencies</span></div>
              <div><span style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">Standalone</span><br><span style="font-size: 0.75rem; color: var(--txt3);">Angular 14+</span></div>
              <div><span style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">Legacy</span><br><span style="font-size: 0.75rem; color: var(--txt3);">Angular 7-13</span></div>
            </div>

            <app-code-block [code]="heroCode" lang="typescript" title="مثال سريع"></app-code-block>
          </app-doc-section>

          <!-- ── SECTION: GETTING STARTED ── -->
          <app-doc-section id="start" title="التثبيت والإعداد" icon="📂"
            description="المكتبة مصممة لتكون خفيفة جداً. فقط انسخ ملفين وابدأ الاستخدام فوراً.">

            <div class="card">
              <div class="card-hdr">الخطوة 1: نسخ الملفات</div>
              <div class="card-body">
                <p>انسخ المجلد <code>hijri-calendar</code> إلى مشروعك داخل مجدد الـ <code>app</code>:</p>
                <app-code-block [code]="structureCode" lang="bash" title="هيكل الملفات"></app-code-block>
              </div>
            </div>

            <div class="card">
              <div class="card-hdr">الخطوة 2: الاستيراد</div>
              <div class="card-body">
                <p>في المكوّن (Component) الخاص بك، استورد الـ <code>HijriCalenderDirective</code> وأضفه إلى مصفوفة الـ <code>imports</code>:</p>
                <app-code-block [code]="importCode" lang="typescript" title="app.component.ts"></app-code-block>
              </div>
            </div>
          </app-doc-section>

          <!-- ── SECTION: BASIC USAGE ── -->
          <app-doc-section id="usage" title="الاستخدام الأساسي" icon="📋"
            description="أضف الدايركتيف على أي حقل إدخال لتحويله إلى منتقي تاريخ هجري متطور.">

            <div class="card">
              <div class="card-hdr">المثال الحي</div>
              <div class="card-body">
                <div class="field">
                  <label>اختر التاريخ الهجري:</label>
                  <input type="text" readonly hijri-calender class="inp" [(ngModel)]="basicDate" placeholder="انقر هنا...">
                </div>
                <div style="margin-top: 10px; font-weight: 700; color: var(--primary);">
                  القيمة في ngModel: {{ basicDate || '—' }}
                </div>
              </div>
            </div>

            <app-code-block [code]="basicUsageHtml" lang="html" title="HTML Template"></app-code-block>
          </app-doc-section>

          <!-- ── SECTION: BIND VALUE ── -->
          <app-doc-section id="bind" title="ربط القيم (bindValue)" icon="🔗"
            description="تحكم في صيغة التاريخ التي يتم حفظها في النموذج (هجري أم ميلادي).">

            <div class="card">
              <div class="card-body">
                <div class="demo-2col" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                  <div class="field">
                    <label>تخزين هجري (Default):</label>
                    <input type="text" readonly hijri-calender class="inp" [(ngModel)]="dateH" [bindValue]="'hijri'">
                    <div class="hint">القيمة: {{ dateH }}</div>
                  </div>
                  <div class="field">
                    <label>تخزين ميلادي:</label>
                    <input type="text" readonly hijri-calender class="inp" [(ngModel)]="dateG" [bindValue]="'gregorian'">
                    <div class="hint">القيمة: {{ dateG }}</div>
                  </div>
                </div>
              </div>
            </div>

            <app-code-block [code]="bindValueCode" lang="html" title="التحكم في التخزين"></app-code-block>
          </app-doc-section>

          <!-- ── SECTION: FORMS ── -->
          <app-doc-section id="forms" title="التكامل مع النماذج والتحقق" icon="フォーム"
            description="يدعم الدايركتيف التفاعل الكامل مع نماذج Angular (Template-driven & Reactive).">

            <div class="card">
              <div class="card-hdr">نموذج كامل مع Validation</div>
              <div class="card-body">
                <form #form="ngForm" (submit)="onFormSubmit(form)">
                  <div class="field">
                    <label>الاسم الكامل:</label>
                    <input type="text" name="name" class="inp" ngModel required>
                  </div>
                  <div class="field">
                    <label>تاريخ البدء:</label>
                    <input type="text" readonly hijri-calender name="startDate" class="inp" ngModel required #startDate="ngModel">
                    <div class="err" *ngIf="startDate.invalid && startDate.touched">تاريخ البدء مطلوب</div>
                  </div>
                  <button type="submit" class="btn-p" [disabled]="form.invalid" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 10px;">حفظ البيانات</button>
                </form>
              </div>
            </div>

            <app-code-block [code]="formValidationCode" lang="html" title="Template-driven Form"></app-code-block>
          </app-doc-section>

          <!-- ── SECTION: API ── -->
          <app-doc-section id="api" title="مكتبة الـ API" icon="📚"
            description="يمكنك استخدام دوال المكتبة الأساسية مباشرة في الـ Component للقيام بالتحويلات البرمجية.">

            <app-code-block [code]="apiUsageCode" lang="typescript" title="الاستخدام البرمجي"></app-code-block>

            <div class="api-tbl-wrap" style="border: 1px solid var(--bdr); border-radius: 8px; overflow: hidden; margin-top: 1.5rem;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                <thead style="background: var(--surf2);">
                  <tr>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid var(--bdr);">الدالة</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid var(--bdr);">الوصف</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="padding: 10px; border-bottom: 1px solid var(--bdr);"><code>todayHijri()</code></td><td style="padding: 10px; border-bottom: 1px solid var(--bdr);">ترجع التاريخ الهجري الحالي ككائن.</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid var(--bdr);"><code>gregorianToHijri(y,m,d)</code></td><td style="padding: 10px; border-bottom: 1px solid var(--bdr);">تحويل من ميلادي إلى هجري.</td></tr>
                  <tr><td style="padding: 10px; border-bottom: 1px solid var(--bdr);"><code>hijriToGregorian(y,m,d)</code></td><td style="padding: 10px; border-bottom: 1px solid var(--bdr);">تحويل من هجري إلى ميلادي.</td></tr>
                </tbody>
              </table>
            </div>
          </app-doc-section>

        </div>
      </main>
    </div>
  `,
  styles: [`
    .field { margin-bottom: 1rem; }
    .field label { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--txt2); }
    .inp { width: 100%; padding: 10px 14px; border: 1px solid var(--bdr); border-radius: 8px; background: var(--surf); color: var(--txt); outline: none; transition: border-color 0.2s; }
    .inp:focus { border-color: var(--primary); }
    .hint { font-size: 0.75rem; color: var(--primary); margin-top: 5px; font-weight: 700; }
    .err { font-size: 0.75rem; color: #dc2626; margin-top: 5px; }
  `]
})
export class DocumentationComponent {
  activeSection = 'hero';
  basicDate = '1447/10/14';
  dateH = '1447/10/14';
  dateG = '2026/04/12';

  onFormSubmit(f: any) {
    alert('تم الحفظ بنجاح: ' + JSON.stringify(f.value));
  }

  // Code snippets
  heroCode = `import { Component } from '@angular/core';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HijriCalenderDirective], // استيراد الدايركتيف مباشرة
  template: \`<input id="date" hijri-calender [(ngModel)]="visitDate">\`
})
export class AppComponent {
  visitDate = '1447/10/14';
}`;

  structureCode = `src/app/hijri-calendar/
├── hijri-calendar.lib.ts     # منطق التقويم والتحويل
└── hijri-calender.directive.ts # الدايركتيف لـ Angular`;

  importCode = `import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';

@Component({
  imports: [
    FormsModule,
    HijriCalenderDirective // للـ Angular 14+
  ]
})`;

  basicUsageHtml = `<!-- أضف hijri-calender على حقل الإدخال -->
<input
  type="text"
  readonly
  hijri-calender
  [(ngModel)]="myDate"
  placeholder="اختر تاريخ هجري"
/>`;

  bindValueCode = `<!-- ربط هجري (الافتراضي: 1447/10/14) -->
<input readonly hijri-calender [(ngModel)]="dateH" [bindValue]="'hijri'">

<!-- ربط ميلادي (المتغير dateG سيحمل: 2026/04/12) -->
<input readonly hijri-calender [(ngModel)]="dateG" [bindValue]="'gregorian'">`;

  formValidationCode = `<form #f="ngForm" (submit)="save()">
  <input
    required
    hijri-calender
    name="date"
    #dateModel="ngModel"
    [(ngModel)]="selectedDate"
  />

  <div *ngIf="dateModel.invalid && dateModel.touched">
    التاريخ مطلوب
  </div>

  <button [disabled]="f.invalid">حفظ</button>
</form>`;

  apiUsageCode = `import { gregorianToHijri, todayHijri } from '@core-components/calendar';

// الحصول على تاريخ اليوم
const today = todayHijri();
console.log(today.formatted); // "1447/10/14"

// تحويل مبلغ
const result = gregorianToHijri(2026, 4, 12);
console.log(result.formatted); // "1447/10/14"`;
}
