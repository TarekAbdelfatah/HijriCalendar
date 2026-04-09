import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';
import {
  hijriToGregorianStr, gregorianToHijriStr,
  todayHijri, todayGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_AR,
} from '@core-components/calendar';

interface TestSection {
  id: string;
  title: string;
  description: string;
  code: string;
  result: string;
  dateValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  currentPage: 'demo' | 'docs' | 'legacy' = 'demo';

  // ── معلومات اليوم ─────────────────────────────────────────────────────────
  todayH = todayHijri();
  todayG = todayGregorian();

  get todayDayName(): string { return DAY_NAMES_AR[new Date().getDay()]; }
  get todayMonthName(): string { return HIJRI_MONTH_NAMES[this.todayH.month - 1]; }

  // ── نموذج الزيارة (الاستخدام الأساسي) ──────────────────────────────────
  requestModel = { VisitDateStr: '22/10/1447', PatientName: '', Notes: '' };
  submitResult = '';

  onSubmit(): void {
    const g = this.requestModel.VisitDateStr
      ? hijriToGregorianStr(this.requestModel.VisitDateStr) : '';
    this.submitResult =
      `المريض: ${this.requestModel.PatientName} | ` +
      `الهجري: ${this.requestModel.VisitDateStr} | ` +
      `الميلادي: ${g}`;
  }

  resetForm(): void {
    this.requestModel = { VisitDateStr: '', PatientName: '', Notes: '' };
    this.submitResult = '';
  }

  // ── أداة التحويل ─────────────────────────────────────────────────────────
  convertInput = '';
  convertResult = '';
  convertMode: 'h2g' | 'g2h' = 'h2g';

  convert(): void {
    this.convertResult = this.convertMode === 'h2g'
      ? hijriToGregorianStr(this.convertInput)
      : gregorianToHijriStr(this.convertInput);
  }

  // ── نموذج ثاني (تعدد الحقول) ─────────────────────────────────────────────
  form2 = { startDate: '', endDate: '', title: '' };
  form2Result = '';

  submitForm2(): void {
    this.form2Result =
      `${this.form2.title}: من ${this.form2.startDate} إلى ${this.form2.endDate}`;
  }

  // ── محاكاة تحميل من الباك إند ─────────────────────────────────────────────
  testDateInput = '';
  simulateBackendLoad(): void {
    console.log('[AppComponent] simulateBackendLoad, testDateInput:', this.testDateInput);
  }

