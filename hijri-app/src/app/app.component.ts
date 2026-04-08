import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijriCalenderDirective } from './hijri-calendar/hijri-calender.directive';
import {
  hijriToGregorianStr, gregorianToHijriStr,
  todayHijri, todayGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_AR,
} from './hijri-calendar/hijri-calendar.lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

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

  // ── معلومات اليوم ─────────────────────────────────────────────────────────
  todayH = todayHijri();
  todayG = todayGregorian();

  get todayDayName(): string { return DAY_NAMES_AR[new Date().getDay()]; }
  get todayMonthName(): string { return HIJRI_MONTH_NAMES[this.todayH.month - 1]; }

  // ── محاكاة تحميل من الباك إند ─────────────────────────────────────────────
  testDateInput = '';
  simulateBackendLoad(): void {
    console.log('[AppComponent] simulateBackendLoad, testDateInput:', this.testDateInput);
  }

  convertToGreg(hijriStr: string): string {
    return hijriToGregorianStr(hijriStr);
  }
}
