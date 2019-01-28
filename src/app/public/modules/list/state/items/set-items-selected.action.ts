export class ListItemsSetSelectedItemsAction {
  constructor(
    public items: string[],
    public selected: boolean = false,
    public refresh: boolean = true) {}
}