  convertToGreg(hijriStr: string): string {
    return hijriToGregorianStr(hijriStr);
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── اختبارات التوثيق / Documentation Tests ─────────────────────────────
  // ══════════════════════════════════════════════════════════════════════

  // Test 1: Basic Usage
  test1Model = { date: '' };
  test1Result = '';
  test1Greg = '';

  onSelect1(dates: { hijri: string; greg: string }): void {
    this.test1Result = `Hijri: ${dates.hijri}`;
    this.test1Greg = `Greg: ${dates.greg}`;
  }

  // Test 2: Validation - Min Date
  test2Model = { date: '' };
  test2Result = '';
  test2ValidationMsg = '';
  test2MinDate = '1447/01/01';

  onSelect2(dates: { hijri: string; greg: string }): void {
    if (dates.hijri < this.test2MinDate) {
      this.test2ValidationMsg = `❌ التاريخ يجب أن يكون بعد ${this.test2MinDate}`;
      return;
    }
    this.test2ValidationMsg = '✅ التاريخ صحيح';
    this.test2Result = `Hijri: ${dates.hijri} | Greg: ${dates.greg}`;
  }

  // Test 3: Validation - Max Date
  test3Model = { date: '' };
  test3Result = '';
  test3ValidationMsg = '';
  test3MaxDate = '1500/12/30';

  onSelect3(dates: { hijri: string; greg: string }): void {
    if (dates.hijri > this.test3MaxDate) {
      this.test3ValidationMsg = `❌ التاريخ يجب أن يكون قبل ${this.test3MaxDate}`;
      return;
    }
    this.test3ValidationMsg = '✅ التاريخ صحيح';
    this.test3Result = `Hijri: ${dates.hijri} | Greg: ${dates.greg}`;
  }

  // Test 4: Output Format
  test4Model = { date: '' };
  test4Result = '';
  test4Formats = [
    { value: 'yyyy/mm/dd', label: 'yyyy/mm/dd' },
    { value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' },
    { value: 'yyyy-mm-dd', label: 'yyyy-mm-dd' }
  ];
  test4SelectedFormat = 'yyyy/mm/dd';

  formatDate4(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    const [y, m, d] = parts;
    switch (this.test4SelectedFormat) {
      case 'yyyy/mm/dd': return dateStr;
      case 'dd/mm/yyyy': return `${d}/${m}/${y}`;
      case 'yyyy-mm-dd': return `${y}-${m}-${d}`;
      default: return dateStr;
    }
  }

  onSelect4(dates: { hijri: string; greg: string }): void {
    this.test4Result = `Formatted: ${this.formatDate4(dates.hijri)}`;
  }

  // Test 5: Range Validation (between two dates)
  test5Model = { date: '' };
  test5Result = '';
  test5ValidationMsg = '';
  test5MinDate = '1447/01/01';
  test5MaxDate = '1447/12/30';

  onSelect5(dates: { hijri: string; greg: string }): void {
    if (dates.hijri < this.test5MinDate) {
      this.test5ValidationMsg = `❌ قبل نطاق التاريخ المسموح`;
      return;
    }
    if (dates.hijri > this.test5MaxDate) {
      this.test5ValidationMsg = `❌ بعد نطاق التاريخ المسموح`;
      return;
    }
    this.test5ValidationMsg = '✅ داخل النطاق المسموح';
    this.test5Result = `Hijri: ${dates.hijri} | Greg: ${dates.greg}`;
  }

  // Test 6: Required Field Validation
  test6Model = { date: '' };
  test6Touched = false;
  test6ValidationMsg = '';

  onSelect6(dates: { hijri: string; greg: string }): void {
    this.test6Touched = true;
    if (!dates.hijri) {
      this.test6ValidationMsg = '❌ هذا الحقل مطلوب';
      return;
    }
    this.test6ValidationMsg = '✅ تم الاختيار';
  }

  // Test 7: Event Handler
  test7Model = { date: '' };
  test7Events: string[] = [];

  onSelect7(dates: { hijri: string; greg: string }): void {
    this.test7Events.push(`${new Date().toLocaleTimeString()}: ${dates.hijri}`);
    if (this.test7Events.length > 5) this.test7Events.shift();
  }

  clearTest7Events(): void {
    this.test7Events = [];
  }

  // Test 8: Multiple Calendars
  test8Model1 = { date: '' };
  test8Model2 = { date: '' };
  test8Model3 = { date: '' };

  // Test 9: bindValue - Gregorian
  test9Model = { date: '' };
  test9Result = '';

  onSelect9(dates: { hijri: string; greg: string }): void {
    this.test9Result = `Greg: ${dates.greg} | Hijri: ${dates.hijri}`;
  }

  // Test 10: Convert Helper
  test10Input = '';
  test10Result = '';

  convertTest(mode: 'h2g' | 'g2h'): void {
    this.test10Result = mode === 'h2g'
      ? hijriToGregorianStr(this.test10Input)
      : gregorianToHijriStr(this.test10Input);
  }

  // Test 11: Backend Simulation - Auto Normalize
  test11Model = { date: '' };
  test11BackendValues = [
    '22/10/1447',    // dd/mm/yyyy (wrong format)
    '1447/10/22',   // yyyy/mm/dd (correct)
    '2026/04/08',   // Gregorian yyyy/mm/dd
  ];
  test11Result = '';

  loadTest11(value: string): void {
    this.test11Model.date = value;
    this.test11Result = `Loaded: ${value}`;
  }

  // Test 12: Today Functions
  get todayInfo(): string {
    return `Hijri: ${todayHijriStr()} | Greg: ${todayGregorianStr()}`;
  }
}

function todayHijriStr(): string {
  const h = todayHijri();
  return `${h.year}/${String(h.month).padStart(2,'0')}/${String(h.day).padStart(2,'0')}`;
}

function todayGregorianStr(): string {
  const g = todayGregorian();
  return g.formatted;
}
