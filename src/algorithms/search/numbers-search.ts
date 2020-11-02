import { SearchBase } from "./search-base";

export abstract class NumbersSearch extends SearchBase<number> {
  private _dataset: number[] = new Array<number>();
  
  // These are only required for internal testing
  private searchBadKeys: number[] = [-999999];
  private searchKeys: number[] = [];
  public allTestsPassed = true;

  constructor(dataSetSize: number) {
    super();

    if (this.dataset.length == 0) {
      this.populateItems(dataSetSize, this.dataset);

      // Generate some bad/invalid search keys
      this.searchBadKeys.push(this.dataset[this.dataset.length - 1] + 1);
      this.searchKeys = this.searchBadKeys.concat(this.dataset.slice(0, 20));

      // Randomise the data
      this.shuffleItems(this.dataset);
      console.log("\nPrinting randomised dataset:");
      this.displayItems(this.dataset);

      console.log(`Also generated test search keys for runTest(): ${this.searchBadKeys}`);
    }
  }

  public runTest() : boolean {
    // Run the search algorithm across the built-in search keys
    let result: number;
    let resultMessage: string; // = "\~(^^)~/";

    this.searchKeys.map(searchKey => {
      // console.log(`\nFinding ${searchKey}`);
      result = this.find(searchKey, this.dataset);
      
      if (result == -1 && searchKey != 0) {
        if (this.searchBadKeys.indexOf(searchKey) != -1) {
          resultMessage = "Correct";
        } else {
          resultMessage = "Incorrect";
          this.allTestsPassed = false;
        }
      } else {
        if (this.dataset[result] == searchKey) {
          // case for non-tree search algorithms, where the backing array dataset is directly searched
          resultMessage = "Correct";
        } else if (result === searchKey) {
          // case for tree based search algorithms, where I'm confirming the expected index rather than the arb data object O.
          resultMessage = "Correct";
        } else {
          resultMessage = "Incorrect";
          this.allTestsPassed = false;
        }
      }
      
      // Show result
      // console.log(`Location of ${searchKey} is at index ${result}. ${resultMessage}`);
    });

    return this.allTestsPassed;
  }

  protected populateItems(itemCount: number, itemsStore: number[]) {
    if (!itemsStore) {
      itemsStore = new Array<number>();
    }
    for (let j: number = 0; j <= itemCount; j++) {
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