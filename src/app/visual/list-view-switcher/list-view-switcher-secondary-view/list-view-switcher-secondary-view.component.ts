import {
  Component,
  forwardRef
} from '@angular/core';

 import {
  ListItemModel
} from '@skyux/list-builder-common';

import {
  ListViewComponent
} from '../../../public';

import {
  ListState
} from '../../../public/modules/list/state';

 // Internal component only used to get at ListStateDispatcher.
@Component({
  selector: 'sky-list-view-switcher-secondary-view',
  templateUrl: './list-view-switcher-secondary-view.component.html',
  providers: [
    /* tslint:disable-next-line */
    { provide: ListViewComponent, useExisting: forwardRef(() => ListViewTestComponent) },
  ]
})
export class ListViewTestComponent extends ListViewComponent {

   public localItems: ListItemModel[];

   constructor(
    state: ListState
  ) {
    super(state, 'List View Switcher Secondary View');
  }
 }
