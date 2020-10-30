import { NumberSort } from "./number-sort";

class SelectionSort extends NumberSort {
  constructor(countItemsToSort: number = 5) {
    super(countItemsToSort);
  }

  // [3, 1, 8, 5, 2, 4, 9, 10, 6, 7]
  protected sort() {
    console.log(`\nSorting ${this.maxItemCount} items...`);

    let postionToFill: number;
    let positionOfMinValue: number;

    for (let outer = 0; outer < this.maxItemCount; outer++) {
      postionToFill = outer;
      positionOfMinValue = outer;

      for (let inner = outer + 1; inner < this.maxItemCount; inner++) {
        if (this.items[inner] < this.items[positionOfMinValue]) {
          positionOfMinValue = inner;
        }
      }

      this.swapItems(postionToFill, positionOfMinValue);
    }

    console.log("Items are now sorted.\n");
  }
}

// ======================= Main :) ======================= 

function runSelectionSort() {
  console.clear();

  // Sort the array
  const selectSort: SelectionSort = new SelectionSort();
  selectSort.sortItems();
}

runSelectionSort();