import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  SkyMediaQueryService, SkyMediaBreakpoints
} from '@skyux/core';

import {
  ListState,
  ListViewModel,
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
  public isMobile: boolean = false;

  public availableViews: any[];
  public currentIcon: string;

  @ContentChildren(SkyListViewSwitcherCustomComponent)
  private customViews: QueryList<SkyListViewSwitcherCustomComponent>;

  private currentViews: ListViewModel[];

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterViewInit() {

    this.mediaQueryService.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      if (newBreakpoint === SkyMediaBreakpoints.xs) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

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

          if (viewTypes.indexOf('SkyListViewGridComponent') >= 0) {
            this.availableViews.push({
              icon: 'table',
              view: this.currentViews.find(view => view.type === 'SkyListViewGridComponent'),
              ariaLabel: 'Table view'
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
                  view: customView.view,
                  ariaLabel: customView.ariaLabel
                });
            }
          });

          let activeView = this.currentViews.find(view => view.id === views.active);
          this.activeView = this.currentViews.indexOf(activeView);

          let activeViewData = this.availableViews
            .find(availableView => availableView.view === activeView);

          if (activeViewData) {
            this.currentIcon = activeViewData.icon;
          }

          if (this.availableViews.length >= 2) {
            this.showSwitcher = true;
          }
          console.log(this.availableViews);
          this.changeDetector.detectChanges();
        }
      });
  }

  public activateView(view: ListViewModel, viewIndex: number) {
    if (this.activeView !== viewIndex) {
      this.dispatcher.next(new ListViewsSetActiveAction(view.id));

      this.currentIcon = this.availableViews.find(availableView => availableView.view === view).icon;

      this.activeView = viewIndex;
    }

  }
}
