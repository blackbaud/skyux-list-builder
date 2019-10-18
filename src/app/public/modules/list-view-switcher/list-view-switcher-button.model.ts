import {
  ListViewModel
} from '../list/state';

export class SkyListViewSwitcherButtonModel {
  public icon: string;
  public label: string;
  public viewModel: ListViewModel;

  constructor(data?: any) {
    if (data) {
      this.icon = data.icon;
      this.label = data.label;
      this.viewModel = data.view;
    }
  }
}
