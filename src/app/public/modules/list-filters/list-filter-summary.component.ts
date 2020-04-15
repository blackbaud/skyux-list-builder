import {take} from 'rxjs/operators';
import {
  Component,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  ListFilterModel
} from '../list/state';

import { Observable } from 'rxjs';

import {
  map as observableMap
} from 'rxjs/operators';

@Component({
  selector: 'sky-list-filter-summary',
  templateUrl: './list-filter-summary.component.html'
})
export class SkyListFilterSummaryComponent implements AfterContentInit {

  @Output()
  public summaryItemClick = new EventEmitter<ListFilterModel>();

  public appliedFilters: Observable<Array<ListFilterModel>>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterContentInit() {
    this.appliedFilters = this.state.pipe(observableMap((state) => {
      return state.filters;
    }));
  }

  public filterSummaryItemDismiss(index: number) {
    this.appliedFilters.pipe(take(1)).subscribe((filters) => {
      filters.splice(index, 1);
      this.dispatcher.filtersUpdate(filters.slice());
    });
  }

  public filterSummaryItemClick(item: ListFilterModel) {
    this.summaryItemClick.emit(item);
  }
}
