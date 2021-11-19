import { Component, forwardRef, OnInit } from '@angular/core';

import { ListItemModel } from '@skyux/list-builder-common';

import { map as observableMap } from 'rxjs/operators';

import {
  ListState,
  ListStateDispatcher,
  ListViewComponent,
} from 'projects/list-builder/src/public-api';

// Internal component only used to get at ListStateDispatcher.
@Component({
  selector: 'app-list-view-isselected-visual',
  templateUrl: './list-view-isselected-visual.component.html',
  providers: [
    /* tslint:disable-next-line */
    {
      provide: ListViewComponent,
      useExisting: forwardRef(() => ListViewIsSelectedTestComponent),
    },
  ],
})
export class ListViewIsSelectedTestComponent
  extends ListViewComponent
  implements OnInit
{
  public localItems: ListItemModel[];

  constructor(state: ListState, private dispatcher: ListStateDispatcher) {
    super(state, 'Test View');

    state.pipe(observableMap((s) => s.items)).subscribe((items) => {
      this.localItems = items.items;
    });
  }

  public ngOnInit(): void {
    this.dispatcher.toolbarShowMultiselectToolbar(true);
  }

  public setItemSelection(): void {
    const selectedItemIds = this.localItems
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    this.dispatcher.setSelected(selectedItemIds, true, true);
  }
}
