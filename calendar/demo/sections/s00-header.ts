import { ThemeManager } from '../utils/theme';

/**
 * Sticky documentation header — shared design across all framework demos.
 * Active framework button is determined by `activeFramework` param.
 */
export function renderHeader(containerId: string, activeFramework: 'vanilla' | 'angular-m' | 'angular-l' | 'nextjs' = 'vanilla'): void {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <div class="hdr-inner">

      <!-- Brand -->
      <a href="../../../index.html" class="hdr-brand" title="الصفحة الرئيسية">
        <span class="hdr-logo">🛡️ <em>Core</em>Components</span>
        <span class="hdr-sep">/</span>
        <span class="hdr-comp">التقويم الهجري</span>
      </a>

      <!-- Actions -->
      <div class="hdr-actions">
        <button class="icon-btn" id="theme-toggle-btn" title="تبديل الوضع الليلي / النهاري" aria-label="theme toggle">
          <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               style="display:none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        
      </div>

    </div>
  `;

  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function syncIcons(): void {
    const dark = ThemeManager.isDark();
    if (iconSun) iconSun.style.display = dark ? 'none' : '';
    if (iconMoon) iconMoon.style.display = dark ? '' : 'none';
  }

  syncIcons();
  toggleBtn?.addEventListener('click', () => {
    ThemeManager.toggle();
    syncIcons();
  });

  // Keep icons in sync if theme changes from elsewhere
  document.addEventListener('themeChanged', syncIcons);
}
