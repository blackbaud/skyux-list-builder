import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  ListStateDispatcher
} from '../list/state/list-state.rxstate';

import {
  ListToolbarItemModel
} from '../list/state/toolbar/toolbar-item.model';

@Component({
  selector: 'sky-list-filter-button',
  templateUrl: './list-filter-button.component.html'
})
export class SkyListFilterButtonComponent implements AfterViewInit {
  @ViewChild('filterButton', {
    read: TemplateRef,
    static: true
  })
  private filterButtonTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher
  ) { }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems(
      [
        new ListToolbarItemModel({
          template: this.filterButtonTemplate,
          location: 'left'
        })
      ],
      1
    );
  }
}
