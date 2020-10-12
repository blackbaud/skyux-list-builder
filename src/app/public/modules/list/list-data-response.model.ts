import {
  ListItemModel
} from '@skyux/list-builder-common';

 export class ListDataResponseModel {
   /**
    * The total number of records in the list.
    */
   public count: number;
   /**
    * An array of the items returned.
    */
   public items: ListItemModel[];

   constructor(data?: any) {
     if (data !== undefined) {
       this.count = data.count;
       this.items = data.items;
     }
   }
 }
