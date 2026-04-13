import * as H from '../../src/hijri-calendar.lib';
import { codeBlock } from '../utils/code-block';

/**
 * Full interactive Hijri Calendar Widget section.
 * Renders its own calendar grid (no dependency on PremiumCalendar class).
 */
export function renderWidget(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
<section class="doc-section" id="sec-widget">
  <hr class="sec-divider">

  <div class="sec-head">
    <div class="sec-ico">🖱️</div>
    <div class="sec-meta">
      <h2 class="sec-title">التقويم التفاعلي</h2>
      <p class="sec-desc">مكوّن تقويم كامل مبني بالكامل من دوال المكتبة — اختر تاريخاً لتحويله</p>
    </div>
  </div>

  <div class="sec-body">

    <!-- New: Input with Dropdown (ه/م) -->
    <div class="card">
      <div class="card-hdr"><span class="card-hdr-title">حقل إدخال مع التقويم (input + dropdown)</span></div>
      <div class="card-body">
        <p style="font-size:.88rem; color:var(--txt2); margin-bottom:1rem; line-height:1.7;">
          دالة <code>createCalendarInput</code> تنشئ حقل إدخال مع قائمة منسدلة (هـ / م) وتقويم يظهر عند النقر. يرجع التاريخ الهجري والميلادي معاً.
        </p>
        
        <div class="demo-zone" style="margin-bottom:1rem;">
          <div id="input-calendar-demo" style="max-width:350px;"></div>
        </div>

        ${codeBlock(`<!-- HTML: حاوية فارغة للتقويم -->
<div id="my-calendar" style="max-width:350px;"></div>

<!-- JS/TS: إنشاء حقل التقويم -->
<script type="module">
import { createCalendarInput } from './hijri-calendar.lib';

const cal = createCalendarInput('my-calendar', {
  bindValue: 'hijri',        // القيمة المخزنة: 'hijri' أو 'gregorian'
  placeholder: 'اختر التاريخ',
  
  // حدث اختيار التاريخ - يرجع كائنين
  onDateSelect: (event) => {
    // event.hijri = { year: 1447, month: 10, day: 15, formatted: "1447/10/15" }
    // event.greg  = { year: 2025, month: 4, day: 13, formatted: "2025/04/13" }
    
    console.log('الهجري:', event.hijri.formatted);
    console.log('الميلادي:', event.greg.formatted);
  }
});

// الحصول على القيمة الحالية
const value = cal.getValue();

// تعيين قيمة برمجياً
cal.setValue('1448/01/01');

// حذف المكون عند الحاجة
cal.destroy();
</script>`, 'typescript', 'مثال كامل')}
      </div>
    </div>


</section>`;

  // ─── Init createCalendarInput demo ───────────────────────────────────────────
  try {
    H.createCalendarInput('input-calendar-demo', {
      bindValue: 'hijri',
      placeholder: 'اختر التاريخ',
      onDateSelect: (event) => {
        console.log('Date selected:', event);
        const el = document.getElementById('input-cal-result');
        if (el) {
          el.innerHTML = `
            <div style="font-size:.85rem; color:var(--txt); margin-top:.5rem;">
              <div>📅 هجري: <strong>${event.hijri.formatted}</strong></div>
              <div>📆 ميلادي: <strong>${event.greg.formatted}</strong></div>
            </div>
          `;
        }
      }
    });
  } catch (e) {
    console.error('Failed to create calendar input:', e);
  }

  // Add result display element
  const demoContainer = document.getElementById('input-calendar-demo');
  if (demoContainer) {
    const resultEl = document.createElement('div');
    resultEl.id = 'input-cal-result';
    resultEl.style.marginTop = '0.5rem';
    demoContainer.appendChild(resultEl);
  }


}
