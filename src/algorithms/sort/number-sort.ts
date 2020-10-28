import { SortBase } from "./sort-base";

export abstract class NumberSort extends SortBase<number> {
  protected populateItems() {
    for (let j: number = 0; j < this.maxItemCount; j++) {
      this.items.push(j);
    }
  }
}