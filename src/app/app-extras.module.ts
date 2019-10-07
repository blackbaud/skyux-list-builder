import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyListViewGridModule
} from '@skyux/list-builder-view-grids';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyListModule,
  SkyListFiltersModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule
} from '@skyux/list-builder';

import {
  SkyListViewSwitcherModule
} from './public';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyIconModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyListViewSwitcherModule,
    SkyListViewGridModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
