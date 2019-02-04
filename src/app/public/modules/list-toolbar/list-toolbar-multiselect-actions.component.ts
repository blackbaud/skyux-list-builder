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

@Component({
  selector: 'sky-list-toolbar-multiselect-actions',
  templateUrl: './list-toolbar-multiselect-actions.component.html',
  styleUrls: ['./list-toolbar-multiselect-actions.component.scss']
})
export class SkyListToolbarMultiselectActionsComponent implements OnInit, OnDestroy {

  @Input()
  public showOnlySelected = false;

  private selectedIdMap = new Map<string, boolean>();

  private ngUnsubscribe = new Subject();

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngOnInit() {
    this.state.map(t => t.selected.item)
      .takeUntil(this.ngUnsubscribe)
      .distinctUntilChanged((x, y) => this.mapsEqual(x.selectedIdMap, y.selectedIdMap))
      .subscribe((model: ListSelectedModel) => {
        this.selectedIdMap = model.selectedIdMap;

        if (this.showOnlySelected) {
          this.reapplyFilter(true);
        }
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
        this.dispatcher.setSelected(items.map(item => item.id));
        if (this.showOnlySelected) {
          this.reapplyFilter(this.showOnlySelected);
        }
      });
  }

  public clearSelections() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.setSelected([]);
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

  private mapsEqual(mapA: Map<any, any>, mapB:  Map<any, any>): boolean {
      if (mapA.size !== mapB.size) {
          return false;
      }
      for (let key of Array.from( mapA.keys()) ) {
        let valueB = mapB.get(key);
        let valueA = mapA.get(key);
        if (valueB !== valueA || (valueB === undefined && !mapB.has(key))) {
            return false;
        }
    }
    return true;
  }

}
