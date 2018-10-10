import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('list-toolbar component', () => {

  function validateScreenshot(done: DoneFn) {
    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done);
  }

  beforeEach(() => {
    SkyHostBrowser.get('visual/list-toolbar');
  });

  it('should display toolbar with the column chooser', (done) => {
    element(
      by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button')
    ).click();

    expect('#screenshot-list-toolbar').toMatchBaselineScreenshot(done);
  });

  it('should display inline filters correctly when opened', (done) => {
    element(by.css('#screenshot-list-toolbar .sky-filter-btn')).click();

    validateScreenshot(done);
  });

  it('should display toolbar correctly when a small screen', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');

    element(
      by.css('#screenshot-list-toolbar .sky-list-secondary-actions .sky-dropdown-button')
    ).click();

    validateScreenshot(done);
  });
});
