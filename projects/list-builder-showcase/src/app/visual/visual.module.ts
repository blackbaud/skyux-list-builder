import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualComponent } from './visual.component';
import { RouterModule } from '@angular/router';
import { SkyAlertModule, SkyIconModule } from '@skyux/indicators';
import { SkyAppLinkModule } from '@skyux/router';
import { SkyCheckboxModule, SkyRadioModule } from '@skyux/forms';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyFilterModule } from '@skyux/lists';
import { SkyIdModule } from '@skyux/core';
import { SkyModalModule } from '@skyux/modals';
import { SkyListViewGridModule } from '@skyux/list-builder-view-grids';
import { SkyListSecondaryActionsModule, SkyListToolbarModule, SkyListFiltersModule, SkyListModule, SkyListPagingModule } from 'projects/list-builder/src/public-api';
import { ListSecondaryActionsVisualComponent } from './list-secondary-actions/list-secondary-actions-visual.component';
import { ListToolbarVisualComponent } from './list-toolbar/list-toolbar-visual.component';
import { ListViewIsSelectedTestComponent } from './list-toolbar/list-view-isselected-visual.component';
import { ListViewTestComponent } from './list-toolbar/list-view-visual.component';

@NgModule({
  declarations: [
    ListSecondaryActionsVisualComponent,
    ListViewIsSelectedTestComponent,
    ListToolbarVisualComponent,
    ListViewTestComponent,
    VisualComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyAlertModule,
    SkyAppLinkModule,
    SkyCheckboxModule,
    SkyDropdownModule,
    SkyFilterModule,
    SkyIconModule,
    SkyIdModule,
    SkyModalModule,
    SkyListModule,
    SkyListFiltersModule,
    SkyListPagingModule,
    SkyListSecondaryActionsModule,
    SkyListToolbarModule,
    SkyListViewGridModule,
    SkyRadioModule
  ]
})
export class VisualModule { }
