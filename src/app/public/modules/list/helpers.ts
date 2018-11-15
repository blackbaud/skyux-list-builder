import {
  Observable
} from 'rxjs/Observable';

export {
  getData
} from '@skyux/list-builder-common/helpers';

export function compare(value1: any, value2: any) {
  /* tslint:disable:no-null-keyword */
  if (value1 === null) {
    return 1;
  } else if (value2 === null) {
    return -1;
  }
  /* tslint:enable:no-null-keyword */

  if (value1 && typeof value1 === 'string') {
    value1 = value1.toLowerCase();
  }

  if (value2 && typeof value2 === 'string') {
    value2 = value2.toLowerCase();
  }
  if (value1 === value2) {
    return 0;
  }

  return value1 > value2 ? 1 : -1;
}

/*
  Taken directly from rxjs's internal utility to determine whether an object is an Obserable.
  See: https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/isObservable.ts
*/
export function isObservable<T>(obj: any): obj is Observable<T> {
  return !!obj && (obj instanceof Observable || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
}
