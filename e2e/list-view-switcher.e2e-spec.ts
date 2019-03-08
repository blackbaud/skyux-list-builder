import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('list view switcher component', () => {

  it('should match previous view switcher screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher'
    });
  });

  it('should match previous view switcher screenshot (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher-xs'
    });
  });

  it('should match previous view switcher screenshot when switched', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#sky-radio-sky-radio-2-input')).click();
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher-switched'
    });
  });

  it('should match previous view switcher screenshot when switched (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#sky-radio-sky-radio-2-input')).click();
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher-switched-xs'
    });
  });

});
