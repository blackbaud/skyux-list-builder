import {
  Component
} from '@angular/core';

import {
  ListState,
  ListStateDispatcher
} from '@skyux/list-builder';

const dispatcher = new ListStateDispatcher();

const state = new ListState(dispatcher);

@Component({
  selector: 'app-list-toolbar-docs',
  templateUrl: './list-toolbar-docs.component.html',
  providers: [
    {
      provide: ListState,
      useValue: state
    },
    {
      provide: ListStateDispatcher,
      useValue: dispatcher
    }
  ]
})
export class ListToolbarDocsComponent {

  public data: any[] = [];

  public iconGroupSelectedValue = 'table';

}
