import { by, element } from 'protractor';

import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

describe('list-secondary-actions component', () => {
  beforeEach(async () => {
    await SkyHostBrowser.get('visual/list-secondary-actions');
  });

  it('should display toolbar with secondary actions', async (done) => {
    await element(by.css('.sky-list-secondary-actions .sky-dropdown-button'));

    expect('#screenshot-list-secondary-actions').toMatchBaselineScreenshot(
      done,
      {
        screenshotName: 'list-secondary-actions',
      }
    );
  });
});
