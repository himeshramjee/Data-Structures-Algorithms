import { NumberSort } from "./number-sort"

class QuickSort extends NumberSort {

  sort() {
    console.log(`Right partition starts index at ${this.partitionItems(44)}`);
  }
}

const qs = new QuickSort(100);
qs.sortItems();