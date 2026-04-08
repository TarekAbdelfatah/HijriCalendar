# التقويم الهجري · Hijri Calendar

تقويم هجري/ميلادي مبني على جدول **أم القرى الرسمي السعودي** — بدون jQuery، بدون أي تبعيات خارجية.

> **Pure TypeScript · No jQuery · No dependencies**  
> Real Saudi Umm al-Qura table · Valid range: 1276–1500 AH (1859–2077 CE)

---

## هيكل المشروع · Project Structure

```
HijriCalendar/
├── standalone/
│   └── hijri-calendar.lib.ts            ← المكتبة المستقلة (Vanilla TS/JS)
├── legacy/
│   └── hijri-calender-ng7.directive.ts  ← Directive متوافق مع Angular 7–13
├── hijri-app/                           ← مشروع Angular 18 كامل (Directive + Demo)
│   └── src/app/hijri-calendar/
│       ├── hijri-calendar.lib.ts        ← نفس المكتبة
│       └── hijri-calender.directive.ts  ← Angular 14+ Standalone Directive
└── README.md
```

| المسار | الاستخدام |
|--------|-----------|
| `standalone/hijri-calendar.lib.ts` | Vanilla JS/TS — ASP.NET — Blazor — Next.js — React — Vue |
| `hijri-app/src/app/hijri-calendar/hijri-calender.directive.ts` | Angular 14+ (standalone) |
| `legacy/hijri-calender-ng7.directive.ts` | Angular 7–13 (NgModule) |

---

## دقة التقويم · Accuracy

المكتبة تستخدم جدول MCJDN الحقيقي من مصدر [kbwood/calendars](https://github.com/kbwood/calendars) (MIT) — **وليس الخوارزمية الجدولية التقريبية**.

| التاريخ الهجري | الرسمي السعودي | هذه المكتبة | الحالة |
|----------------|----------------|-------------|--------|
| 1 محرم 1445    | 2023/07/19     | 2023/07/19  | ✅     |
| 1 رمضان 1445   | 2024/03/11     | 2024/03/11  | ✅     |
| 1 شوال 1445 (عيد) | 2024/04/10  | 2024/04/10  | ✅     |
| 1 محرم 1446    | 2024/07/07     | 2024/07/07  | ✅     |
| 1 محرم 1447    | 2025/06/26     | 2025/06/26  | ✅     |

---

## 1. Angular Directive

### التثبيت · Setup

انسخ ملفي المكتبة إلى مشروعك:

```
src/app/hijri-calendar/
├── hijri-calendar.lib.ts
└── hijri-calender.directive.ts
```

ثم استورد في الـ Component:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  visitDate = '';    // "1446/09/15"
  gregDate  = '';    // "2025/03/15"
}
```

### الاستخدام الأساسي

أضف `hijri-calender` على أي `<input>` — تأكد من `readonly` لمنع الكتابة اليدوية:

```html
<!-- القيمة المرتبطة هجرية بصيغة yyyy/mm/dd (الافتراضي) -->
<input
  type="text"
  readonly
  hijri-calender
  name="visitDate"
  [(ngModel)]="visitDate"
/>
```

### bindValue — التحكم في صيغة القيمة المُخزَّنة

الـ `bindValue` يحدد ما يُخزَّن في المتغير المرتبط بـ `ngModel`:

```html
<!-- الافتراضي: ngModel يستقبل/يرسل تاريخ هجري "1446/09/15" -->
<input readonly hijri-calender [(ngModel)]="model.hijriDate" name="d1" />

<!-- bindValue='gregorian': ngModel يستقبل/يرسل تاريخ ميلادي "2025/03/15" -->
<input readonly hijri-calender [bindValue]="'gregorian'"
       [(ngModel)]="model.gregDate" name="d2" />
