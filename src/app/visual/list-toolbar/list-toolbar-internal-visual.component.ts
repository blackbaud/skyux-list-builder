import {
  Component,
  OnInit
} from '@angular/core';

import {
  ListStateDispatcher
} from '../../public/modules/list/state';

@Component({
  selector: 'list-toolbar-internal-visual',
  template: ''
})
export class ListToolbarVisualInternalComponent implements OnInit {
  constructor(
    private dispatcher: ListStateDispatcher
  ) {}

  public ngOnInit() {
    this.dispatcher.toolbarShowMultiselectActionBar(true);
  }
}
