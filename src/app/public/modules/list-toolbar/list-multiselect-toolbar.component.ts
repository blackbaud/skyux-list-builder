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
  ListState,
  ListStateDispatcher
} from '../list/state';

let uniqueId = 0;

@Component({
  selector: 'sky-list-multiselect-toolbar',
  templateUrl: './list-multiselect-toolbar.component.html',
  styleUrls: ['./list-multiselect-toolbar.component.scss']
})
export class SkyListMultiselectToolbarComponent implements OnInit, OnDestroy {

  @Input()
  public showOnlySelected = false;

  public multiselectToolbarId = `sky-list-multiselect-toolbar-${uniqueId++}`;

  private selectedIdMap = new Map<string, boolean>();

  private ngUnsubscribe = new Subject();

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngOnInit(): void {
    this.state.map(t => t.selected.item)
      .takeUntil(this.ngUnsubscribe)
      .distinctUntilChanged()
      .subscribe((model: ListSelectedModel) => {
        this.selectedIdMap = model.selectedIdMap;

        if (this.showOnlySelected) {
          this.reapplyFilter(true);
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public selectAll(): void {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.setSelected(items.map(item => item.id));
        if (this.showOnlySelected) {
          this.reapplyFilter(this.showOnlySelected);
        }
      });
  }

  public clearSelections(): void {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.setSelected([]);
        if (this.showOnlySelected) {
          this.reapplyFilter(this.showOnlySelected);
        }
      });
  }

  public changeVisibleItems(change: SkyCheckboxChange): void {
    this.showOnlySelected = change.checked;
    this.reapplyFilter(change.checked);
  }

  private reapplyFilter(isSelected: boolean): void {
    let self = this;

    this.state.map(state => state.filters)
      .take(1)
      .subscribe((filters: ListFilterModel[]) => {
        filters = filters.filter(filter => filter.name !== 'show-selected');
        filters.push(self.getShowSelectedFilter(isSelected));
        this.dispatcher.filtersUpdate(filters);
      });

    // If "show selected" is checked and paging is enabled, go to page one.
    /* istanbul ignore else */
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

  private getShowSelectedFilter(isSelected: boolean): ListFilterModel {
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
