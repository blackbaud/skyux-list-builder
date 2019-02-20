import {
  Component,
  OnInit
} from '@angular/core';

import {
  ListStateDispatcher
} from '../../public/modules/list/state';

// Internal component only used to get at ListStateDispatcher.
@Component({
  selector: 'list-toolbar-internal-visual',
  template: ''
})
export class ListToolbarVisualInternalComponent implements OnInit {
  constructor(
    private dispatcher: ListStateDispatcher
  ) {}

  public ngOnInit() {
    this.dispatcher.toolbarShowMultiselectToolbar(true);
  }
}
