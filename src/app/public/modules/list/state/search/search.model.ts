export class ListSearchModel {
  public searchText: string = '';
  public functions: Array<(data: any, searchText: string) => boolean> = [];
  public fieldSelectors: Array<string> = [];

  constructor(data?: any) {
    if (data) {
      /**
       * Specifies the text to search.
       */
      this.searchText = data.searchText;
      /**
       * Specifies an array of functions that returns a `boolean` value of `true` when
       * the search is successful. This property accepts a function of type
       * `(data: any, searchText: string) => boolean>.`
       */
      this.functions = [...data.functions];
      /**
       * Specifies the columns to search. The columns correspond to `field` values that
       * you specify with the list component's `data` property.
       */
      this.fieldSelectors = data.fieldSelectors;
    }
  }
}
