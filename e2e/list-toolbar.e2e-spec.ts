import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('list-toolbar component', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/list-toolbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should display toolbar correctly', (done) => {
    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar'
    });
  });

  it('should display toolbar correctly (xs screen)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-xs'
    });
  });

  it('should display toolbar with the column chooser', (done) => {
    element(
      by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button')
    ).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-column-chooser'
    });
  });

  it('should display toolbar with the column chooser (xs screen)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(
      by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button')
    ).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-column-chooser-xs'
    });
  });

  it('should display inline filters correctly when opened', (done) => {
    element(by.css('#screenshot-list-toolbar .sky-filter-btn')).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-inline-filters'
    });
  });

  it('should display inline filters correctly when opened (xs screen)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#screenshot-list-toolbar .sky-filter-btn')).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-inline-filters-xs'
    });
  });

  it('should display multiselect action bar', (done) => {
    expect('#screenshot-list-toolbar-with-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-multiselect'
    });
  });

  it('should display multiselect action bar (xs screen)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-list-toolbar-with-multiselect').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-toolbar-with-multiselect'
    });
  });
});
