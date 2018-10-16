import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListComponent } from './list.component';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListSecondaryActionsModule } from '../list-secondary-actions';
import { SkyListFiltersModule } from '../list-filters';

@NgModule({
  declarations: [
    SkyListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListComponent,
    SkyListToolbarModule,
    SkyListSecondaryActionsModule,
    SkyListFiltersModule
  ]
})
export class SkyListModule {
}
