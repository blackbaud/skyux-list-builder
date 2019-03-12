import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyListViewSwitcherComponent
} from './list-view-switcher.component';

import {
  SkyListViewSwitcherCustomComponent
} from './list-view-switcher-custom.component';

import {
  SkyListModule
} from '../list/list.module';

@NgModule({
  declarations: [
    SkyListViewSwitcherComponent,
    SkyListViewSwitcherCustomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyDropdownModule,
    SkyIconModule,
    SkyListModule,
    SkyMediaQueryModule,
    SkyRadioModule
  ],
  exports: [
    SkyListViewSwitcherComponent,
    SkyListViewSwitcherCustomComponent
  ]
})
export class SkyListViewSwitcherModule { }
