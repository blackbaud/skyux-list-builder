import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyListModule,
  SkyListFiltersModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule
} from '../app/public/modules';

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
    SkyListViewSwitcherModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
