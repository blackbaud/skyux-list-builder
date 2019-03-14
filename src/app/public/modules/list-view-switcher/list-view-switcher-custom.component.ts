import {
  Component,
  Input
} from '@angular/core';

import {
  ListViewComponent
} from '@skyux/list-builder';

@Component({
  selector: 'sky-list-view-switcher-custom',
  template: ''
})
export class SkyListViewSwitcherCustomComponent {

  @Input()
  public icon: string;

  @Input()
  public view: ListViewComponent;

  @Input()
  public label: string;
}
