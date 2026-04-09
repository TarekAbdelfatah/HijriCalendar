import { Component, OnInit } from '@angular/core';
import {
  hijriToGregorianStr,
  gregorianToHijriStr,
  todayHijri,
  todayGregorian,
  HIJRI_MONTH_NAMES,
  DAY_NAMES_AR,
} from '@core-components/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  requestModel = {
    VisitDateStr: '22/10/1447',
    PatientName: '',
    Notes: ''
  };
  
  submitResult = '';
  todayH = todayHijri();
  todayG = todayGregorian();
  
  get todayDayName(): string { return DAY_NAMES_AR[new Date().getDay()]; }
  get todayMonthName(): string { return HIJRI_MONTH_NAMES[this.todayH.month - 1]; }

  convertInput = '';
  convertResult = '';
  convertMode: 'h2g' | 'g2h' = 'h2g';

  ngOnInit(): void {
  }

  onDateSelected(dates: { hijri: string; greg: string }, fieldName: string): any {
    console.log(`[Legacy-Angular Project] ${fieldName} selected:`, dates);
    return { isValid: true };
  }

  getGregDate(hijriDate: string): string {
    return hijriToGregorianStr(hijriDate);
  }

  onSubmit(): void {
    const g = this.requestModel.VisitDateStr
      ? hijriToGregorianStr(this.requestModel.VisitDateStr) : '';
    
    this.submitResult =
      `المريض: ${this.requestModel.PatientName}\n` +
      `الهجري: ${this.requestModel.VisitDateStr}\n` +
      `الميلادي: ${g}`;
  }

  resetForm(): void {
    this.requestModel = { VisitDateStr: '', PatientName: '', Notes: '' };
    this.submitResult = '';
  }

  convert(): void {
    const input = this.convertInput.trim();
    if (!input) return;
    
    if (this.convertMode === 'h2g') {
      this.convertResult = hijriToGregorianStr(input);
    } else {
      this.convertResult = gregorianToHijriStr(input);
    }
  }
}
