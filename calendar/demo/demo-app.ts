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
import { renderWidget }         from './sections/s12-widget';
import { renderEventHandling }  from './sections/s14-event-handling';
import { renderToday }           from './sections/s03-today';
import { renderConversion }     from './sections/s04-conversion';
import { renderStringConversion }from './sections/s05-string-conv';
import { renderValidation }      from './sections/s06-validation';
import { renderMonthInfo }       from './sections/s07-month-info';
import { renderDayOfWeek }       from './sections/s08-day-of-week';
import { renderLeapYear }        from './sections/s09-leap-year';
import { renderJulian }         from './sections/s10-julian';
import { renderConstants }       from './sections/s11-constants';
import { renderApiReference }   from './sections/s13-api-reference';
import { renderAngularSection } from './sections/s15-angular';
import { renderLegacySection }  from './sections/s16-legacy';

// Init theme before any render to avoid flash
ThemeManager.init();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Layout
  renderHeader('doc-header', 'vanilla');

  // 2. All sections (always visible, user selects code framework via tabs)
  renderHero('s-hero');
  renderGettingStarted('s-getting-started');
  renderWidget('s-widget');
  renderEventHandling('s-event-handling');
  renderToday('s-today');
  renderConversion('s-conversion');
  renderStringConversion('s-string-conv');
  renderValidation('s-validation');
  renderMonthInfo('s-month-info');
  renderDayOfWeek('s-day-of-week');
  renderLeapYear('s-leap-year');
  renderJulian('s-julian');
  renderConstants('s-constants');
  renderApiReference('s-api-ref');
  renderAngularSection('s-angular');
  renderLegacySection('s-legacy');

  // 3. Sidebar
  renderSidebar('doc-sidebar');

  // 4. Initialize code framework tabs (Vanilla/Angular/Legacy)
  initCodeFramework();
});