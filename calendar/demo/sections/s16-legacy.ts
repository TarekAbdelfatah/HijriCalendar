import { codeBlock } from '../utils/code-block';

export function renderLegacySection(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-legacy">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🔶</div>
    <div class="sec-meta">
      <h2 class="sec-title">Legacy Angular (7–13)</h2>
      <p class="sec-desc">متوافق مع Angular 7 إلى 13 — يستخدم NgModule</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Download links -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">تحميل الملفات</span></div>
      <div class="card-body">
        <div style="display:flex; flex-wrap:wrap; gap:.625rem;">
          <a href="../../legacy/hijri-calender-ng7.directive.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calender-ng7.directive.ts
          </a>
          <a href="../../src/hijri-calendar.lib.ts" download
             style="display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; background:var(--accent-bg); border:1px solid var(--accent-bdr); border-radius:8px; font-size:.82rem; font-weight:700; color:var(--accent); text-decoration:none;">
            ⬇ hijri-calendar.lib.ts
          </a>
          <a href="../../src/hijri-calendar.css" download
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
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calender-ng7.directive.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">الـ Directive المخصص للنسخ القديمة — من مجلد legacy/ — <strong>ليس نفس ملف Angular 14+</strong></div>
            </div>
          </div>
        </div>

        ${codeBlock(`src/app/directives/
├── hijri-calendar.lib.ts             ← انسخ هذا (من src/)
└── hijri-calender-ng7.directive.ts  ← انسخ هذا (من legacy/)`, 'bash', 'هيكل الملفات')}
        <p style="font-size:.82rem; color:var(--txt3); margin-top:.5rem;">
          ⚠️ انتبه: اسم الملف هو <code>hijri-calender-ng7.directive.ts</code> وليس <code>hijri-calendar.directive.ts</code> — فالملف مختلف عن نسخة Angular 14+
        </p>
      </div>
    </div>

    <!-- AppModule setup -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الإضافة في AppModule</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          أضف الـ directive في قسم <code>declarations</code> في الـ NgModule.
        </p>
        ${codeBlock(`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HijriCalenderDirective } from './directives/hijri-calender-ng7.directive';

@NgModule({
  declarations: [
    AppComponent,
    HijriCalenderDirective,   // ← أضف هنا
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }`, 'typescript', 'app.module.ts')}
      </div>
    </div>

    <!-- Template usage -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الاستخدام في الـ Template</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          نفس أسلوب الاستخدام كـ Angular 14+ من حيث الـ inputs والـ outputs — لكن استخدم <code>*ngIf</code> بدلاً من <code>@if</code>.
        </p>
        ${codeBlock(`<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input type="text" readonly hijri-calender
       class="form-control" name="visitDate"
       [(ngModel)]="model.visitDate"
       placeholder="انقر لاختيار التاريخ" />

<!-- ngModel يستقبل تاريخ ميلادي — القائمة تبدأ بـ م تلقائياً -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       class="form-control" name="gregDate"
       [(ngModel)]="model.gregDate" />

<!-- مع dateChange event -->
<input type="text" readonly hijri-calender
       [(ngModel)]="selectedDate"
       (dateChange)="onDateSelected($event)"
       placeholder="اختر التاريخ" />`, 'html', 'app.component.html')}
        ${codeBlock(`<!-- مع validation -->
<div *ngIf="visitDate.invalid && visitDate.touched"
     style="color:red; font-size:12px">
  هذا الحقل مطلوب
</div>`, 'html', 'استخدام *ngIf')}
      </div>
    </div>

    <!-- Component examples -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">أمثلة كاملة في الـ Component</span></div>
      <div class="card-body">
        <div style="display:grid; gap:.75rem;">

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">1. استخدام مع ngModel</div>
            ${codeBlock(`import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="visitDate"
           placeholder="اختر التاريخ" />

    <p>التاريخ الهجري: {{ visitDate }}</p>
  \`
})
export class DatePickerComponent {
  visitDate = '';   // "1446/09/15"
}`, 'typescript')}
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">2. استخدام مع dateChange event</div>
            ${codeBlock(`import { Component } from '@angular/core';

@Component({
  selector: 'app-date-event',
  template: \`
    <input type="text" readonly hijri-calender
           [(ngModel)]="selectedDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ" />

    <div *ngIf="lastEvent">
      <p>الهجري: {{ lastEvent.hijri.formatted }}</p>
      <p>الميلادي: {{ lastEvent.greg.formatted }}</p>
    </div>
  \`
})
export class DateEventComponent {
  selectedDate = '';
  lastEvent: any = null;

  onDateSelected(event: any) {
    this.lastEvent = event;
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
}`, 'typescript')}
          </div>

          <div style="padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-weight:700; font-size:.85rem; margin-bottom:.4rem; color:var(--txt);">3. استخدام bindValue مع gregorian (بيانات من الباكاند)</div>
            ${codeBlock(`import { Component } from '@angular/core';

@Component({
  selector: 'app-gregorian-picker',
  template: \`
    <!-- bindValue='gregorian': القائمة تبدأ بـ م والـ ngModel يستقبل/يرسل ميلادي -->
    <input type="text" readonly hijri-calender
           [bindValue]="'gregorian'"
           [(ngModel)]="gregorianDate"
           (dateChange)="onDateSelected($event)"
           placeholder="اختر التاريخ الميلادي" />

    <p>الميلادي: {{ gregorianDate }}</p>
    <p *ngIf="hijriEquivalent">الهجري المقابل: {{ hijriEquivalent }}</p>
  \`
})
export class GregorianPickerComponent {
  gregorianDate = '2024/07/19';  // من الباكاند — يُعرض كميلادي تلقائياً
  hijriEquivalent = '';

  onDateSelected(event: any) {
    this.hijriEquivalent = event.hijri.formatted;
  }
}`, 'typescript')}
          </div>

        </div>
      </div>
    </div>

    <!-- Differences -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الفروق بين النسختين</span></div>
      <div class="card-body">
        <table class="api-table">
          <thead>
            <tr><th>الميزة</th><th>Angular 14+</th><th>Angular 7–13</th></tr>
          </thead>
          <tbody>
            <tr><td>ملف الـ Directive</td><td><code>hijri-calendar.directive.ts</code></td><td><code>hijri-calender-ng7.directive.ts</code></td></tr>
            <tr><td><code>standalone: true</code></td><td>✅</td><td>❌ — يُضاف في NgModule</td></tr>
            <tr><td>TypeScript</td><td>5.x (modern)</td><td>3.x–4.x compatible</td></tr>
            <tr><td>Template control flow</td><td><code>@if</code> / <code>@for</code></td><td><code>*ngIf</code> / <code>*ngFor</code></td></tr>
            <tr><td><code>bindValue</code></td><td>✅</td><td>✅</td></tr>
            <tr><td>قائمة هـ / م</td><td>✅</td><td>✅</td></tr>
            <tr><td><code>dateChange</code> event</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</section>`;
}
