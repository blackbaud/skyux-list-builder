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
  SkyListFiltersModule,
  SkyListModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule }
from '@skyux/list-builder';

import {
  SkyListViewSwitcherModule
} from './public';

@NgModule({
  imports: [
    SkyIconModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyListViewSwitcherModule,
    SkyListViewGridModule
  ],
  exports: [
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
