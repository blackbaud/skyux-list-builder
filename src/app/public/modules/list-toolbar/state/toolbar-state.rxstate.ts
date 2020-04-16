import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from '@skyux/list-builder-common';
import { ListToolbarStateAction } from './toolbar-state-action.type';

@Injectable()
export class ListToolbarStateDispatcher extends StateDispatcher<ListToolbarStateAction> {
}

export class ListToolbarStateOrchestrator<T> extends StateOrchestrator<T, ListToolbarStateAction> {
}
