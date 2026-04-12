/**
 * CoreComponents — Hijri Calendar Documentation
 * Demo entry point — assembles all sections
 */

import { ThemeManager }        from './utils/theme';
import { initCodeFramework } from './utils/code-block';

import { renderHeader }       from './sections/s00-header';
import { renderSidebar }    from './sections/s00-sidebar';

import { renderHero }            from './sections/s01-hero';
import { renderGettingStarted }  from './sections/s02-getting-started';
import { renderToday }           from './sections/s03-today';
import { renderConversion }     from './sections/s04-conversion';
import { renderStringConversion }from './sections/s05-string-conv';
import { renderValidation }      from './sections/s06-validation';
import { renderMonthInfo }       from './sections/s07-month-info';
import { renderDayOfWeek }       from './sections/s08-day-of-week';
import { renderLeapYear }        from './sections/s09-leap-year';
import { renderJulian }         from './sections/s10-julian';
import { renderConstants }       from './sections/s11-constants';
import { renderWidget }         from './sections/s12-widget';
import { renderApiReference }   from './sections/s13-api-reference';
import { renderEventHandling }  from './sections/s14-event-handling';

// Init theme before any render to avoid flash
ThemeManager.init();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Layout
  renderHeader('doc-header', 'vanilla');

  // 2. All sections (always visible, user selects code framework via tabs)
  renderHero('s-hero');
  renderGettingStarted('s-getting-started');
  renderToday('s-today');
  renderConversion('s-conversion');
  renderStringConversion('s-string-conv');
  renderValidation('s-validation');
  renderMonthInfo('s-month-info');
  renderDayOfWeek('s-day-of-week');
  renderLeapYear('s-leap-year');
  renderJulian('s-julian');
  renderConstants('s-constants');
  renderWidget('s-widget');
  renderEventHandling('s-event-handling');
  renderApiReference('s-api-ref');

  // 3. Sidebar
  renderSidebar('doc-sidebar');

  // 4. Initialize code framework tabs (Vanilla/Angular/Legacy)
  initCodeFramework();
});