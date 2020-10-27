import { NumberSort } from "./number-sort";

class InsertionSort extends NumberSort {
  constructor(countItemsToSort: number = 5) {
    super(countItemsToSort);
    this.populateItems();
    this.shuffleItems();
  }

  sort() {
    // TODO: Ask user which sort to execute
    console.log("Running Sort One...");
    this.sortOne();
    this.displayItems();

    console.log("\nShuffling items for round 2...");
    this.shuffleItems();
    this.displayItems();
    console.log("Running Sort Two...");
    this.sortTwo();
  }

  // When compared with sortOne(), this is more complex to read, but it halves the number of 
  // memory writes needed when doing a swap or shift. i.e. a single swap involves 2 writes and a shift involves 1.
  // 
  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // [ ,  ,  ,  ,  ,  ,  , O,  ,  ] | maxItemCount = 10
  // [ ,  , L,  ,  ,  ,  ,  , R,  ] | rigthValue = 2 | doShift = true
  // [9, 8, 3, 0, 1, 4, 5, 6, 2, 7]
  // [0, 1, 3, 4, 5, 6, 8, 9,  , 7]
  sortTwo() {
    console.log(`Sorting ${this.maxItemCount} items...`);

    let leftIndex: number;
    let rightIndex: number;
    let rightValue: number;
    let doShift: boolean = false;

    for (let outer = 0; outer < this.maxItemCount; outer++) {
      leftIndex = outer;
      rightIndex = outer + 1;

      while (leftIndex >= 0 && this.items[rightIndex] < this.items[leftIndex]) {
        leftIndex--;
        doShift = true;
      }

      if (doShift) {
        // Move leftIndex to correct position, compensating for the "last check" that exited the while loop
        leftIndex++;
        // "Remove" the right value that will be moved to the left
        rightValue = this.items[rightIndex];
        // Shift all left items one position to the right to make place for rightValue
        for (let i = rightIndex - 1; i >= leftIndex; i--) {
          this.items[i + 1] = this.items[i];
        }
        // Put back rightValue
        this.items[leftIndex] = rightValue;

        // Reset flag
        doShift = false;
      }
    }

    console.log("Items are now sorted.");
  }

  // This version swaps 2 items which could be inefficient for costly swaps.
  // The alternative (that actually adheres to insertion algorithm) is to remove the item at the target position to the
  // left of leftIndex and then shift left items to the right using an single overwrite (as opposed to swap). 
  // See sortTwo() for how that's implemented.
  sortOne() {
    console.log(`Sorting ${this.maxItemCount} items...`);

    let leftIndex: number;
    let rightIndex: number; // Could replace this with leftIndex + 1 but leaving it in for better code readability

    for (let outer = 0; outer < this.maxItemCount; outer++) {
      leftIndex = outer;
      rightIndex = outer + 1;

      while (this.items[rightIndex] < this.items[leftIndex] && leftIndex >= 0) {
        this.swapItems(leftIndex, rightIndex);
        leftIndex--;
        rightIndex--;
      }
    }

    console.log("Items are now sorted.");
  }
}

// ======================= Main :) ======================= 

function runInsertSort() {
  console.clear();

  // Sort the array
  const insertSort: InsertionSort = new InsertionSort();
  insertSort.applySort();
}

runInsertSort();