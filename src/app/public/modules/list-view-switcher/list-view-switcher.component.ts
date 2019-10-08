import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList
} from '@angular/core';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  ListState,
  ListStateDispatcher,
  ListViewModel,
  ListViewsSetActiveAction
} from '../list/state';

import {
  SkyListViewSwitcherCustomComponent
} from './list-view-switcher-custom.component';

@Component({
  selector: 'sky-list-view-switcher',
  templateUrl: './list-view-switcher.component.html',
  styleUrls: ['./list-view-switcher.component.scss']
})
export class SkyListViewSwitcherComponent implements AfterViewInit, OnDestroy {

  public activeView: any;

  public showSwitcher: boolean = false;

  public isMobile: boolean = false;

  public availableViews: any[];

  public currentIcon: string;

  @ContentChildren(SkyListViewSwitcherCustomComponent)
  private customViews: QueryList<SkyListViewSwitcherCustomComponent>;

  private currentViews: ListViewModel[];

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterViewInit(): void {

    this.mediaQueryService
      .subscribe((newBreakpoint: SkyMediaBreakpoints) => {
        if (newBreakpoint === SkyMediaBreakpoints.xs) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });

    this.state
      .takeUntil(this.ngUnsubscribe)
      .map(s => s.views)
      .distinctUntilChanged()
      .subscribe(views => {
        this.currentViews = views.views;
        if (this.currentViews.length <= 1) {
          this.showSwitcher = false;
        } else {
          const viewNames = this.currentViews.map(view => { return view.name; });

          this.availableViews = [];

          if (viewNames.indexOf('Grid View') >= 0) {
            this.availableViews.push({
              icon: 'table',
              viewModel: this.currentViews.find(view => view.name === 'Grid View'),
              label: 'Table view'
            });
          }

          // Future built in types will go here. Per the design doc future icons would be:
          // Repeater
          //  Icon: list
          //  Label: “List view”
          // Card
          //  Icon: th-large
          //  Label: “Card view”
          // Map
          //  Icon: map-marker
          //  Label: “Map view”
          // Calendar
          //  Icon: calendar
          //  Label: “Calendar view”

          this.customViews.forEach(customView => {
            if (customView.view &&
              this.currentViews.map(view => { return view.id; }).indexOf(customView.view.id) >= 0) {
              this.availableViews.push({
                icon: customView.icon,
                viewModel: this.currentViews.find(view => view.name === customView.view.label),
                label: customView.label
              });
            }
          });

          let activeView = this.currentViews.find(view => view.id === views.active);
          this.activeView = this.currentViews.indexOf(activeView);

          let activeViewData = this.availableViews
            .find(availableView => availableView.viewModel === activeView);

          if (activeViewData) {
            this.currentIcon = activeViewData.icon;
          }

          if (this.availableViews.length >= 2) {
            this.showSwitcher = true;
          }
          this.changeDetector.detectChanges();
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public activateView(view: ListViewModel, viewIndex: number): void {
    if (this.activeView !== viewIndex) {

      // Without this timeout the list updates too quickly and the dropdown on mobile does not close
      setTimeout(() => {
        this.dispatcher.next(new ListViewsSetActiveAction(view.id));
      }, 0);

      this.currentIcon = this.availableViews
        .find(availableView => availableView.viewModel === view).icon;

      this.activeView = viewIndex;

    }
  }
}
