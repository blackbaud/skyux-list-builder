import { by, element } from 'protractor';

import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

describe('list-toolbar component', () => {
  beforeEach(async () => {
    await SkyHostBrowser.get('visual/list-toolbar');
    await SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should display toolbar correctly', async (done) => {
    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar',
    });
  });

  it('should display toolbar correctly (xs screen)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-xs',
    });
  });

  it('should display toolbar with the column chooser', async (done) => {
    await element(
      by.css(
        '#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button'
      )
    ).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-column-chooser',
    });
  });

  it('should display toolbar with the column chooser (xs screen)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(
      by.css(
        '#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button'
      )
    ).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-column-chooser-xs',
    });
  });

  it('should display inline filters correctly when opened', async (done) => {
    await element(by.css('#screenshot-list-toolbar .sky-filter-btn')).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-inline-filters',
    });
  });

  it('should display inline filters correctly when opened (xs screen)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('#screenshot-list-toolbar .sky-filter-btn')).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-inline-filters-xs',
    });
  });

  it('should display multiselect action bar', (done) => {
    expect(
      '#screenshot-list-toolbar-with-multiselect'
    ).toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-multiselect',
    });
  });

  it('should display multiselect action bar (xs screen)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect(
      '#screenshot-list-toolbar-with-multiselect'
    ).toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-multiselect',
    });
  });

  it('should display toolbar with type search', async (done) => {
    await SkyHostBrowser.scrollTo('#screenshot-list-toolbar-search');
    expect('#screenshot-list-toolbar-search').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-type-search',
    });
  });

  it('should display toolbar with type search (xs screen)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-list-toolbar-search');
    expect('#screenshot-list-toolbar-search').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-type-search-xs',
    });
  });
});
