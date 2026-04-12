/**
 * Complete API reference table — all exports from hijri-calendar.lib
 */

interface ApiEntry {
  name: string;
  kind: 'fn' | 'const' | 'type';
  signature: string;
  returns: string;
  description: string;
}

const API: ApiEntry[] = [
  // Today
  { kind:'fn', name:'todayHijri', signature:'(): HijriDateObj', returns:'HijriDateObj', description:'التاريخ الهجري لليوم (أم القرى)' },
  { kind:'fn', name:'todayGregorian', signature:'(): GregDateObj', returns:'GregDateObj', description:'التاريخ الميلادي لليوم' },

  // Core conversion
  { kind:'fn', name:'gregorianToHijri', signature:'(year, month, day): HijriDateObj', returns:'HijriDateObj', description:'تحويل تاريخ ميلادي (أعداد صحيحة) إلى هجري' },
  { kind:'fn', name:'hijriToGregorian', signature:'(year, month, day): GregDateObj', returns:'GregDateObj', description:'تحويل تاريخ هجري (أعداد صحيحة) إلى ميلادي' },
  { kind:'fn', name:'gregorianToHijriStr', signature:'(gregStr: string): string', returns:'string', description:'تحويل نص ميلادي إلى هجري — يقبل yyyy/mm/dd أو dd/mm/yyyy' },
  { kind:'fn', name:'hijriToGregorianStr', signature:'(hijriStr: string): string', returns:'string', description:'تحويل نص هجري إلى ميلادي — يقبل صيغ متعددة' },

  // Validation
  { kind:'fn', name:'hijriIsValid', signature:'(year, month, day): boolean', returns:'boolean', description:'تحقق من صحة تاريخ هجري (النطاق + عدد الأيام الحقيقي)' },

  // Month info
  { kind:'fn', name:'hijriDaysInMonth', signature:'(year, month): number', returns:'number', description:'عدد أيام شهر هجري بناءً على جدول أم القرى' },
  { kind:'fn', name:'gregDaysInMonth', signature:'(year, month): number', returns:'number', description:'عدد أيام شهر ميلادي (يحسب السنوات الكبيسة)' },

  // Day of week
  { kind:'fn', name:'hijriDayOfWeek', signature:'(year, month, day): number', returns:'0–6', description:'يوم الأسبوع لتاريخ هجري (0=أحد … 6=سبت)' },
  { kind:'fn', name:'gregDayOfWeek', signature:'(year, month, day): number', returns:'0–6', description:'يوم الأسبوع لتاريخ ميلادي (0=أحد … 6=سبت)' },
  { kind:'fn', name:'dayOfWeekForJD', signature:'(jd: number): number', returns:'0–6', description:'يوم الأسبوع من رقم Julian Day' },

  // Leap year
  { kind:'fn', name:'gregIsLeapYear', signature:'(year): boolean', returns:'boolean', description:'هل السنة الميلادية كبيسة؟ (Gregorian calendar rule)' },

  // Julian Day
  { kind:'fn', name:'hijriToJD', signature:'(year, month, day): number', returns:'number', description:'تحويل تاريخ هجري إلى رقم Julian Day (JD)' },
  { kind:'fn', name:'jdToHijri', signature:'(jd: number): {year, month, day}', returns:'object', description:'تحويل رقم Julian Day إلى تاريخ هجري' },

  // Utility
  { kind:'fn', name:'pad2', signature:'(n: number): string', returns:'string', description:'تنسيق رقم بصفر بادئ (1 → "01")' },

  // Constants
  { kind:'const', name:'HIJRI_MONTH_NAMES', signature:'string[12]', returns:'string[]', description:'أسماء الأشهر الهجرية بالعربية (المحرم … ذو الحجة)' },
  { kind:'const', name:'HIJRI_MONTH_NAMES_EN', signature:'string[12]', returns:'string[]', description:'أسماء الأشهر الهجرية بالإنجليزية' },
  { kind:'const', name:'DAY_NAMES_AR', signature:'string[7]', returns:'string[]', description:'أسماء أيام الأسبوع الكاملة (الأحد … السبت)' },
  { kind:'const', name:'DAY_NAMES_SHORT_AR', signature:'string[7]', returns:'string[]', description:'أسماء أيام الأسبوع المختصرة (أحد … سبت)' },
  { kind:'const', name:'GREG_MONTH_NAMES_AR', signature:'string[12]', returns:'string[]', description:'أسماء الأشهر الميلادية بالعربية (يناير … ديسمبر)' },

  // Types
  { kind:'type', name:'HijriDateObj', signature:'{ year, month, day, formatted }', returns:'interface', description:'كائن نتيجة التاريخ الهجري' },
  { kind:'type', name:'GregDateObj', signature:'{ year, month, day, formatted }', returns:'interface', description:'كائن نتيجة التاريخ الميلادي' },
  { kind:'type', name:'DateFormat', signature:"'yyyy/mm/dd' | 'dd/mm/yyyy' | …", returns:'type', description:'صيغ التاريخ المدعومة' },
  { kind:'type', name:'DateRange', signature:'{ hijri: string; greg: string }', returns:'interface', description:'نطاق تاريخ' },
  { kind:'type', name:'ValidationResult', signature:'{ isValid: boolean; errorMessage? }', returns:'interface', description:'نتيجة التحقق من تاريخ' },

  // UI Components
  { kind:'type', name:'CalendarInputOptions', signature:'{ bindValue, placeholder, ... }', returns:'interface', description:'خيارات حقل التقويم' },
  { kind:'type', name:'CalendarInputEvent', signature:'{ hijri, greg, formatted, displayMode }', returns:'interface', description:'حدث اختيار التاريخ' },
  { kind:'type', name:'HijriGregDate', signature:'{ hijri: HijriDateObj; greg: GregDateObj }', returns:'interface', description:'كائن يحتوي التاريخين' },
  { kind:'fn', name:'createCalendarInput', signature:'(container, options): {...}', returns:'object', description:'إنشاء حقل تقويم تفاعلي' },
];

