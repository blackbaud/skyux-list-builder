export class ListSortLabelModel {
  /**
   * Specifies the text for the label.
   */
  public text: string;
  /**
   * Specifies the label type.
   */
  public fieldType: string;
  /**
   * Specifies the fields to sort.
   */
  public fieldSelector: string;
  /**
   * Indicates whether to sort all fields.
   * @required
   */
  public global: boolean = false;
  /**
   * Indicates whether to sort in descending order.
   * @default
   */
  public descending: boolean = false;

  constructor(data?: any) {
    if (data) {
      this.text = data.text;
      this.fieldType = data.fieldType;
      this.fieldSelector = data.fieldSelector;
      this.global = data.global;
      this.descending = data.descending;
    }
  }
}
