import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-state/state/sort/field-selector.model';

export class ListSortSetFieldSelectorsAction {
  constructor(public fieldSelectors: ListSortFieldSelectorModel[]) {}
}
