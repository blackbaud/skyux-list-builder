import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  async
} from '@angular/core/testing';

import {
  SkyListViewGridModule
} from '@skyux/list-builder-view-grids';

import {
  SkyListModule
} from '../list';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  SkyListToolbarModule
} from '../list-toolbar';

import {
  ListViewSwitcherFixtureComponent
} from './fixtures/list-view-switcher.component.fixture';

import {
  ListViewSwitcherSecondaryViewFixtureComponent
} from './fixtures/list-view-switcher-secondary-view.component.fixture';

import {
  SkyListViewSwitcherModule
} from './list-view-switcher.module';

import {
  ListViewSwitcherOnlyGridFixtureComponent
} from './fixtures/list-view-switcher-only-grid.component.fixture';

import {
  ListViewSwitcherOnlyCustomFixtureComponent
} from './fixtures/list-view-switcher-only-custom.component.fixture';
import { ListViewSwitcherExtraCustomFixtureComponent } from './fixtures/list-view-switcher-extra-custom.component.fixture';

describe('List View Switcher Component', () => {
  let state: ListState,
    dispatcher: ListStateDispatcher,
    nativeElement: HTMLElement,
    element: DebugElement;

  describe('multi-view', () => {

    let fixture: ComponentFixture<ListViewSwitcherFixtureComponent>,
      component: ListViewSwitcherFixtureComponent;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewSwitcherFixtureComponent,
          ListViewSwitcherSecondaryViewFixtureComponent
        ],
        imports: [
          SkyListModule,
          SkyListToolbarModule,
          SkyListViewGridModule,
          SkyListViewSwitcherModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewSwitcherFixtureComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
    });

    it('should show the view switcher if more than one view exists', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(nativeElement.querySelector('sky-list-view-switcher sky-radio-group'))
        .not.toBeUndefined();
    }));

    it('should set the default radio button for a grid correctly', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const gridRadio: HTMLElement = <HTMLElement>nativeElement
        .querySelector('sky-list-view-switcher sky-radio[ng-reflect-icon="table"]');
      expect(gridRadio).not.toBeNull();
      expect(gridRadio.querySelector('i.fa-table')).not.toBeNull();
    }));

    it('should set the custom radio button correctly', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const gridRadio: HTMLElement = <HTMLElement>nativeElement
        .querySelector('sky-list-view-switcher sky-radio[ng-reflect-icon="gavel"]');
      expect(gridRadio).not.toBeNull();
      expect(gridRadio.querySelector('i.fa-gavel')).not.toBeNull();
    }));

    it('should set the list to the default view', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.gridView.active.subscribe(activeState => {
          expect(activeState).toBeFalsy();
        });
        component.secondaryView.active.subscribe(activeState => {
          expect(activeState).toBeTruthy();
        });
      });
    }));

    it('should switch to the grid view correctly', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        (<HTMLElement>nativeElement
          .querySelector('sky-list-view-switcher sky-radio[ng-reflect-icon="table"]'))
          .click();
        fixture.detectChanges();
        component.gridView.active.subscribe(activeState => {
          expect(activeState).toBeTruthy();
        });
        component.secondaryView.active.subscribe(activeState => {
          expect(activeState).toBeFalsy();
        });
      });
    }));

  });

  describe('grid only', () => {

    let fixture: ComponentFixture<ListViewSwitcherOnlyGridFixtureComponent>;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewSwitcherOnlyGridFixtureComponent,
          ListViewSwitcherSecondaryViewFixtureComponent
        ],
        imports: [
          SkyListModule,
          SkyListToolbarModule,
          SkyListViewGridModule,
          SkyListViewSwitcherModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewSwitcherOnlyGridFixtureComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
    });

    it('should not show the view switcher if only a default view exists', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(nativeElement.querySelector('sky-list-view-switcher sky-radio-group'))
        .toBeNull();
    }));

  });

  describe('custom only', () => {

    let fixture: ComponentFixture<ListViewSwitcherOnlyCustomFixtureComponent>;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewSwitcherOnlyCustomFixtureComponent,
          ListViewSwitcherSecondaryViewFixtureComponent
        ],
        imports: [
          SkyListModule,
          SkyListToolbarModule,
          SkyListViewGridModule,
          SkyListViewSwitcherModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewSwitcherOnlyCustomFixtureComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
    });

    it('should not show the view switcher if only one custom view exists', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(nativeElement.querySelector('sky-list-view-switcher sky-radio-group'))
        .toBeNull();
    }));

  });

  describe('custom only', () => {

    let fixture: ComponentFixture<ListViewSwitcherExtraCustomFixtureComponent>;

    beforeEach(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListViewSwitcherExtraCustomFixtureComponent,
          ListViewSwitcherSecondaryViewFixtureComponent
        ],
        imports: [
          SkyListModule,
          SkyListToolbarModule,
          SkyListViewGridModule,
          SkyListViewSwitcherModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListViewSwitcherExtraCustomFixtureComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
    });

    it('should not show the view switcher if only one view and an extra custom declaration exists',
      fakeAsync(() => {
        fixture.detectChanges();
        tick();
        expect(nativeElement.querySelector('sky-list-view-switcher sky-radio-group'))
          .toBeNull();
      }));

  });

});
