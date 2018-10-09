import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('list-secondary-actions component', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/list-secondary-actions');
  });

  it('should display toolbar with secondary actions', (done) => {
      element(by.css('.sky-list-secondary-actions .sky-dropdown-button'));

      expect('#screenshot-list-secondary-actions').toMatchBaselineScreenshot(done);
  });
});
