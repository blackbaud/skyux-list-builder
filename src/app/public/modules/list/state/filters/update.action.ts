import { ListFilterModel } from './filter.model';

/**
 * @internal
 */
export class ListFiltersUpdateAction {
  constructor(public filters: ListFilterModel[]) {}
}
