/**
 * اختبار مكتبة hijri-calendar.lib.ts
 * للتحقق من سبب ظهور NaN/NaN/NaN
 */

// محاكاة أجزاء من مكتبة التقويم
const UMM_DATA = [ /* ... البيانات الضخمة ... */ ];

const MCJDN_OFFSET = 2400000 - 0.5;
const MIN_YEAR = 1276;
const MAX_YEAR = 1500;

function ummIdx(year, month) {
  return (12 * (year - 1)) + month - 15292;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function hijriToJD(year, month, day) {
  const idx = ummIdx(year, month);
  return (day + UMM_DATA[idx - 1] - 1) + MCJDN_OFFSET;
}

function jdToGreg(jd) {
  const z = Math.floor(jd + 0.5);
  const alpha = Math.floor((z - 1867216.25) / 36524.25);
  const a = z + 1 + alpha - Math.floor(alpha / 4);
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  return { year, month, day };
}

function hijriToGregorianStr(hijriStr) {
  const [y, m, d] = hijriStr.split('/').map(Number);
  console.log('hijriToGregorianStr input:', hijriStr, '->', {y, m, d});
  
  const jd = hijriToJD(y, m, d);
  console.log('Julian Day:', jd);
  
  const g = jdToGreg(jd);
  console.log('Gregorian result:', g);
  
  return `${g.year}/${pad2(g.month)}/${pad2(g.day)}`;
}

// اختبار التواريخ
console.log('=== اختبار hijriToGregorianStr ===');

const testCases = [
  '1447/10/22',
  '1446/01/15', // تاريخ مثال من الكود
  '1500/12/30', // الحد الأقصى
  '1276/01/01', // الحد الأدنى
];

testCases.forEach(dateStr => {
  console.log(`\n--- اختبار ${dateStr} ---`);
  try {
    const result = hijriToGregorianStr(dateStr);
    console.log('النتيجة:', result);
  } catch (e) {
    console.error('خطأ:', e.message);
  }
});

// اختبار آخر: تحقق مما إذا كان الشهر 10 صالحًا لسنة 1447
console.log('\n=== تحقق من صحة التاريخ الهجري ===');
const year = 1447;
const month = 10;
const day = 22;

console.log(`السنة ${year} ضمن النطاق ${MIN_YEAR}-${MAX_YEAR}?`, year >= MIN_YEAR && year <= MAX_YEAR);

// حساب الفهرس
const idx = ummIdx(year, month);
console.log(`ummIdx(${year}, ${month}) =`, idx);
console.log('طول UMM_DATA:', UMM_DATA.length);
console.log('هل الفهرس ضمن النطاق?', idx >= 0 && idx < UMM_DATA.length);

// تحقق من وجود البيانات للشهر السابق (لحساب عدد الأيام)
if (idx > 0 && idx < UMM_DATA.length) {
  const daysInMonth = UMM_DATA[idx] - UMM_DATA[idx - 1];
  console.log(`عدد أيام الشهر ${month}:`, daysInMonth);
  console.log(`اليوم ${day} ضمن 1-${daysInMonth}?`, day >= 1 && day <= daysInMonth);
}