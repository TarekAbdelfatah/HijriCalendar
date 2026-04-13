/**
 * Documentation sidebar — sticky nav with scrollspy.
 */

export interface SidebarSection {
  id: string;
  icon: string;
  label: string;
  group: string;
}

const SECTIONS: SidebarSection[] = [
  { id: 'sec-hero',         icon: '🚀', label: 'مقدمة',            group: 'البداية' },
  { id: 'sec-start',        icon: '📦', label: 'التثبيت والاستيراد', group: 'البداية' },
  { id: 'sec-widget',       icon: '🖱️', label: 'التقويم التفاعلي',   group: 'المكون' },
  { id: 'sec-events',       icon: '📡', label: 'حدث اختيار التاريخ', group: 'المكون' },
  { id: 'sec-today',        icon: '📅', label: 'اليوم الحالي',       group: 'الدوال الأساسية' },
  { id: 'sec-conversion',   icon: '🔄', label: 'تحويل التواريخ',     group: 'الدوال الأساسية' },
  { id: 'sec-string-conv',  icon: '🔤', label: 'تحويل النصوص',       group: 'الدوال الأساسية' },
  { id: 'sec-validation',   icon: '✅', label: 'التحقق من الصحة',    group: 'الدوال الأساسية' },
  { id: 'sec-month-info',   icon: '🗓️', label: 'معلومات الشهر',      group: 'الدوال الأساسية' },
  { id: 'sec-day-of-week',  icon: '📆', label: 'يوم الأسبوع',        group: 'الدوال الأساسية' },
  { id: 'sec-leap-year',    icon: '🔢', label: 'السنة الكبيسة',      group: 'الدوال الأساسية' },
  { id: 'sec-julian',       icon: '🔬', label: 'Julian Day (JD)',    group: 'الدوال الأساسية' },
  { id: 'sec-constants',    icon: '📚', label: 'الثوابت والأنام',   group: 'المرجع' },
  { id: 'sec-api-ref',      icon: '📋', label: 'مرجع API كامل',      group: 'المرجع' },
];

export function renderSidebar(containerId: string): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  // Group sections
  const groups = new Map<string, SidebarSection[]>();
  for (const s of SECTIONS) {
    if (!groups.has(s.group)) groups.set(s.group, []);
    groups.get(s.group)!.push(s);
  }

  let html = '';
  for (const [group, items] of groups) {
    html += `<div class="sb-group">
      <span class="sb-group-lbl">${group}</span>
      <ul class="sb-list">`;
    for (const item of items) {
      html += `<li>
        <a class="sb-link" href="#${item.id}" data-target="${item.id}">
          <span class="sb-ico">${item.icon}</span>
          ${item.label}
        </a>
      </li>`;
    }
    html += `</ul></div>`;
  }
  el.innerHTML = html;

  // Click handler — smooth scroll
  el.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = (link as HTMLElement).dataset['target'];
      const section = document.getElementById(target!);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Scrollspy
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          el.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
          el.querySelector(`.sb-link[data-target="${id}"]`)?.classList.add('active');
        }
      }
    },
    { rootMargin: '-15% 0px -80% 0px', threshold: 0 }
  );

  // Observe all doc sections
  document.querySelectorAll('.doc-section[id]').forEach(sec => observer.observe(sec));
}
