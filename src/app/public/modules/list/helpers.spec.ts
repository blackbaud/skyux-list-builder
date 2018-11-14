// #region imports
import {
  EventEmitter
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import {
  isObservable
} from './helpers';
// #endregion

describe('list helpers', () => {
  it('should check if an object is an observable', () => {
    const eventEmitter = new EventEmitter<void>();
    const observable = new Observable<void>();
    const subject = new Subject<void>();

    expect(isObservable(eventEmitter)).toEqual(true);
    expect(isObservable(observable)).toEqual(true);
    expect(isObservable(subject)).toEqual(true);
    expect(isObservable({})).toEqual(false);
    expect(isObservable('foobar')).toEqual(false);
  });
});
