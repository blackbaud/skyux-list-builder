import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-state/list/state/sort/field-selector.model';

export class ListSortSetFieldSelectorsAction {
  constructor(public fieldSelectors: ListSortFieldSelectorModel[]) {}
}
