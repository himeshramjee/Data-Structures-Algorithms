import { SearchBase } from "./search-base";

export abstract class NumbersSearch extends SearchBase<number> {

  protected populateItems(itemCount: number, itemsStore: number[]) {
    if (!itemsStore) {
      itemsStore = new Array<number>();
    }
    for (let j: number = 1; j <= itemCount; j++) {
      itemsStore.push(j);
    }
  }

  // Insertion sort implementation
  // Numbers are sorted into ascending order
  protected sortItems(itemCount: number, itemsStore: number[]) {
    let leftIndex: number;
    let rightIndex: number;
    let rightValue: number;
    let doShift: boolean = false;

    for (let outer = 0; outer < itemCount; outer++) {
      leftIndex = outer;
      rightIndex = outer + 1;

      while (leftIndex >= 0 && itemsStore[rightIndex] < itemsStore[leftIndex]) {
        leftIndex--;
        doShift = true;
      }

      if (doShift) {
        // Move leftIndex to correct position, compensating for the "last check" that exited the while loop
        leftIndex++;
        // "Remove" the right value that will be moved to the left
        rightValue = itemsStore[rightIndex];
        // Shift all left items one position to the right to make place for rightValue
        for (let i = rightIndex - 1; i >= leftIndex; i--) {
          itemsStore[i + 1] = itemsStore[i];
        }
        // Put back rightValue
        itemsStore[leftIndex] = rightValue;

        // Reset flag
        doShift = false;
      }
    }
  }
}