import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HijriCalenderDirective } from '../hijri-calendar/hijri-calender.directive';
import {
  hijriToGregorianStr, gregorianToHijriStr,
  todayHijri, todayGregorian,
  HIJRI_MONTH_NAMES, DAY_NAMES_AR,
} from '../hijri-calendar/hijri-calendar.lib';

@Component({
  selector: 'app-legacy-angular',
  standalone: true,
  imports: [FormsModule, HijriCalenderDirective, NgFor, NgIf],
  templateUrl: './legacy-angular.component.html',
  styleUrl: './legacy-angular.component.css',
})
export class LegacyAngularComponent implements OnInit {

  // ── Date Fields ─────────────────────────────────────────────────────────────
  requestModel = {
    VisitDateStr: '22/10/1447',
    PatientName: '',
    Notes: ''
  };
  
  submitResult = '';
  
  // ── Validation State ────────────────────────────────────────────────────────
  validationError = '';
  isFormValid = false;
  
  // ── Output Format Selection ─────────────────────────────────────────────────
  selectedFormat = 'yyyy/mm/dd';
  outputFormats: { value: string; label: string }[] = [
    { value: 'yyyy/mm/dd', label: 'yyyy/mm/dd' },
    { value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' },
    { value: 'yyyy-mm-dd', label: 'yyyy-mm-dd' }
  ];

  // ── Today Info ─────────────────────────────────────────────────────────────
  todayH = todayHijri();
  todayG = todayGregorian();
  get todayDayName(): string { return DAY_NAMES_AR[new Date().getDay()]; }
  get todayMonthName(): string { return HIJRI_MONTH_NAMES[this.todayH.month - 1]; }

  // ── ngModel values for multiple calendars ──────────────────────────────────
  model1 = { date: '' };
  model2 = { date: '' };
  model3 = { date: '' };
  
  ngOnInit(): void {
    this.model1.date = '20/10/1447';
    this.model2.date = todayGregorianStr();
    this.model3.date = '';
  }

  ngAfterViewInit(): void {
  }

  // ── onSelect Handler (called by directive) ─────────────────────────────────
  onDateSelected(dates: { hijri: string; greg: string }, fieldName: string): ValidationResult | null {
    console.log(`[LegacyAngular] ${fieldName} selected:`, dates);
    
    // Format dates based on selected format
    const formattedDate = this.formatDate(dates.hijri);
    console.log(`[LegacyAngular] Formatted ${fieldName}:`, formattedDate);
    
    // Validation Example: Date must be after 1447/01/01
    if (dates.hijri < '1447/01/01') {
      return {
        isValid: false,
        errorMessage: `التاريخ يجب أن يكون بعد 1 محرم 1447`
      };
    }
    
    // Validation Example: Date must be before 1500/12/30
    if (dates.hijri > '1500/12/30') {
      return {
        isValid: false,
        errorMessage: `التاريخ يجب أن يكون قبل 30 ذي الحجة 1500`
      };
    }
    
    return { isValid: true };
  }

  // ── Format Date Utility ────────────────────────────────────────────────────
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    
    const [y, m, d] = parts;
    
    switch (this.selectedFormat) {
      case 'yyyy/mm/dd': return dateStr;
      case 'dd/mm/yyyy': return `${d}/${m}/${y}`;
      case 'yyyy-mm-dd': return `${y}-${m}-${d}`;
      default: return dateStr;
    }
  }

  // ── Form Submission ─────────────────────────────────────────────────────────
  onSubmit(): void {
    const g = this.requestModel.VisitDateStr
      ? hijriToGregorianStr(this.requestModel.VisitDateStr) : '';
    
    const formattedDate = this.formatDate(this.requestModel.VisitDateStr);
    
    this.submitResult =
      `المريض: ${this.requestModel.PatientName}\n` +
      `الهجري: ${formattedDate}\n` +
      `الميلادي: ${g}`;
  }

  resetForm(): void {
    this.requestModel = { VisitDateStr: '', PatientName: '', Notes: '' };
    this.submitResult = '';
    this.validationError = '';
    this.isFormValid = false;
  }

  // ── Test: Load from Backend ─────────────────────────────────────────────────
  loadFromBackend(date: string): void {
    this.requestModel.VisitDateStr = date;
  }

  // ── Date Converter ──────────────────────────────────────────────────────────
  convertInput = '';
  convertResult = '';
  convertMode: 'h2g' | 'g2h' = 'h2g';

  convert(): void {
    console.log('[LegacyAngular] convert called:', this.convertMode, this.convertInput);
    const input = this.convertInput.trim();
    if (!input) {
      this.convertResult = 'الرجاء إدخال تاريخ';
      return;
    }
    
    if (this.convertMode === 'h2g') {
      const result = hijriToGregorianStr(input);
      console.log('[LegacyAngular] h2g result:', result);
      this.convertResult = result;
    } else {
      const result = gregorianToHijriStr(input);
      console.log('[LegacyAngular] g2h result:', result);
      this.convertResult = result;
    }
  }

  getGregDate(hijriDate: string): string {
    return hijriToGregorianStr(hijriDate);
  }

  // ── Form2 (two date fields) ──────────────────────────────────────────────────
  form2 = {
    title: '',
    startDate: '',
    endDate: ''
  };
  form2Result = '';

  submitForm2(): void {
    const startGreg = this.form2.startDate ? hijriToGregorianStr(this.form2.startDate) : '';
    const endGreg = this.form2.endDate ? hijriToGregorianStr(this.form2.endDate) : '';
    this.form2Result =
      `العنوان: ${this.form2.title}\n` +
      `البداية: ${this.formatDate(this.form2.startDate)} (${startGreg})\n` +
      `النهاية: ${this.formatDate(this.form2.endDate)} (${endGreg})`;
  }

  // ── Backend Simulation ──────────────────────────────────────────────────────
  testDateInput = '';
  
  simulateBackendLoad(): void {
    if (!this.testDateInput) return;
    const g = hijriToGregorianStr(this.testDateInput);
    this.requestModel.VisitDateStr = this.testDateInput;
    console.log(`[Backend Simulation] Loaded: ${this.testDateInput} → ${g}`);
  }
}

function todayGregorianStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}
