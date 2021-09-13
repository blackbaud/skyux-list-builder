import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSecondaryActionsVisualComponent } from './visual/list-secondary-actions/list-secondary-actions-visual.component';
import { ListToolbarVisualComponent } from './visual/list-toolbar/list-toolbar-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent
  },
  {
    path: 'visual/list-secondary-actions',
    component: ListSecondaryActionsVisualComponent
  },
  {
    path: 'visual/list-toolbar',
    component: ListToolbarVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
