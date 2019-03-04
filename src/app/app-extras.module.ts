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
  SkyListModule,
  SkyListFiltersModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListViewSwitcherModule,
  SkyListToolbarModule
} from './public';

@NgModule({
  imports: [
    SkyIconModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListViewSwitcherModule,
    SkyListToolbarModule,
    SkyListModule,
    SkyListViewGridModule
  ],
  exports: [
    SkyIconModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListViewSwitcherModule,
    SkyListToolbarModule,
    SkyListModule,
    SkyListViewGridModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
