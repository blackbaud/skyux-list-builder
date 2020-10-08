import {
  ListItemModel
} from '@skyux/list-builder-common';

export class ListFilterModel {
  /**
   * Specifies the name of the filter.
   */
  public name: string;
  /**
   * Specifies a label for the filter's summary item.
   * The label defaults to the value of the filter.
   */
  public label: string;
  /**
   * Indicates whether users can dismiss the filter's summary item.
   */
  public dismissible: boolean = true;
  /**
   * Specifies the current value of the filter.
   */
  public value: any;
  /**
   * Specifies the default value of the filter. When users do not set the
   * default value, the filter does not affect the list.
   */
  public defaultValue: any;

  /**
   * Specifies a function to determine whether items are filtered.
   * This property is required when using an in-memory data provider.
   * This property accepts a function of type `(item: ListItemModel, filter: any) => boolean`.
   */
  public filterFunction: (item: ListItemModel, filter: any) => boolean;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.label = data.label;
      this.filterFunction = data.filterFunction;
      this.value = data.value;
      this.dismissible = data.dismissible;
      this.defaultValue = data.defaultValue;
    }
  }
}
