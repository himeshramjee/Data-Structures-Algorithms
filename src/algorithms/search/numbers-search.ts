import { SearchBase } from "./search-base";

export abstract class NumbersSearch extends SearchBase<number> {
  private _dataset: number[] = new Array<number>();

  constructor(dataSetSize: number) {
    super();

    if (this.dataset.length == 0) {
      this.populateItems(dataSetSize, this.dataset);
    }

    // Randomise the data - yes demonstrative only for the binary search precon, I'll sort it next :)
    this.shuffleItems(this.dataset);

    // Sort the dataset
    this.sortItems(this.dataset.length, this.dataset);

    console.log("\nPrinting dataset:");
    this.displayItems(this.dataset);
  }

  public static run(searchAlgorithm: NumbersSearch) {
    let searchBadKeys: number[] = [-1]; 
    searchBadKeys.push(searchAlgorithm.dataset[searchAlgorithm.dataset.length - 1] + 1);
    let searchKeys = searchBadKeys.concat(searchAlgorithm.dataset.slice(0, 20));

    let result = -1;
    let resultMessage = "\~(^^)~/";

    searchKeys.map(searchKey => {
      result = searchAlgorithm.find(searchKey, searchAlgorithm.dataset);
      if (result == -1) {
        if (searchBadKeys.indexOf(searchKey) != -1) {
          resultMessage = "Correct";
        } else {
          resultMessage = "Incorrect";
        }
      } else {
        resultMessage = (searchAlgorithm.dataset[result] == searchKey) ? "Correct" : "Incorrect";
      }
      
      console.log(`Location of ${searchKey} is at index ${result}. ${resultMessage}`);
    });
  }

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

  get dataset(): number[] {
    return this._dataset;
  }
}