import {
  NgModule
} from '@angular/core';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyFilterModule
} from '@skyux/lists';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyListViewGridModule
} from '@skyux/list-builder-view-grids';

import {
  ListFiltersDocsModalComponent
} from './docs/list-filters/demo/list-filters-docs-modal.component';

import {
  SkyListFiltersModule,
  SkyListModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule
} from './public/public_api';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyCheckboxModule,
    SkyDocsToolsModule,
    SkyFilterModule,
    SkyIconModule,
    SkyModalModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyListViewGridModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-list-builder',
        packageName: '@skyux/list-builder'
      }
    }
  ],
  entryComponents: [
    ListFiltersDocsModalComponent
  ]
})
export class AppExtrasModule { }
