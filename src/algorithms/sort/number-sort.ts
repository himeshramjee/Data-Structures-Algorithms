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

  protected partitionItems(partitionKey: number) {
    let startIndex = -1;
    let endIndex = this.items.length - 1;

    let leftScannerIndex: number = startIndex;
    let rightScannerIndex: number = endIndex + 1;
    
    while(true) {
      // Scan for bigger items that should move to right half
      while(leftScannerIndex < endIndex && this.items[++leftScannerIndex] < partitionKey)
        ; // (nop - scanner index moves on)
  
      // Scan for smaller items that should move to right half
      while(rightScannerIndex > startIndex && this.items[--rightScannerIndex] > partitionKey) // find smaller item
        ; // (nop - scanner index moves on)
      
      if (leftScannerIndex >= rightScannerIndex)            // if pointers cross,
        break;                                              // partition done
      else                                                  // not crossed, so
        this.swapItems(leftScannerIndex, rightScannerIndex);// swap elements
    }
  
    // return partition index (not the actual key, since it need not be part of the array values)
    return leftScannerIndex;
  }
}