const BADGE: Record<string, string> = {
  fn:    'badge-fn',
  const: 'badge-const',
  type:  'badge-type',
};
const KIND_LABEL: Record<string, string> = { fn: 'fn', const: 'const', type: 'type' };

export function renderApiReference(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  const rows = API.map(a => `
    <tr>
      <td>${a.name}</td>
      <td><span class="badge ${BADGE[a.kind]}">${KIND_LABEL[a.kind]}</span></td>
      <td><code>${escHtml(a.signature)}</code></td>
      <td><code>${escHtml(a.returns)}</code></td>
      <td>${a.description}</td>
    </tr>
  `).join('');

  el.innerHTML = `
<section class="doc-section" id="sec-api-ref">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">📋</div>
    <div class="sec-meta">
      <h2 class="sec-title">مرجع API الكامل</h2>
      <p class="sec-desc">جميع الدوال والثوابت والأنواع المُصدَّرة من المكتبة</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- Filter -->
    <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:.75rem; align-items:center;">
      <input class="inp" type="search" id="api-search" placeholder="بحث في الدوال والأنواع…"
        style="max-width:300px; font-size:.85rem;" dir="rtl">
      <div style="display:flex; gap:.35rem;">
        <button class="test-btn active" data-filter="all"  id="filter-all">الكل (${API.length})</button>
        <button class="test-btn" data-filter="fn"    id="filter-fn">دوال (${API.filter(a=>a.kind==='fn').length})</button>
        <button class="test-btn" data-filter="const" id="filter-const">ثوابت (${API.filter(a=>a.kind==='const').length})</button>
        <button class="test-btn" data-filter="type"  id="filter-type">أنواع (${API.filter(a=>a.kind==='type').length})</button>
      </div>
    </div>

    <div class="api-tbl-wrap">
      <table class="api-tbl" id="api-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>النوع</th>
            <th>التوقيع</th>
            <th>يُرجع</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody id="api-tbody">${rows}</tbody>
      </table>
    </div>

    <p style="margin-top:.75rem; font-size:.78rem; color:var(--txt3); text-align:center;">
      ${API.length} عنصر مُصدَّر · النطاق: 1276–1500 هـ (1859–2077 م) · Zero Dependencies
    </p>

  </div>
</section>`;

  // Filter + search
  const searchEl = document.getElementById('api-search') as HTMLInputElement;
  const tbody = document.getElementById('api-tbody')!;
  let activeFilter = 'all';

  function applyFilter(): void {
    const query = searchEl.value.trim().toLowerCase();
    const filtered = API.filter(a => {
      const matchKind = activeFilter === 'all' || a.kind === activeFilter;
      const matchQuery = !query ||
        a.name.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.signature.toLowerCase().includes(query);
      return matchKind && matchQuery;
    });

    tbody.innerHTML = filtered.map(a => `
      <tr>
        <td>${a.name}</td>
        <td><span class="badge ${BADGE[a.kind]}">${KIND_LABEL[a.kind]}</span></td>
        <td><code>${escHtml(a.signature)}</code></td>
        <td><code>${escHtml(a.returns)}</code></td>
        <td>${a.description}</td>
      </tr>
    `).join('');
  }

  searchEl.addEventListener('input', applyFilter);

  ['all', 'fn', 'const', 'type'].forEach(f => {
    document.getElementById(`filter-${f}`)?.addEventListener('click', () => {
      activeFilter = f;
      // Visual active state
      ['all','fn','const','type'].forEach(x => {
        document.getElementById(`filter-${x}`)?.classList.remove('active');
      });
      document.getElementById(`filter-${f}`)?.classList.add('active');
      applyFilter();
    });
  });
}

function escHtml(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
