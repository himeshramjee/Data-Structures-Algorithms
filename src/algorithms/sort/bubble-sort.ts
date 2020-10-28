import { NumberSort } from "./number-sort";

class BubbleSort extends NumberSort {
  constructor(countItemsToSort: number = 5) {
    super(countItemsToSort);
    this.populateItems();
    this.shuffleItems();
  }

  // [3, 1, 8, 5, 2, 4, 9, 10, 6, 7]
  public sort() {
    console.log("Snorting items...");

    for (let outer = this.maxItemCount -1; outer >= 0; outer--) {
      for (let inner = 0; inner < outer; inner++) {
        if (this.items[inner] > this.items[inner + 1]) {
          this.swapItems(inner, inner + 1);
        }
      }
    }

    console.log("Items are now sorted.\n");
  }
}

// ======================= Main :) ======================= 

function runBubbleSort() {
  console.clear();

  // Sort the array
  const boobleSort: BubbleSort = new BubbleSort();
  boobleSort.applySort();
}

runBubbleSort();