import {
  BehaviorSubject
} from 'rxjs';

import { ListState } from './state/list-state.state-node';
import { ListStateDispatcher } from './state/list-state.rxstate';

/**
 * Provides a SKY UX-themed pagination control to display list data across multiple pages.
 */
export abstract class ListPagingComponent {
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected state: ListState;
  protected dispatcher: ListStateDispatcher;

  constructor(state: ListState, dispatcher: ListStateDispatcher) {
    this.state = state;
    this.dispatcher = dispatcher;
  }
}
