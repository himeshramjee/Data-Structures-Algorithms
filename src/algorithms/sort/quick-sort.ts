import { NumberSort } from "./number-sort"

class QuickSort extends NumberSort {

  sort() {
    console.log(`Right partition starts index at ${this.partitionItems(-1)}`);
    console.log("TODO: This hasn't been implemented yet.");
  }
}

const qs = new QuickSort(30);
qs.sortItems();