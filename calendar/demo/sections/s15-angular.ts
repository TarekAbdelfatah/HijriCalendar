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
      <h2 class="sec-title">Angular Directive (14+)</h2>
      <p class="sec-desc">مكوّن Angular 14+ standalone — انسخه إلى مشروعك</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Download links -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">تحميل الملفات</span></div>
      <div class="card-body">
        <div style="display:flex; flex-wrap:wrap; gap:.625rem;">
          <a href="../angular/hijri-calendar.directive.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.directive.ts
          </a>
          <a href="../src/hijri-calendar.lib.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.ts
          </a>
          <a href="../src/hijri-calendar.css" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.css
          </a>
        </div>
      </div>
    </div>

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

    <!-- CSS setup -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">إعداد CSS</span></div>
      <div class="card-body">

        <div style="padding:.75rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; line-height:1.8; color:var(--txt2); margin-bottom:1rem;">
          <strong>🎨 الـ Directive يحقن CSS خاصه تلقائياً</strong><br>
          أنماط النافذة المنبثقة (الـ popup) والـ dropdown مُضمَّنة داخل الـ Directive ويتم حقنها في <code>&lt;head&gt;</code> عند أول تشغيل —
          <strong>لا تحتاج أي إعداد إضافي</strong> لاستخدام <code>hijri-calender</code> كـ directive.
        </div>

        <p style="font-size:.85rem; font-weight:600; color:var(--txt2); margin-bottom:.5rem;">
          متى تحتاج <code>hijri-calendar.css</code>؟
        </p>
        <p style="font-size:.84rem; color:var(--txt2); margin-bottom:.75rem; line-height:1.7;">
          فقط إذا استخدمت <code>createCalendarInput</code> مباشرةً في Angular (غير شائع).
          في هذه الحالة أضفه في <code>angular.json</code>:
        </p>

        ${codeBlock(`// angular.json  ←  في مقطع "styles" لمشروعك
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "src/app/hijri-calendar/hijri-calendar.css"
            ]
          }
        }
      }
    }
  }
}`, 'typescript', 'angular.json — إضافة CSS')}

        <p style="font-size:.84rem; color:var(--txt2); margin:.75rem 0 .5rem; font-weight:600;">أو في <code>src/styles.css</code>:</p>
        ${codeBlock(`/* src/styles.css */
@import './app/hijri-calendar/hijri-calendar.css';`, 'typescript', 'styles.css')}

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
      <div class="card-hdr"><span class="card-hdr-title">bindValue — سلوك الاستقبال والإرسال</span></div>
      <div class="card-body">

        <table class="api-table" style="margin-bottom:1rem;">
          <thead>
            <tr><th>bindValue</th><th>يُرسَل لـ ngModel / الباكاند</th><th>يُستقبَل من الباكاند</th><th>القائمة تبدأ بـ</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>'hijri'</code> <small>(افتراضي)</small></td>
              <td>هجري <code>"1446/09/15"</code></td>
              <td>قيمة هجرية → تُعرض في وضع <strong>هـ</strong></td>
              <td>هـ</td>
            </tr>
            <tr>
              <td><code>'gregorian'</code></td>
              <td>ميلادي <code>"2025/03/15"</code></td>
              <td>قيمة ميلادية → تُعرض في وضع <strong>م</strong></td>
              <td>م</td>
            </tr>
          </tbody>
        </table>

        <div style="padding:.75rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:8px; font-size:.84rem; line-height:1.75; color:var(--txt2);">
          <strong>القائمة (هـ / م) = طريقة العرض فقط</strong> — لا تُغيّر القيمة المُخزَّنة.<br>
          مثال: الحقل <code>[bindValue]="'gregorian'"</code> مع الباكاند يُرسل ويستقبل <strong>ميلادي دائماً</strong>، حتى لو اختار المستخدم عرض هجري من القائمة.
        </div>

        ${codeBlock(`// مثال: استقبال تاريخ ميلادي من الباكاند
export class VisitFormComponent {
  // الباكاند يُرسل "2025/03/15" → يُعرض في وضع م تلقائياً
  visitDate = '2025/03/15';

  // عند اختيار تاريخ جديد → ngModel يُخزَّن دائماً كميلادي
  // حتى لو اختار المستخدم عرض هجري من القائمة
}`, 'typescript', 'مثال bindValue gregorian')}

      </div>
    </div>

    <!-- dateChange Event -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">dateChange — حدث اختيار التاريخ</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          حدث <code>(dateChange)</code> يُرجع <strong>كائنين</strong>: التاريخ الهجري والميلادي معاً. مفيد عند الحاجة لكلا القيمتين.
        </p>
        ${codeBlock(`<!-- Template: bindValue + dateChange -->
<input type="text" readonly hijri-calender
       [bindValue]="'hijri'"
       [(ngModel)]="visitDate"
       (dateChange)="onDateSelected($event)"
       placeholder="اختر التاريخ" />

<!-- أو لجعل ngModel يستقبل الميلادي: -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       [(ngModel)]="gregDate"
       (dateChange)="onDateSelected($event)" />

<!-- $event = { hijri: {year,month,day,formatted}, greg: {...} } -->`, 'html', 'Template')}
        ${codeBlock(`// Component
import { HijriGregDate } from './hijri-calendar/hijri-calendar.directive';

export class MyComponent {
  visitDate = '';
  
  onDateSelected(event: HijriGregDate) {
    console.log('الهجري:', event.hijri.formatted);  // "1447/10/15"
    console.log('الميلادي:', event.greg.formatted);  // "2025/04/13"
    console.log('السنة الهجرية:', event.hijri.year);   // 1447
    console.log('الشهر الميلادي:', event.greg.month);  // 4
  }
}`, 'typescript', 'Component')}
      </div>
    </div>

    <!-- Full example with both values -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">مثال كامل: استخدام القيمتين</span></div>
      <div class="card-body">
        ${codeBlock(`import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective, HijriGregDate } from './hijri-calendar/hijri-calendar.directive';
import { getDayNameHijri } from './hijri-calendar/hijri-calendar.lib';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`
    <div class="booking-form">
      <h3>حجز موعد</h3>

      <label>اختر التاريخ:</label>
      <input type="text" readonly hijri-calender
             [(ngModel)]="hijriDate"
             [bindValue]="'hijri'"
             (dateChange)="onDateChange($event)"
             placeholder="انقر للاختيار" />

      @if (selectedDate) {
        <div class="date-info">
          <p>📅 التاريخ الهجري: <strong>{{ selectedDate.hijri.formatted }}</strong></p>
          <p>📆 التاريخ الميلادي: <strong>{{ selectedDate.greg.formatted }}</strong></p>
          <p>🏷️ اليوم: {{ dayName }}</p>
        </div>
      }
    </div>
  \`
})
export class BookingComponent {
  hijriDate = '';
  selectedDate: HijriGregDate | null = null;
  dayName = '';

  onDateChange(event: HijriGregDate) {
    this.selectedDate = event;
    this.dayName = getDayNameHijri(event.hijri.formatted);
  }
}`, 'typescript', 'مثال كامل')}
      </div>
    </div>

  </div>
</section>`;
}