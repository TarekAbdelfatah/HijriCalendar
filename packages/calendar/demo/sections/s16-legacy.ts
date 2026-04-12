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

    <!-- Files to copy -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الملفات المطلوبة</span></div>
      <div class="card-body">
        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1rem;">
          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">المكتبة الأساسية — نفس الملف</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calender-ng7.directive.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">الـ Directive — انسخه من مجلد legacy/</div>
            </div>
          </div>
        </div>

        ${codeBlock(`src/app/directives/
├── hijri-calendar.lib.ts            ← انسخ هذا
└── hijri-calender-ng7.directive.ts ← انسخ هذا`, 'bash', 'هيكل الملفات')}
      </div>
    </div>

    <!-- AppModule setup -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الإضافة في AppModule</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
         声明 الـ directive في قسم <code>declarations</code> في الـ NgModule.
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
          نفس الاستخدام كما في Angular 14+ — لكن استخدم <code>*ngIf</code> بدلاً من <code>@if</code> (جديد في Angular 17).
        </p>
        ${codeBlock(`<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input type="text" readonly hijri-calender
       class="form-control" name="visitDate"
       [(ngModel)]="model.visitDate"
       placeholder="انقر لاختيار التاريخ" />

<!-- ngModel يستقبل تاريخ ميلادي -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       class="form-control" name="gregDate"
       [(ngModel)]="model.gregDate" />`, 'html', 'app.component.html')}
        ${codeBlock(`<!-- مع validation -->
<div *ngIf="visitDate.invalid && visitDate.touched"
     style="color:red; font-size:12px">
  هذا الحقل مطلوب
</div>`, 'html', 'استخدام *ngIf')}
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
            <tr><td><code>standalone: true</code></td><td>✅</td><td>❌ — يُ声明 في NgModule</td></tr>
            <tr><td>TypeScript</td><td>5.x (modern)</td><td>3.x compatible</td></tr>
            <tr><td>Template control flow</td><td><code>@if</code> / <code>@for</code></td><td><code>*ngIf</code> / <code>*ngFor</code></td></tr>
            <tr><td>الـ Directive</td><td>✅</td><td>✅ (نفس الكود)</td></tr>
            <tr><td><code>bindValue</code></td><td>✅</td><td>✅</td></tr>
            <tr><td>قائمة هـ / م</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</section>`;
}