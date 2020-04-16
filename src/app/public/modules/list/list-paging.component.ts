import {
  BehaviorSubject
} from 'rxjs';

import { ListState, ListStateDispatcher } from './state';

export abstract class ListPagingComponent {
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected state: ListState;
  protected dispatcher: ListStateDispatcher;

  constructor(state: ListState, dispatcher: ListStateDispatcher) {
    this.state = state;
    this.dispatcher = dispatcher;
  }
}
