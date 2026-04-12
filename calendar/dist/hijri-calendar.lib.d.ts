/**
 * Hijri Calendar Library - Pure TypeScript logic only.
 * Real Saudi Umm al-Qura lookup table (kbwood/calendars, MIT)
 * Valid range: 1276–1500 AH  (1859–2077 CE)
 */
export declare function pad2(n: number): string;
export interface HijriDateObj {
    year: number;
    month: number;
    day: number;
    formatted: string;
}
export interface GregDateObj {
    year: number;
    month: number;
    day: number;
    formatted: string;
}
export declare const HIJRI_MONTH_NAMES: string[];
export declare const HIJRI_MONTH_NAMES_EN: string[];
export declare const DAY_NAMES_AR: string[];
export declare const DAY_NAMES_SHORT_AR: string[];
export declare const GREG_MONTH_NAMES_AR: string[];
export declare function hijriDaysInMonth(year: number, month: number): number;
export declare function hijriIsValid(year: number, month: number, day: number): boolean;
export declare function hijriToJD(year: number, month: number, day: number): number;
export declare function jdToHijri(jd: number): {
    year: number;
    month: number;
    day: number;
};
export declare function dayOfWeekForJD(jd: number): number;
export declare function hijriDayOfWeek(year: number, month: number, day: number): number;
export declare function gregDayOfWeek(year: number, month: number, day: number): number;
export declare function gregIsLeapYear(year: number): boolean;
export declare function gregDaysInMonth(year: number, month: number): number;
export declare function hijriToGregorian(hYear: number, hMonth: number, hDay: number): GregDateObj;
export declare function gregorianToHijri(gYear: number, gMonth: number, gDay: number): HijriDateObj;
export declare function hijriToGregorianStr(hijriStr: string): string;
export declare function gregorianToHijriStr(gregStr: string): string;
export declare function todayHijri(): HijriDateObj;
export declare function todayGregorian(): GregDateObj;
export type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy' | 'yyyy-mm' | 'yyyy';
export interface DateRange {
    hijri: string;
    greg: string;
}
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}
