/**
 * اختبار مكتبة التقويم ودالة normalise
 */

// دالة normalise من hijri-calender.directive.ts
function pad2(n) {
  return String(n).padStart(2, '0');
}

function normalise(s) {
  console.log('normalise input:', JSON.stringify(s), 'length:', s.length);
  const p = s.split(/[\/\-\\]/).map(Number);
  console.log('split result:', p, 'length:', p.length);
  
  if (p.length !== 3 || p.some(isNaN)) {
    console.log('normalise: invalid format or NaN');
    return null;
  }
  
  const [a, b, c] = p;
  console.log('parts:', {a, b, c});
  
  const [y, m, d] = a > 100 ? [a, b, c] : [c, b, a];
  console.log('normalized:', {y, m, d});
  
  const result = `${y}/${pad2(m)}/${pad2(d)}`;
  console.log('normalise result:', result);
  return result;
}

// اختبار حالات مختلفة
console.log('=== اختبار دالة normalise ===');

const testCases = [
  '20/10/1447',
  '1447/10/20',
  '20-10-1447',
  '20\\10\\1447',
  ' 20/10/1447 ',
  '20/10/1447',
  '10/20/1447',
  '1447-10-20',
  '2026/04/08',
  '08/04/2026',
  '٢٠/١٠/١٤٤٧', // أرقام عربية
  'invalid',
  '',
  '20/10',
  '20/10/1447/extra',
];

testCases.forEach((testCase, index) => {
  console.log(`\n--- Test ${index + 1}: ${testCase} ---`);
  const result = normalise(testCase);
  console.log('Result:', result);
});

console.log('\n=== اختبار صحة التواريخ الهجرية ===');
// نتحقق من نطاق السنوات الصالحة
// النطاق: 1276-1500 هـ
const hijriYear = 1447;
const hijriMonth = 10;
const hijriDay = 20;

console.log(`التحقق من التاريخ الهجري: ${hijriYear}/${hijriMonth}/${hijriDay}`);
console.log(`هل السنة ضمن النطاق 1276-1500؟ ${hijriYear >= 1276 && hijriYear <= 1500}`);

// اختبار تحويل التاريخ
console.log('\n=== اختبار تحويل التاريخ الهجري إلى الميلادي ===');
console.log('ملاحظة: هذا يتطلب مكتبة hijri-calendar.lib.ts كاملة');

console.log('\n=== ملاحظات ===');
console.log('1. دالة normalise تتوقع تنسيق yyyy/mm/dd أو dd/mm/yyyy');
console.log('2. إذا كانت السنة في الموضع الأول > 100، تعتبر yyyy/mm/dd');
console.log('3. إذا كانت السنة في الموضع الأول <= 100، تعتبر dd/mm/yyyy');
console.log('4. التاريخ "20/10/1447" سيتم تفسيره كـ dd/mm/yyyy (20=يوم، 10=شهر، 1447=سنة)');
console.log('5. النتيجة ستكون: "1447/10/20"');

// تحليل حالة "20/10/1447"
console.log('\n=== تحليل مفصل لـ "20/10/1447" ===');
const test = '20/10/1447';
const parts = test.split(/[\/\-\\]/).map(Number);
console.log('الأجزاء:', parts); // [20, 10, 1447]
console.log('a=', parts[0], 'a > 100?', parts[0] > 100); // 20 > 100 = false
console.log('سيتم اعتبار: y=c=1447, m=b=10, d=a=20');
console.log('النتيجة النهائية: "1447/10/20"');