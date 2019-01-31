export class ListItemsSetSelectedItemsTrueAction {
  constructor(
    public items: string[],
    public refresh: boolean = true
  ) {}
}