```

| bindValue | ما يُخزَّن في ngModel | ما يعرضه البوب-اب |
|-----------|----------------------|-------------------|
| `'hijri'` (افتراضي) | `"1446/09/15"` | التقويم الهجري |
| `'gregorian'` | `"2025/03/15"` | التقويم الهجري |

> **ملاحظة:** القائمة المنسدلة (هـ / م) بجانب الحقل تتحكم في **طريقة عرض البوب-اب** فقط،  
> وليس في `bindValue`. يمكن للمستخدم عرض ميلادي بينما يُخزَّن هجري والعكس.

### قائمة هـ / م المنسدلة

تظهر تلقائياً بجانب كل حقل. تتيح للمستخدم التبديل بين:
- **هـ** — عرض شبكة التقويم الهجري
- **م** — عرض شبكة التقويم الميلادي

التحويل يتم تلقائياً في الخلفية.

### مثال كامل مع Validation

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>

  <div class="field">
    <label>اسم المريض <span style="color:red">*</span></label>
    <input type="text" class="inp" name="patientName"
           [(ngModel)]="model.patientName" required />
  </div>

  <div class="field">
    <label>تاريخ الزيارة <span style="color:red">*</span></label>
    <input
      required
      type="text"
      readonly
      hijri-calender
      class="inp"
      name="visitDate"
      #visitDate="ngModel"
      [(ngModel)]="model.visitDate"
      placeholder="انقر لاختيار التاريخ"
    />
    @if (visitDate.invalid && visitDate.touched) {
      <span style="color:red; font-size:12px">هذا الحقل مطلوب</span>
    }
  </div>

  <button type="submit" [disabled]="f.invalid">حفظ</button>
</form>
```

```typescript
export class MyComponent {
  model = { patientName: '', visitDate: '' };

  onSubmit(f: NgForm) {
    console.log(this.model.visitDate); // "1446/09/15"
  }
}
```

### حقلان في نفس النموذج

```html
<input required type="text" readonly hijri-calender
       class="inp" name="startDate" [(ngModel)]="range.start" />

<input required type="text" readonly hijri-calender
       class="inp" name="endDate" [(ngModel)]="range.end" />
```

### تشغيل مشروع Angular التجريبي

```bash
cd hijri-app
npm install
ng serve
# افتح http://localhost:4200
```

---

## 2. Angular 7–13 Directive (NgModule)

استخدم الملف `legacy/hijri-calender-ng7.directive.ts` — متوافق مع TypeScript 3.x.

### الملفات المطلوبة

انسخ ملفين إلى مشروعك:
- `legacy/hijri-calender-ng7.directive.ts` → مثلاً `src/app/directives/hijri-calender.directive.ts`
- `standalone/hijri-calendar.lib.ts` → مثلاً `src/assets/hijri-calender/hijri-calendar.lib.ts`

### تعديل مسار الاستيراد

افتح `hijri-calender.directive.ts` وعدّل سطر الـ import ليطابق مكان الـ lib في مشروعك:

```typescript
// عدّل هذا المسار حسب مشروعك
import { ... } from '../assets/hijri-calender/hijri-calendar.lib';
```

### إضافة الـ Directive في AppModule

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HijriCalenderDirective } from './directives/hijri-calender.directive';

