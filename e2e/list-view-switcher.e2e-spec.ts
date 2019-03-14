import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';
import { element, by } from 'protractor';

describe('list view switcher component', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/list-view-switcher');
  });

  it('should match previous view switcher screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
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
    element.all(by.css('sky-radio')).get(1).click();
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher-switched'
    });
  });

  it('should match previous view switcher screenshot when switched (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-dropdown-button')).click();
    element.all(by.css('sky-dropdown-item button')).get(1).click();
    expect('#screenshot-list-view-switcher').toMatchBaselineScreenshot(done, {
      screenshotName: 'list-view-switcher-switched-xs'
    });
  });

});
