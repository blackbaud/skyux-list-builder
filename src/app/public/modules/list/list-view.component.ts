import {
  ListState
} from './state';

import {
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';

import {
  SkyListComponent
} from '../list/list.component';

import {
  SkyListViewType
} from './state/views/view-type';

let idIndex = 0;

export abstract class ListViewComponent {
  public active: Observable<boolean>;

  protected viewName: string;
  protected state: ListState;
  protected list: SkyListComponent;
  protected hasToolbar: Observable<boolean>;
  protected viewType: SkyListViewType;

  private viewId: string = `sky-list-view-cmp-${++idIndex}`;

  constructor(
    state: ListState,
    defaultName: string,
    type?: SkyListViewType
  ) {
    this.state = state;
    this.viewName = defaultName;
    this.viewType = type;

    this.hasToolbar = this.state.map(s => s.toolbar.exists);

    this.active = this.state.map(s => s.views.active === this.viewId);

    this.active.distinctUntilChanged().subscribe(
      isActive => isActive ? this.onViewActive() : this.onViewInactive()
    );
  }

  get id() {
    return this.viewId;
  }

  get label() {
    return this.viewName;
  }

  get type() {
    return this.viewType || SkyListViewType.Custom;
  }

  /* istanbul ignore next */
  public onViewActive() {
  }

  public onViewInactive() {
  }
}
