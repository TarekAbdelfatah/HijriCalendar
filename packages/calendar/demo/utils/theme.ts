/**
 * Theme Manager — Light / Dark mode
 * Shared by all CoreComponents demo pages
 */
export class ThemeManager {
  private static readonly KEY = 'cc-theme';

  /** Call once on page load (before body renders to avoid flash) */
  static init(): void {
    const saved = localStorage.getItem(ThemeManager.KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    ThemeManager.apply(isDark);
  }

  /** Toggle between light and dark */
  static toggle(): void {
    const isDark = !document.documentElement.classList.contains('dark');
    ThemeManager.apply(isDark);
    localStorage.setItem(ThemeManager.KEY, isDark ? 'dark' : 'light');
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: isDark ? 'dark' : 'light' } }));
  }

  static isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  private static apply(isDark: boolean): void {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
