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
    const norm = this.requestModel.VisitDateStr
      ? this.normaliseDateString(this.requestModel.VisitDateStr) : '';
    const g = norm ? hijriToGregorianStr(norm) : '';
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
    try {
      console.log('[AppComponent] convert called, mode:', this.convertMode, 'input:', this.convertInput);
      
      // تطبيع التاريخ أولاً
      const normalised = this.normaliseDateString(this.convertInput);
      if (!normalised) {
        this.convertResult = 'تنسيق تاريخ غير صحيح';
        return;
      }
      
      console.log('[AppComponent] convert normalised:', normalised);
      
      this.convertResult = this.convertMode === 'h2g'
        ? hijriToGregorianStr(normalised)
        : gregorianToHijriStr(normalised);
        
      console.log('[AppComponent] convert result:', this.convertResult);
    } catch (e) {
      console.error('[AppComponent] convert error:', e);
      this.convertResult = 'تاريخ غير صحيح';
    }
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
    console.log('[AppComponent] convertToGreg called with:', hijriStr);
    try { 
      // تطبيع التاريخ أولاً (تحويل dd/mm/yyyy إلى yyyy/mm/dd إذا لزم الأمر)
      const normalised = this.normaliseDateString(hijriStr);
      console.log('[AppComponent] convertToGreg normalised:', normalised);
      
      if (!normalised) {
        console.log('[AppComponent] convertToGreg: invalid date format');
        return '';
      }
      
      const result = hijriToGregorianStr(normalised);
      console.log('[AppComponent] convertToGreg result:', result);
      return result;
    } catch (e) {
      console.error('[AppComponent] convertToGreg error:', e);
      return '';
    }
  }

  private normaliseDateString(dateStr: string): string | null {
    console.log('[AppComponent] normaliseDateString input:', dateStr);
    const p = dateStr.split(/[\/\-\\]/).map(Number);
    console.log('[AppComponent] normaliseDateString split:', p);
    
    if (p.length !== 3 || p.some(isNaN)) {
      console.log('[AppComponent] normaliseDateString: invalid format');
      return null;
    }
    
    const [a, b, c] = p;
    const [y, m, d] = a > 100 ? [a, b, c] : [c, b, a];
    
    const normalised = `${y}/${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`;
    console.log('[AppComponent] normaliseDateString result:', normalised);
    return normalised;
  }

  private testNormaliseFunction(dateStr: string): void {
    console.log('[AppComponent] Testing normalise function with:', dateStr);

    // محاكاة دالة normalise من الدايركتيف
    const p = dateStr.split(/[\/\-\\]/).map(Number);
    console.log('[AppComponent] normalise split result:', p);

    if (p.length !== 3 || p.some(isNaN)) {
      console.log('[AppComponent] normalise: invalid format');
      return;
    }

    const [a, b, c] = p;
    const [y, m, d] = a > 100 ? [a, b, c] : [c, b, a];
    const normalised = `${y}/${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`;
    console.log('[AppComponent] normalised result:', normalised);
  }
}
