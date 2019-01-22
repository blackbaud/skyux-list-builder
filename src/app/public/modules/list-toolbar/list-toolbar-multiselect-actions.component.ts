import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  AsyncItem
} from 'microedge-rxstate/dist';

import {
  SkyCheckboxChange
} from '@skyux/forms';

import {
  ListFilterModel
} from '@skyux/list-builder/modules/list/state';

import {
  ListItemModel
} from '@skyux/list-builder-common';

import {
  ListPagingSetPageNumberAction,
  ListSelectedModel,
  ListSelectedSetItemsSelectedAction,
  ListState,
  ListStateDispatcher
} from '../list/state';

@Component({
  selector: 'sky-list-toolbar-multiselect-actions',
  templateUrl: './list-toolbar-multiselect-actions.component.html',
  styleUrls: ['./list-toolbar-multiselect-actions.component.scss']
})
export class SkyListToolbarMultiselectActionsComponent implements OnInit, OnDestroy {

  @Input()
  public showOnlySelected: boolean = false;

  private selectedIdMap: Map<string, boolean> = new Map<string, boolean>();

  private ngUnsubscribe = new Subject();

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngOnInit() {
    this.state.map(t => t.selected)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((selectedItems: AsyncItem<ListSelectedModel>) => {
        this.selectedIdMap = selectedItems.item.selectedIdMap;
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public selectAll() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id), true, false));
        if (this.showOnlySelected) {
          this.reapplyFilter(this.showOnlySelected);
        }
      });
  }

  public clearSelections() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id), false, false));
        if (this.showOnlySelected) {
          this.reapplyFilter(this.showOnlySelected);
        }
      });
  }

  public changeVisibleItems(change: SkyCheckboxChange) {
    this.showOnlySelected = change.checked;
    this.reapplyFilter(change.checked);
  }

  private reapplyFilter(isSelected: boolean) {
    let self = this;

    this.state.map(state => state.filters)
      .take(1)
      .subscribe((filters: ListFilterModel[]) => {
        filters = filters.filter(filter => filter.name !== 'show-selected');
        filters.push(self.getShowSelectedFilter(isSelected));
        this.dispatcher.filtersUpdate(filters);
      });

    // If "show selected" is checked and paging is enabled, go to page one.
    if (isSelected) {
      this.state
        .take(1)
        .subscribe((currentState) => {
          if (currentState.paging.pageNumber && currentState.paging.pageNumber !== 1) {
            this.dispatcher.next(
              new ListPagingSetPageNumberAction(Number(1))
            );
          }
      });
    }
    this.dispatcher.toolbarSetDisabled(isSelected);
  }

  private getShowSelectedFilter(isSelected: boolean) {
    return new ListFilterModel({
      name: 'show-selected',
      value: isSelected.toString(),
      filterFunction: (model: ListItemModel, showOnlySelected: boolean) => {
        if (showOnlySelected.toString() !== false.toString()) {
          return this.selectedIdMap.get(model.id);
        }
      },
      defaultValue: false.toString()
    });
  }

}
