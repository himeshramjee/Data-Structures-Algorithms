import { SortBase } from "./sort-base";

export abstract class NumberSort extends SortBase<number> {

  constructor(countItemsToSort: number) {
    super(countItemsToSort);
    this.populateItems();
    this.shuffleItems();
  }

  protected populateItems() {
    for (let j: number = 0; j < this.maxItemCount; j++) {
      this.items.push(j);
    }
  }
}