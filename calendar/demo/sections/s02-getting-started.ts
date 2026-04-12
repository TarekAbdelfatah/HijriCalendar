import { codeBlock } from '../utils/code-block';

export function renderGettingStarted(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-start">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📂</div>
    <div class="sec-meta">
      <h2 class="sec-title">البدء السريع</h2>
      <p class="sec-desc">ملفان فقط — انسخهما إلى مشروعك واستخدمهما مباشرةً، لا npm ولا إعداد معقد</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Step 1: Copy files -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 1 — انسخ ملفى المكتبة إلى مشروعك</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          اختر الطريقة المناسبة لمشروعك:
        </p>

        <div style="display:flex; flex-direction:column; gap:.625rem; margin-bottom:1.25rem;">

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.js</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">للإضافة مباشرة في HTML — انسخ هذا الملف وجربه فوراً بدون أي إعداد.</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">📄</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--accent); margin-bottom:.2rem;">hijri-calendar.lib.ts</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">مع Vite أو أي bundler — للاستيراد كـ module مع دعم TypeScript.</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:10px;">
            <div style="font-size:1.3rem; flex-shrink:0; margin-top:.1rem;">🎨</div>
            <div>
              <div style="font-family:'Fira Code',monospace; font-size:.87rem; font-weight:700; color:var(--txt); margin-bottom:.2rem;">hijri-calendar.css</div>
              <div style="font-size:.82rem; color:var(--txt2); line-height:1.5;">أنماط التقويم البصري — اختياري.</div>
            </div>
          </div>

        </div>

        ${codeBlock({
  vanilla: `# Option 1: Pure HTML + JS (no build)
# Copy: calendar/dist/hijri-calendar.lib.js
# Use directly in HTML:
<script src="hijri-calendar.lib.js"></script>
<script>
  var date = HijriCalendar.gregorianToHijri(2026, 4, 12);
  console.log(date.formatted); // "1447/10/14"
</script>

# Option 2: With Vite/Build
# Copy: calendar/src/hijri-calendar.lib.ts
# Then import normally:
import { gregorianToHijri } from './lib/hijri-calendar.lib';
const hijri = gregorianToHijri(2026, 4, 12);`,
  angular: `# Angular 14+ project
src/app/hijri-calendar/
│   ├── hijri-calendar.lib.ts    # Copy this
│   └── hijri-calendar.directive.ts # Copy this
└── app.component.ts`,
  legacy: `# Angular 7-13 project
src/app/directives/
│   ├── hijri-calendar.lib.ts           # Copy this
│   └── hijri-calender-ng7.directive.ts # Copy this
└── app.module.ts`
}, 'bash', 'Project Structure')}
      </div>
    </div>

    <!-- Step 2: Import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 2 — استيراد الدوال</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          حسب اختيارك في الخطوة 1:
        </p>
        ${codeBlock({
  vanilla: `# Option 1: Pure JS - لا حاجة لاستيراد
# استخدم HijriCalendar مباشرة
var hijri = HijriCalendar.gregorianToHijri(2026, 4, 12);
var name = HijriCalendar.HIJRI_MONTH_NAMES[5];

# Option 2: With Vite - استيراد انتقائي
import {
  todayHijri,
  gregorianToHijri,
  HIJRI_MONTH_NAMES,
} from './lib/hijri-calendar.lib';

# أو استيراد الكل
import * as HijriLib from './lib/hijri-calendar.lib';
const today = HijriLib.todayHijri();`,
  angular: `// Angular 14+ — standalone
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`<input type="text" hijri-calender [(ngModel)]="date" />\`,
})
export class AppComponent {
  date = '';
}`,
  legacy: `// Angular 7-13 — NgModule
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calender.directive';

@NgModule({
  declarations: [AppComponent, HijriCalenderDirective],
  imports: [BrowserModule, FormsModule],
})
export class AppModule { }`
}, 'typescript', 'Import')}

        <!-- Clarification -->
        <div style="margin-top:1rem; padding:.875rem 1rem; background:var(--surf2); border:1px solid var(--bdr); border-radius:8px;">
          <p style="font-size:.85rem; color:var(--txt2); margin-bottom:.5rem; font-weight:600;">💡 طريقتان للاستخدام في Angular:</p>
          <ul style="font-size:.82rem; color:var(--txt2); margin:0; padding-right:1.25rem; line-height:1.7;">
            <li><strong>استيراد الدالة مباشرة:</strong> <code style="color:var(--accent);">import { todayHijri } from './hijri-calendar.lib'</code> — استخدمها داخل الـ component للتعامل مع التواريخ برمجياً.</li>
            <li><strong>استيراد الـ Directive:</strong> <code style="color:var(--accent);">import { HijriCalenderDirective } from './hijri-calendar.directive'</code> — استخدمها في الـ template للحصول على input التقويم.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 3: Quick example -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 3 — مثال سريع</span></div>
      <div class="card-body">
        ${codeBlock({
  vanilla: `# Option 1: Use ready JS file
# Copy: packages/calendar/src/hijri-calendar.lib.js
<script src="hijri-calendar.lib.js"></script>
<script>
  var hijri = HijriCalendar.gregorianToHijri(2026, 4, 12);
  console.log(hijri.formatted); // "1447/10/14"
</script>

# Option 2: With Vite/Build
# Copy: packages/calendar/src/hijri-calendar.lib.ts
import { gregorianToHijri } from './lib/hijri-calendar.lib';
const hijri = gregorianToHijri(2026, 4, 12);`,
  angular: `@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  template: \`<input hijri-calender [(ngModel)]="date" />\`,
})
export class AppComponent {
  date = '';
}`,
  legacy: `@Component({
  selector: 'app-root',
  template: \`<input hijri-calender [(ngModel)]="date" />\`
})
export class AppComponent {
  date = '';
}`
}, 'typescript', 'Quick Example')}
      </div>
    </div>

    <!-- Step 4: CSS import -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الخطوة 4 — استيراد CSS (للتقويم المرئي فقط)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:.875rem; line-height:1.7;">
          إذا أردت استخدام التقويم البصري أضف ملف CSS.
        </p>
        ${codeBlock({
  vanilla: `# In TypeScript / Vite
import './lib/hijri-calendar.css';

# Or in HTML
<link rel="stylesheet" href="./lib/hijri-calendar.css">`,
  angular: `# Angular: add to angular.json styles array
"styles": [
  "src/styles.css",
  "src/app/hijri-calendar/hijri-calendar.css"
]`,
  legacy: `# Angular 7-13: add to angular.json
"styles": [
  "src/styles.css",
  "src/app/hijri-calendar/hijri-calendar.css"
]`
}, 'html', 'CSS Import')}
      </div>
    </div>



    <!-- TypeScript types -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">الأنواع الرئيسية (TypeScript)</span></div>
      <div class="card-body">
        ${codeBlock(`// الأنواع المُصدَّرة من hijri-calendar.lib.ts

interface HijriDateObj {
  year: number;       // السنة الهجرية
  month: number;      // الشهر (1–12)
  day: number;        // اليوم (1–30)
  formatted: string;  // "yyyy/mm/dd"
}

interface GregDateObj {
  year: number;
  month: number;
  day: number;
  formatted: string;  // "yyyy/mm/dd"
}

type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy';`, 'typescript', 'TypeScript Types')}
      </div>
    </div>

  </div>
</section>`;
}
