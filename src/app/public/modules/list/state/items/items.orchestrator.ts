import {
  ListItemModel
} from '@skyux/list-builder-common';

import { ListStateOrchestrator } from '../list-state.rxstate';
import { AsyncList } from 'microedge-rxstate/dist';

import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './actions';
import { ListItemsSetSelectedItemsAction } from './set-items-selected.action';
import { ListItemsSetSelectedItemsTrueAction } from './set-items-selected-true.action';

export class ListItemsOrchestrator extends ListStateOrchestrator<AsyncList<ListItemModel>> {
  /* istanbul ignore next */
  constructor() {
    super();

    this
      .register(ListItemsSetLoadingAction, this.setLoading)
      .register(ListItemsLoadAction, this.load)
      .register(ListItemsSetSelectedItemsAction, this.setItemsSelected)
      .register(ListItemsSetSelectedItemsTrueAction, this.setItemsSelectedTrue);
  }

  private setLoading(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetLoadingAction): AsyncList<ListItemModel> {
    return new AsyncList<ListItemModel>(state.items, state.lastUpdate, action.loading, state.count);
  }

  private load(
    state: AsyncList<ListItemModel>,
    action: ListItemsLoadAction): AsyncList<ListItemModel> {
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

  private setItemsSelected(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetSelectedItemsAction): AsyncList<ListItemModel> {

    const newListItems = state.items.map(g => {
      const newSelectedValue = action.selected && action.items.indexOf(g.id) > -1;
      return new ListItemModel(g.id, g.data, newSelectedValue);
    });

    return new AsyncList<ListItemModel>(newListItems, state.lastUpdate, state.loading, state.count);
  }

  private setItemsSelectedTrue(
    state: AsyncList<ListItemModel>,
    action: ListItemsSetSelectedItemsTrueAction): AsyncList<ListItemModel> {

    const newListItems = state.items.map(listItemModel => {
      const isSelected = action.items.indexOf(listItemModel.id) > -1 ? true : false;
      return new ListItemModel(listItemModel.id, listItemModel.data, isSelected);
    });

    return new AsyncList<ListItemModel>(newListItems, state.lastUpdate, state.loading, state.count);
  }
}
