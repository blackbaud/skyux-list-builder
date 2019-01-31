// Action used to exclusively set "isSelected = true" on
// items in the data set. All other items will be set to false.
export class ListSelectedSetItemsSelectedTrueAction {
  constructor(
    public items: string[],
    public refresh: boolean = true
  ) {}
}
