import {
  combineLatest as observableCombineLatest,
  Observable,
  of as observableOf,
  Subject
} from 'rxjs';

import {
  distinctUntilChanged,
  flatMap,
  map as observableMap,
  skip,
  take,
  takeUntil
} from 'rxjs/operators';

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges
} from '@angular/core';

import {
  ListItemsLoadAction,
  ListItemsSetLoadingAction
} from './state/items/actions';

import {
  ListSelectedLoadAction,
  ListSelectedSetLoadingAction
} from './state/selected/actions';

import {
  ListSelectedModel
} from './state/selected/selected.model';

import {
  ListSortModel
} from './state/sort/sort.model';

import {
  ListSortSetFieldSelectorsAction
} from './state/sort/actions';

import {
  ListFilterModel
} from './state/filters/filter.model';

import {
  getValue, AsyncItem
} from '@skyux/list-builder-common';

import {
  ListDataRequestModel
} from './list-data-request.model';

import {
  ListDataResponseModel
} from './list-data-response.model';

import {
  ListDataProvider
} from './list-data.provider';

import {
  SkyListInMemoryDataProvider
} from '../list-data-provider-in-memory/list-data-in-memory.provider';

import {
  ListState,
  ListStateDispatcher
} from './state';

import {
  isObservable,
  ListItemModel,
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';

import {
  ListViewComponent
} from './list-view.component';

import {
  ListSearchModel
} from './state/search/search.model';

import {
  ListViewsLoadAction,
  ListViewsSetActiveAction
} from './state/views/actions';

import {
  ListViewModel
} from './state/views/view.model';

let idIndex = 0;

@Component({
  selector: 'sky-list',
  template: '<ng-content></ng-content>',
  providers: [ListState, ListStateDispatcher],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListComponent implements AfterContentInit, OnChanges, OnDestroy {
  public id: string = `sky-list-cmp-${++idIndex}`;
  @Input()
  public data?: Array<any> | Observable<Array<any>> = [];

  @Input()
  public dataProvider?: ListDataProvider;

  @Input()
  public defaultView?: ListViewComponent;

  @Input()
  public initialTotal?: number;

  @Input()
  public selectedIds?: Array<string> | Observable<Array<string>>;

  @Input()
  public sortFields?: ListSortFieldSelectorModel |
    Array<ListSortFieldSelectorModel> |
    Observable<Array<ListSortFieldSelectorModel>> |
    Observable<ListSortFieldSelectorModel>;

  @Input()
  public appliedFilters: Array<ListFilterModel> = [];

  @Output()
  public selectedIdsChange = new EventEmitter<Map<string, boolean>>();

  @Output()
  public appliedFiltersChange = new EventEmitter<Array<ListFilterModel>>();

  /* tslint:disable */
  @Input('search')
  private searchFunction: (data: any, searchText: string) => boolean;
  /* tslint:enable */

  private dataFirstLoad: boolean = false;

  @ContentChildren(ListViewComponent)
  private listViews: QueryList<ListViewComponent>;

  private lastSelectedIds: string[] = [];

  private lastFilters: ListFilterModel[] = [];

  private ngUnsubscribe = new Subject();

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) { }

  public ngAfterContentInit(): void {
    if (this.data && this.dataProvider && this.initialTotal) {
      this.dataFirstLoad = true;
    }

    if (this.listViews.length > 0) {
      let defaultView: ListViewComponent =
        (this.defaultView === undefined) ? this.listViews.first : this.defaultView;

      this.dispatcher.next(
        new ListViewsLoadAction(this.listViews.map(v => new ListViewModel(v.id, v.label)))
      );

      // activate the default view
      this.dispatcher.next(new ListViewsSetActiveAction(defaultView.id));
    } else {
      return;
    }

    // set sort fields
    getValue(this.sortFields,
      (sortFields: ListSortFieldSelectorModel[] | ListSortFieldSelectorModel) => {
        let sortArray: ListSortFieldSelectorModel[];
        if (!Array.isArray(sortFields) && sortFields) {
          sortArray = [sortFields];
        } else {
          sortArray = sortFields as ListSortFieldSelectorModel[];
        }
        this.dispatcher.next(new ListSortSetFieldSelectorsAction(sortArray || []));
      });

    this.displayedItems.subscribe(result => {
      this.dispatcher.next(new ListItemsSetLoadingAction());
      this.dispatcher.next(new ListItemsLoadAction(result.items, true, true, result.count));
    });

    // Watch for selection changes.
    this.state.pipe(
      observableMap(current => current.selected),
      takeUntil(this.ngUnsubscribe),
      distinctUntilChanged()
    )
      .subscribe(selected => {

        // Update lastSelectedIds to help us retain user selections.
        let selectedIdsList: string[] = [];
        selected.item.selectedIdMap.forEach((value, key) => {
          if (value === true) {
            selectedIdsList.push(key);
          }
        });

        // If changes are distinct, emit selectedIdsChange.
        const distinctChanges = !this.arraysEqual(this.lastSelectedIds, selectedIdsList);
        if (this.selectedIdsChange.observers.length > 0 && distinctChanges) {
          this.selectedIdsChange.emit(selected.item.selectedIdMap);
        }

        this.lastSelectedIds = selectedIdsList;
      });

    if (this.appliedFiltersChange.observers.length > 0) {
      this.state.pipe(
        observableMap(current => current.filters),
        takeUntil(this.ngUnsubscribe),
        skip(1)
      )
        .subscribe((filters) => {
          /**
           * We are doing this instead of a distinctUntilChange due to memory allocation issues
           * with the javascript array. To fix fully the array should be changed to an object in
           * a breaking change.
           */
          if (!this.arraysEqual(filters, this.lastFilters)) {
            this.lastFilters = filters.slice(0);
            this.appliedFiltersChange.emit(filters);
          }
        });
    }

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['appliedFilters'] &&
      changes['appliedFilters'].currentValue !== changes['appliedFilters'].previousValue) {
      this.dispatcher.filtersUpdate(this.appliedFilters);
    }
    if (changes['selectedIds']) {
      // Only send selection changes to dispatcher if changes are distinct.
      const newSelectedIds = changes['selectedIds'].currentValue;
      if (!this.arraysEqual(newSelectedIds, this.lastSelectedIds)) {
        this.dispatcher.setSelected(newSelectedIds, true, true);
      }
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public refreshDisplayedItems(): void {
    this.displayedItems.pipe(
      take(1)
    ).subscribe((result) => {
      this.dispatcher.next(new ListItemsSetLoadingAction());
      this.dispatcher.next(new ListItemsLoadAction(result.items, true, true, result.count));
    });
  }

  get displayedItems(): Observable<ListDataResponseModel> {
    if (!this.data && !this.dataProvider) {
      throw new Error('List requires data or dataProvider to be set.');
    }

    let data: any = this.data;
    if (!isObservable(data)) {
      data = observableOf(this.data);
    }

    if (!this.dataProvider) {
      this.dataProvider = new SkyListInMemoryDataProvider(data, this.searchFunction);
    }

    let selectedIds = this.selectedIds || observableOf([]);
    if (!isObservable(selectedIds)) {
      selectedIds = observableOf(selectedIds);
    }

    let selectedChanged: boolean = false;

    // This subject is used to cancel previous request to the list's data provider when a new change
    // to the list's state occurs. In a future breaking change this should be replaced or coupled
    // with adding a debounce time to the Observable which watches for state changes.
    let cancelLastRequest = new Subject();

    return observableCombineLatest([
      this.state.pipe(observableMap(s => s.filters), distinctUntilChanged()),
      this.state.pipe(observableMap(s => s.search), distinctUntilChanged()),
      this.state.pipe(observableMap(s => s.sort.fieldSelectors), distinctUntilChanged()),
      this.state.pipe(observableMap(s => s.paging.itemsPerPage), distinctUntilChanged()),
      this.state.pipe(observableMap(s => s.paging.pageNumber), distinctUntilChanged()),
      this.state.pipe(observableMap(s => s.toolbar.disabled), distinctUntilChanged()),
      selectedIds.pipe(
        distinctUntilChanged(),
        observableMap(selected => {
          selectedChanged = true;
          return selected;
        })
      ),
      data.pipe(distinctUntilChanged())
    ], (
      filters: ListFilterModel[],
      search: ListSearchModel,
      sortFieldSelectors: Array<ListSortFieldSelectorModel>,
      itemsPerPage: number,
      pageNumber: number,
      isToolbarDisabled: boolean,
      selected: Array<string>,
      itemsData: Array<any>
    ) => {
      cancelLastRequest.next();
      cancelLastRequest.complete();
      if (selectedChanged) {
        this.dispatcher.next(new ListSelectedSetLoadingAction());
        this.dispatcher.next(new ListSelectedLoadAction(selected));
        this.dispatcher.next(new ListSelectedSetLoadingAction(false));
        selectedChanged = false;
      }

      let response: Observable<ListDataResponseModel>;
      if (this.dataFirstLoad) {
        this.dataFirstLoad = false;
        let initialItems = itemsData.map(d => new ListItemModel(
          d.id || `sky-list-item-model-${++idIndex}`, d
        ));
        response = observableOf(new ListDataResponseModel({
          count: this.initialTotal,
          items: initialItems
        })).pipe(
          takeUntil(cancelLastRequest)
        );
      } else {
        response = this.dataProvider.get(new ListDataRequestModel({
          filters: filters,
          pageSize: itemsPerPage,
          pageNumber: pageNumber,
          search: search,
          sort: new ListSortModel({ fieldSelectors: sortFieldSelectors }),
          isToolbarDisabled: isToolbarDisabled
        })).pipe(
          takeUntil(cancelLastRequest)
        );
      }

      return response;
    })
      .pipe(
        takeUntil(this.ngUnsubscribe),

        // Retain user selections from previous state.
        // This is only necessary for grids component (based on item.isSelected).
        observableMap(response => {
          return response.pipe(observableMap(listDataResponseModel => {
            return new ListDataResponseModel({
              count: listDataResponseModel.count,
              items: this.getItemsAndRetainSelections(listDataResponseModel.items, this.lastSelectedIds)
            });
          }));
        }),
        flatMap(value => value)
      );
  }

  public get selectedItems(): Observable<Array<ListItemModel>> {
    return observableCombineLatest(
      this.state.pipe(observableMap(current => current.items.items), distinctUntilChanged()),
      this.state.pipe(observableMap(current => current.selected), distinctUntilChanged()),
      (items: Array<ListItemModel>, selected: AsyncItem<ListSelectedModel>) => {
        return items.filter(i => selected.item.selectedIdMap.get(i.id));
      }
    ).pipe(takeUntil(this.ngUnsubscribe));
  }

  public get lastUpdate(): Observable<Date> {
    return this.state
      .pipe(
        takeUntil(this.ngUnsubscribe),
        observableMap(s =>
          s.items.lastUpdate ? new Date(s.items.lastUpdate) : undefined
        )
      );
  }

  public get views(): Array<ListViewComponent> {
    return this.listViews.toArray();
  }

  public get itemCount(): Observable<number> {
    return this.dataProvider.count();
  }

  private getItemsAndRetainSelections(newList: ListItemModel[], selectedIds: string[]): ListItemModel[] {
    let updatedListModel = newList.slice();
    updatedListModel.forEach(item => {
      item.isSelected = selectedIds.indexOf(item.id) > -1 ? true : false;
    });
    return updatedListModel;
  }

  private arraysEqual(arrayA: any[], arrayB: any[]): boolean {
    /* istanbul ignore next */
    if (arrayA === arrayB) {
      return true;
    }
    if (arrayA === undefined || arrayB === undefined) {
      return false;
    }
    if (arrayA.length !== arrayB.length) {
      return false;
    }
    for (let i = 0; i < arrayA.length; ++i) {
      if (arrayA[i] !== arrayB[i]) {
        return false;
      }
    }
    return true;
  }
}
