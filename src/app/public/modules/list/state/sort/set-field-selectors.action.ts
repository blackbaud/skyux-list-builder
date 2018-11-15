import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common/state/sort/field-selector.model';

export class ListSortSetFieldSelectorsAction {
  constructor(public fieldSelectors: ListSortFieldSelectorModel[]) {}
}
