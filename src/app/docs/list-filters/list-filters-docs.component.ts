import {
  Component,
  OnInit
} from '@angular/core';

import {
  ListItemModel
} from '@skyux/list-builder-common';

import {
  SkyModalCloseArgs,
  SkyModalService
} from '@skyux/modals';

import {
  of
} from 'rxjs';

import {
  ListFilterModel,
  ListItemsLoadAction,
  ListState,
  ListStateDispatcher
} from '../../public/public_api';

import {
  ListFiltersDocsModalContext
} from './demo/list-filters-docs-modal-context';

import {
  ListFiltersDocsModalComponent
} from './demo/list-filters-docs-modal.component';

const dispatcher = new ListStateDispatcher();

const state = new ListState(dispatcher);

@Component({
  selector: 'app-list-filters-docs',
  templateUrl: './list-filters-docs.component.html',
  providers: [
    {
      provide: ListState,
      useValue: state
    },
    {
      provide: ListStateDispatcher,
      useValue: dispatcher
    }
  ]
})
export class ListFiltersDocsComponent implements OnInit {

  public items = of([
    {
      id: 0,
      name: 'Orange',
      description: 'A round, orange fruit.',
      type: 'citrus',
      color: 'orange'
    },
    {
      id: 1,
      name: 'Mango',
      description: 'Delicious in smoothies, but don\'t eat the skin.',
      type: 'other',
      color: 'orange'
    },
    {
      id: 2,
      name: 'Lime',
      description: 'A sour, green fruit used in many drinks.',
      type: 'citrus',
      color: 'green'
    },
    {
      id: 3,
      name: 'Strawberry',
      description: 'A red fruit that goes well with shortcake.',
      type: 'berry',
      color: 'red'
    },
    {
      id: 4,
      name: 'Blueberry',
      description: 'A small, blue fruit often found in muffins.',
      type: 'berry',
      color: 'blue'
    }
  ]);

  public listFilters: ListFilterModel[] = [];

  public modalFilters: ListFilterModel[] = [];

  constructor(
    private modalService: SkyModalService
  ) { }

  public ngOnInit(): void {
    dispatcher.next(new ListItemsLoadAction([
      new ListItemModel('1', {}),
      new ListItemModel('2', {}),
      new ListItemModel('3', {}),
      new ListItemModel('4', {}),
      new ListItemModel('5', {}),
      new ListItemModel('6', {}),
      new ListItemModel('7', {})
    ], true));
  }

  public openFilterModal(): void {
    const instance = this.modalService.open(ListFiltersDocsModalComponent, [{
      provide: ListFiltersDocsModalContext,
      useValue: {
        appliedFilters: this.modalFilters
      }
    }]);

    instance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        this.listFilters = result.data.slice();
      }
    });
  }

}
