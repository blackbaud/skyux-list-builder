import { SkyListViewType } from './view-type';

export class ListViewModel {
  public id: string;
  public name: string;
  public type: SkyListViewType;

  constructor(id: string, name: string, type?: SkyListViewType) {
    this.id = id;
    this.name = name;
    this.type = type ? type : SkyListViewType.Custom;
  }
}
