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
/** Returns the Arabic day name for a Hijri date string (yyyy/mm/dd format).
 *  e.g. getDayNameHijri('1446/01/15') → 'الأربعاء'
 */
export declare function getDayNameHijri(hijriStr: string): string;
/** Returns Arabic day name for a Hijri date string "yyyy/mm/dd".
 *  Direct replacement for $.calendars.instance("UmmAlQura","ar").dayOfWeek() */
export declare function hijriDayName(dateStr: string): string;
/** Returns today's Hijri date as "yyyy/mm/dd" — direct replacement for $.calendars getCurrentHijriDate() */
export declare function todayHijriStr(): string;
export type DateFormat = 'yyyy/mm/dd' | 'dd/mm/yyyy' | 'yyyy-mm-dd' | 'dd-mm-yyyy' | 'yyyy-mm' | 'yyyy';
export interface DateRange {
    hijri: string;
    greg: string;
}
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}
export interface CalendarInputOptions {
    /** Which value is bound to the input: 'hijri' (default) or 'gregorian' */
    bindValue?: 'hijri' | 'gregorian';
    /** Placeholder text */
    placeholder?: string;
    /** CSS class for the input */
    cssClass?: string;
    /** Initial value (string in yyyy/mm/dd format) */
    initialValue?: string;
    /** Callback when date is selected - returns both hijri and gregorian */
    onDateSelect?: (event: CalendarInputEvent) => void;
    /** Callback when input value changes */
    onChange?: (value: string) => void;
    /** Callback when dropdown (ه/م) changes */
    onDisplayModeChange?: (mode: 'hijri' | 'gregorian') => void;
    /** Custom CSS to inject */
    customCss?: string;
}
export interface CalendarInputEvent {
    /** التاريخ الهجري */
    hijri: HijriDateObj;
    /** التاريخ الميلادي */
    greg: GregDateObj;
    /** طريقة العرض الحالية (هجري أو ميلادي) */
    displayMode: 'hijri' | 'gregorian';
}
export declare function createCalendarInput(container: HTMLElement | string, options?: CalendarInputOptions): {
    getValue: () => string;
    setValue: (value: string) => void;
    destroy: () => void;
    getEvent: () => CalendarInputEvent | null;
};
