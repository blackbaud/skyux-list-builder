import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  ListState,
  ListViewModel,
  SkyListViewType,
  ListViewsSetActiveAction,
  ListStateDispatcher
} from '../list/state';

import {
  SkyListViewSwitcherCustomComponent
} from './list-view-switcher-custom.component';

@Component({
  selector: 'sky-list-view-switcher',
  templateUrl: './list-view-switcher.component.html',
  styleUrls: ['./list-view-switcher.component.scss']
})
export class SkyListViewSwitcherComponent implements AfterViewInit {

  public activeView: any;
  public showSwitcher: boolean = false;

  protected availableViews: any[];

  @ContentChildren(SkyListViewSwitcherCustomComponent)
  private customViews: QueryList<SkyListViewSwitcherCustomComponent>;

  private currentViews: ListViewModel[];

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterViewInit() {

    this.state
      .map(s => s.views)
      .distinctUntilChanged()
      .subscribe(views => {
        this.currentViews = views.views;
        if (this.currentViews.length <= 1) {
          this.showSwitcher = false;
        } else {
          const viewTypes = this.currentViews.map(view => { return view.type; });

          this.availableViews = [];

          if (viewTypes.indexOf(SkyListViewType.Grid) >= 0) {
            this.availableViews.push({
              icon: 'table',
              view: this.currentViews.find(view => view.type === SkyListViewType.Grid)
            });
          }

          // if (viewTypes.indexOf(SkyListViewType.Repeater) >= 0) {
          //   this.availableViews.push({
          //     icon: 'list',
          //     view: this.currentViews.find(view => view.type === SkyListViewType.Repeater)
          //   });
          // }
          // if (viewTypes.indexOf(SkyListViewType.Card) >= 0) {
          //   this.availableViews.push({
          //     icon: 'th-large',
          //     view: this.currentViews.find(view => view.type === SkyListViewType.Card)
          //   });
          // }
          // if (viewTypes.indexOf(SkyListViewType.Map) >= 0) {
          //   this.availableViews.push({
          //     icon: 'map-marker',
          //     view: this.currentViews.find(view => view.type === SkyListViewType.Map)
          //   });
          // }
          // if (viewTypes.indexOf(SkyListViewType.Calendar) >= 0) {
          //   this.availableViews.push({
          //     icon: 'calendar',
          //     view: this.currentViews.find(view => view.type === SkyListViewType.Calendar)
          //   });
          // }

          this.customViews.forEach(customView => {
            if (customView.view &&
              this.currentViews.map(view => { return view.id; }).indexOf(customView.view.id) >= 0) {
                this.availableViews.push({
                  icon: customView.icon,
                  view: customView.view
                });
            }
          });

          let activeView = this.currentViews.find(view => view.id === views.active);
          this.activeView = this.currentViews.indexOf(activeView);

          if (this.availableViews.length >= 2) {
            this.showSwitcher = true;
          }

          this.changeDetector.detectChanges();
        }
      });
  }

  public activateView(view: ListViewModel, viewIndex: number) {
    this.dispatcher.next(new ListViewsSetActiveAction(view.id));
    this.activeView = viewIndex;
  }
}
