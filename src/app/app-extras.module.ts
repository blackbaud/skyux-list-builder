import {
  NgModule
} from '@angular/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyListModule,
  SkyListFiltersModule,
  SkyListPagingModule,
  SkyListSecondaryActionsModule,
  SkyListToolbarModule
} from './public';

import {
  BrowserModule
} from '@angular/platform-browser';
import { ListFixturesModule } from './public/modules/list/fixtures/list-fixtures.module';

@NgModule({
  imports: [
    SkyIconModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    BrowserModule,
    ListFixturesModule
  ],
  exports: [
    SkyIconModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    ListFixturesModule
  ],
  providers: []
})
export class AppExtrasModule { }
