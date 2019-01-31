import {
  ListItemModel
} from '@skyux/list-builder-common';

import {
  AsyncList
} from 'microedge-rxstate/dist';

import {
  ListStateOrchestrator
} from '../list-state.rxstate';

import {
  ListItemsLoadAction,
  ListItemsSetLoadingAction,
  ListItemsSetSelectedItemsTrueAction
} from './actions';

export class ListItemsOrchestrator extends ListStateOrchestrator<AsyncList<ListItemModel>> {
  /* istanbul ignore next */
  constructor() {
    super();

    this
      .register(ListItemsSetLoadingAction, this.setLoading)
      .register(ListItemsLoadAction, this.load)
      .register(ListItemsSetSelectedItemsTrueAction, this.setItemsSelectedTrue);
  }

  private setLoading(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetLoadingAction
  ): AsyncList<ListItemModel> {
    return new AsyncList<ListItemModel>(state.items, state.lastUpdate, action.loading, state.count);
  }

  private load(
    state: AsyncList<ListItemModel>,
    action: ListItemsLoadAction
  ): AsyncList<ListItemModel> {
    const newListItems = action.items.map(g => new ListItemModel(g.id, g.data, g.isSelected));
    const resultItems = (action.refresh) ? [...newListItems] : [...state.items, ...newListItems];

    let count = action.count === undefined ? resultItems.length : action.count;
    return new AsyncList<ListItemModel>(
      resultItems,
      action.dataChanged ? Date.now() : state.lastUpdate,
      false,
      count
    );
  }

  private setItemsSelectedTrue(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetSelectedItemsTrueAction
  ): AsyncList<ListItemModel> {

    const newListItems = state.items.map(listItemModel => {
      const isSelected = action.items.indexOf(listItemModel.id) > -1 ? true : false;
      return new ListItemModel(listItemModel.id, listItemModel.data, isSelected);
    });

    return new AsyncList<ListItemModel>(newListItems, state.lastUpdate, state.loading, state.count);
  }
}
