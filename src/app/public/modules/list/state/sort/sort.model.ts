import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';

import { ListSortLabelModel } from './label.model';

export class ListSortModel {
  /**
   * Specifies the list of available views to sort.
   */
  public available: Array<ListSortLabelModel> = [];
  /**
   * Specifies whether the sort applies to all list views.
   */
  public global: Array<ListSortLabelModel> = [];
  /**
   * Specifies the fields to sort.
   */
  public fieldSelectors: Array<ListSortFieldSelectorModel> = [];

  constructor(data?: any) {
    if (data) {
      this.available = data.available;
      this.global = data.global;
      this.fieldSelectors = data.fieldSelectors;
    }
  }
}