@NgModule({
  declarations: [
    AppComponent,
    HijriCalenderDirective,   // ← أضف هنا
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

### الاستخدام في القالب

**نفس الـ attributes تماماً** كما في Angular 18:

```html
<!-- ngModel يستقبل تاريخ هجري (الافتراضي) -->
<input
  required
  type="text"
  readonly
  hijri-calender
  class="form-control"
  name="VisitDate"
  #VisitDate="ngModel"
  [(ngModel)]="requestModel.VisitDateStr"
/>
<span *ngIf="VisitDate.invalid && VisitDate.touched" style="color:red">
  هذا الحقل مطلوب
</span>

<!-- ngModel يستقبل تاريخ ميلادي -->
<input type="text" readonly hijri-calender
       [bindValue]="'gregorian'"
       name="startDate" [(ngModel)]="model.gregDate" />
```

> **ملاحظة Angular 7:** استخدم `*ngIf` بدلاً من `@if` — الـ control flow الجديد متاح من Angular 17 فقط.

### الفروق بين النسختين

| | Angular 18 (`hijri-app/`) | Angular 7–13 (`legacy/`) |
|-|--------------------------|--------------------------|
| `standalone: true` | ✅ | ❌ — يُعلَن في NgModule |
| TypeScript | 5.x (modern syntax) | 3.x compatible |
| Template control flow | `@if` / `@for` | `*ngIf` / `*ngFor` |
| الـ Directive نفسه | ✅ | ✅ |
| `bindValue` | ✅ | ✅ |
| قائمة هـ / م | ✅ | ✅ |

---

## 3. Standalone Library (Vanilla TS/JS)

استخدم `standalone/hijri-calendar.lib.ts` مباشرة في أي مشروع.

### تحويل إلى JavaScript

```bash
npx tsc standalone/hijri-calendar.lib.ts \
    --module esnext --target es2017 \
    --moduleResolution bundler \
    --outDir standalone/dist
```

### الدوال الأساسية · Core Functions

```typescript
import {
  hijriToGregorianStr,
  gregorianToHijriStr,
  todayHijri,
  todayGregorian,
} from './hijri-calendar.lib';

// تحويل هجري → ميلادي
hijriToGregorianStr("1446/09/01")  // "2025/03/01"

// تحويل ميلادي → هجري
gregorianToHijriStr("2025/03/01")  // "1446/09/01"

// اليوم الحالي
const h = todayHijri();    // { year:1446, month:9, day:15, formatted:"15 رمضان 1446" }
const g = todayGregorian();// { year:2025, month:3, day:15, formatted:"2025/03/15" }
```

### ASP.NET MVC / Razor Pages

```html
<!-- _Layout.cshtml أو الصفحة مباشرة -->
<script type="module">
  import { hijriToGregorianStr, gregorianToHijriStr, todayHijri, pad2 }
    from '/lib/hijri-calendar.lib.js';

  // تعبئة الحقل بتاريخ اليوم هجري
  const t = todayHijri();
  document.getElementById('visitDate').value =
    `${t.year}/${pad2(t.month)}/${pad2(t.day)}`;

  // قبل الإرسال: تحويل للميلادي وحفظ في حقل مخفي
  document.getElementById('myForm').addEventListener('submit', () => {
    const hijri = document.getElementById('visitDate').value;
    document.getElementById('visitDateGreg').value = hijriToGregorianStr(hijri);
  });
</script>

<form id="myForm" method="post">
  <input id="visitDate" name="VisitDateHijri" type="text" readonly />
  <input id="visitDateGreg" name="VisitDateGreg" type="hidden" />
  <button type="submit">حفظ</button>
</form>
```

```csharp
// HomeController.cs
[HttpPost]
public IActionResult Save(string VisitDateHijri, string VisitDateGreg)
{
    // VisitDateHijri = "1446/09/15"
    // VisitDateGreg  = "2025/03/15"
    if (DateTime.TryParse(VisitDateGreg, out var date))
    {
        // احفظ date في قاعدة البيانات
    }
    return RedirectToAction("Index");
}
```

### Blazor WebAssembly / Server

```javascript
// wwwroot/hijri-interop.js
import { todayHijri, hijriToGregorianStr, gregorianToHijriStr, pad2 }
  from './hijri-calendar.lib.js';

window.hijriLib = {
  todayStr() {
    const t = todayHijri();
    return `${t.year}/${pad2(t.month)}/${pad2(t.day)}`;
  },
  toGregorian(hijri) { return hijriToGregorianStr(hijri); },
  toHijri(greg)      { return gregorianToHijriStr(greg); },
};
```

```html
<!-- index.html -->
<script type="module" src="hijri-interop.js"></script>
```

```csharp
// MyComponent.razor
@inject IJSRuntime JS

<input @bind="hijriDate" readonly />
<p>الميلادي: @gregDate</p>

@code {
    string hijriDate = "";
    string gregDate  = "";

    protected override async Task OnInitializedAsync()
    {
        hijriDate = await JS.InvokeAsync<string>("hijriLib.todayStr");
        gregDate  = await JS.InvokeAsync<string>("hijriLib.toGregorian", hijriDate);
    }

    async Task OnDatePicked(string newHijri)
    {
        hijriDate = newHijri;
        gregDate  = await JS.InvokeAsync<string>("hijriLib.toGregorian", newHijri);
    }
}
```

### Next.js / React

```tsx
// lib/hijri-calendar.lib.ts  ← انسخ الملف هنا
// components/HijriDateInput.tsx
'use client';
import { useState, useEffect } from 'react';
import { todayHijri, hijriToGregorianStr, pad2 } from '@/lib/hijri-calendar.lib';

interface Props {
  value?: string;
  onChange?: (hijri: string, greg: string) => void;
}

export default function HijriDateInput({ value, onChange }: Props) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (value) {
      setDisplay(value);
    } else {
      const t = todayHijri();
      setDisplay(`${t.year}/${pad2(t.month)}/${pad2(t.day)}`);
    }
  }, [value]);

  function pick(hijri: string) {
    setDisplay(hijri);
    const greg = hijriToGregorianStr(hijri);
    onChange?.(hijri, greg);
  }

  return (
    <input
      type="text"
      readOnly
      value={display}
      className="border rounded px-3 py-2 cursor-pointer"
      onClick={() => { /* افتح popup التقويم */ }}
    />
  );
}
```

```tsx
// app/page.tsx
import HijriDateInput from '@/components/HijriDateInput';

export default function Page() {
  return (
    <HijriDateInput
      onChange={(hijri, greg) => {
        console.log('Hijri:', hijri);   // "1446/09/15"
        console.log('Greg:',  greg);    // "2025/03/15"
      }}
    />
  );
}
```

### Vue 3

```vue
<!-- components/HijriInput.vue -->
<template>
  <input type="text" readonly :value="display" @click="openPicker" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { todayHijri, hijriToGregorianStr, pad2 } from '@/lib/hijri-calendar.lib';

const emit = defineEmits<{ change: [hijri: string, greg: string] }>();
const display = ref('');

onMounted(() => {
  const t = todayHijri();
  display.value = `${t.year}/${pad2(t.month)}/${pad2(t.day)}`;
});

function pick(hijri: string) {
  display.value = hijri;
  emit('change', hijri, hijriToGregorianStr(hijri));
}
</script>
```

---

## 3. مرجع API الكامل · Full API Reference

### دوال التحويل النصي

```typescript
hijriToGregorianStr(hijriStr: string): string
// الإدخال:  "1446/09/15"  أو  "1446-09-15"  أو  "15/09/1446"
// الإخراج: "2025/03/15"

gregorianToHijriStr(gregStr: string): string
// الإدخال:  "2025/03/15"
// الإخراج: "1446/09/15"
```

### دوال التحويل بالأرقام

```typescript
hijriToGregorian(hYear: number, hMonth: number, hDay: number): GregDateObj
// { year: 2025, month: 3, day: 15, formatted: "2025/03/15" }

gregorianToHijri(gYear: number, gMonth: number, gDay: number): HijriDateObj
// { year: 1446, month: 9, day: 15, formatted: "15 رمضان 1446" }
```

### التاريخ الحالي

```typescript
todayHijri(): HijriDateObj        // { year:1446, month:9, day:15, formatted:"15 رمضان 1446" }
todayHijriStr(): string           // "1446/09/15"  ← بديل مباشر لـ getCurrentHijriDate() بدون jQuery

todayGregorian(): GregDateObj     // { year:2025, month:3, day:15, formatted:"2025/03/15" }
todayGregorianStr(): string       // "2025/03/15"
```

### معلومات الشهر والسنة

```typescript
hijriDaysInMonth(year: number, month: number): number  // 29 أو 30
gregDaysInMonth(year: number, month: number): number   // 28–31

hijriIsLeapYear(year: number): boolean   // السنة الكبيسة الهجرية (12 شهراً، آخرها 30 يوم)
gregIsLeapYear(year: number): boolean
```

### يوم الأسبوع

```typescript
hijriDayOfWeek(year: number, month: number, day: number): number
gregDayOfWeek(year: number, month: number, day: number): number
// 0 = الأحد، 1 = الاثنين، ... 6 = السبت
```

### التحقق من الصحة

```typescript
hijriIsValid(year: number, month: number, day: number): boolean
```

### الثوابت

```typescript
HIJRI_MONTH_NAMES: string[]
// ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة',
//  'رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة']

HIJRI_MONTH_NAMES_EN: string[]
// ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani',
//  'Jumada al-Ula','Jumada al-Akhira','Rajab','Shaban',
//  'Ramadan','Shawwal','Dhul Qadah','Dhul Hijjah']

GREG_MONTH_NAMES_AR: string[]
// ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
//  'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

DAY_NAMES_AR: string[]
// ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']

DAY_NAMES_SHORT_AR: string[]
// ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت']

pad2(n: number): string   // pad2(5) → "05"
```

### الأنواع

```typescript
interface HijriDateObj {
  year: number;
  month: number;
  day: number;
  formatted: string;  // "15 رمضان 1446"
}

interface GregDateObj {
  year: number;
  month: number;
  day: number;
  formatted: string;  // "2025/03/15"
}
```

---

## 4. النطاق المدعوم · Supported Range

| | الهجري | الميلادي |
|-|--------|---------|
| من | 1276 هـ | 1859 م |
| إلى | 1500 هـ | 2077 م |

---

## 5. الترخيص · License

MIT — بيانات الجدول من [kbwood/calendars](https://github.com/kbwood/calendars) (MIT)
