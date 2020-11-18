/*
  Return a new sorted merged list from K sorted lists, each with size N.
*/

class ListData {
  public listID: string;
  private list: number[] = [];
  private listSize: number = 0; // Not capacity, but actual number of items.
  
  constructor(listId: string) {
    this.listID = listId;
  }

  push(item: number) {
    this.list.push(item);
    this.listSize++;
  }

  peek() : number | null {
    if (this.list[0] != undefined) {
      return this.list[0];
    }
    
    return null;
  }

  pop() : number | undefined {
    let n = this.list.shift();
    if (n != undefined) {
      this.listSize--;
    }
    return n;
  }

  shuffleListItems() {
    for (let i: number = this.listSize - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.list[i];
      this.list[i] = this.list[j];
      this.list[j] = temp;
    }
  }

  display(delimiter: string = " ") {
    this.list.map(item => {
      process.stdout.write(`${item}${delimiter}`);
    });
    process.stdout.write("\n");
  }

  // Insertion sort that shifts items rather than swap
  sort() {
    // console.log(`Sorting ${this.listSize} items...`);

    let leftIndex: number;
    let rightIndex: number;
    let rightValue: number;
    let doShift: boolean = false;

    for (let outer = 0; outer < this.listSize; outer++) {
      leftIndex = outer;
      rightIndex = outer + 1;

      while (leftIndex >= 0 && this.list[rightIndex] < this.list[leftIndex]) {
        leftIndex--;
        doShift = true;
      }

      if (doShift) {
        // Move leftIndex to correct position, compensating for the "last check" that exited the while loop
        leftIndex++;
        // "Remove" the right value that will be moved to the left
        rightValue = this.list[rightIndex];
        // Shift all left items one position to the right to make place for rightValue
        for (let i = rightIndex - 1; i >= leftIndex; i--) {
          this.list[i + 1] = this.list[i];
        }
        // Put back rightValue
        this.list[leftIndex] = rightValue;
        // Reset flag
        doShift = false;
      }
    }
  }

  get isEmpty() : boolean {
    return this.size === 0;
  }

  get size() : number {
    return this.listSize;
  }
}

abstract class SortedListsMerger {
  totalListCount: number;
  lists: Array<ListData>;
  maxListSizeN: number = 10;
  static numbers: number = 0;

  constructor(countOfLists: number = 3, generateNumbers: boolean = true) {
    this.totalListCount = countOfLists;
    this.lists = new Array<ListData>();

    console.log(`\nConstructing ${this.totalListCount} lists...`);

    // TODO: Let user build this and pass in
    for(let i = 1; i <= this.totalListCount; i++) {
      let listData: ListData = new ListData(i.toString());
      this.lists.push(listData);
      if (generateNumbers) {
        console.log(`Generating list ${i}...`);
        this.populateList(listData);
      }
    };

    if (!generateNumbers) {
      this.populateAllLists();
    }
  }

  abstract mergeLists(): void;

  private populateList(list: ListData) : void {
    for (let n = 0; n < this.maxListSizeN; n++) {
      list.push(n);
    }

    for (let n = 0; n < this.maxListSizeN; n++) {
      list.push(SortedListsMerger.numbers++);
    }
  }

  private populateAllLists() : void {
    console.log(`Populating lists...`);
    this.lists[0].push(10);
    this.lists[0].push(15);
    this.lists[0].push(30);
    this.lists[1].push(12);
    this.lists[1].push(15);
    this.lists[1].push(20);
    this.lists[2].push(17);
    this.lists[2].push(20);
    this.lists[2].push(32);
  }

  public getListsWithData() : Array<ListData> | null {
    let listsWithData: Array<ListData> | null = null;

    this.lists.map(listData => {
      if (!listData.isEmpty) {
        if (listsWithData === null) {
          listsWithData = new Array<ListData>();
        }

        listsWithData.push(listData);
      }
    });

    return listsWithData;
  }

  public displayLists() {
    console.log(`\nDisplaying items from ${this.totalListCount} lists`);
    let i = 1;
    this.lists.map(listData => {
      process.stdout.write(`${i++}: `);
      listData.display();
    });
    console.log();
  }
}

class SortedNumberListMerger extends SortedListsMerger {
  mergedList: number[] = [];

  constructor(countOfLists: number = 3, generateNumbers: boolean = true) {
    super(countOfLists, generateNumbers);

    this.lists.map(list => list.sort());

    this.displayLists();

    console.log(this.mergeLists());
  }

  public mergeLists() : Array<number> {
    let mergeListsResult: Array<number> = new Array<number>();
    let currentValue: number | null = 0;
    let nextMinValue: number = 0;
    let nextMinListIndex: number | null = null;

    /*
      0: 0 1 2 3 4 5 6 7 8 9 
      1: 0 1 2 3 4 5 6 7 8 9 
      2: 0 1 2 3 4 5 6 7 8 9 

      0: 0 1 2 3 4 5 6 7 8 9 
      1: 10 11 12 13 14 15 16 17 18 19 
      2: 20 21 22 23 24 25 26 27 28 29
    */

    console.log("Merging lists...");
    let listsToProcess = this.getListsWithData();
    if (!listsToProcess || (listsToProcess && listsToProcess.length === 0)) {
      console.log("No lists to process.");
      return mergeListsResult;
    }

    while (listsToProcess != null) {

      // Calculate next value to go into the merged list
      listsToProcess.forEach((data: ListData, index: number): void => {
        currentValue = data.peek();
        if (currentValue === null) {
          // current list is empty, this should never be true so throw out
          throw new Error("Unexpected empty list found");
        } else if (index === 0) {
          // Assume the first item from the first list is min, then check against the other values
          nextMinValue = currentValue;
        }

        if (currentValue <= nextMinValue) {
          nextMinValue = currentValue;
          nextMinListIndex = index;
        }
      });

      // Remove next value to merge from it's home list and add to merged array
      if (nextMinListIndex != null) {
        mergeListsResult.push(listsToProcess[nextMinListIndex].pop()!);
        // console.log(`ML: ${mergeListsResult} `);
      } else {
        // Something is wrong, there should always be an item to process at this point
        console.error("Missed a merge op");
        break;
      }

      // Reset and refresh lists to process
      nextMinListIndex = null;
      // FIXME: seems very inefficient to reprocess all lists like this
      listsToProcess = this.getListsWithData();
    }

    return mergeListsResult;
  }
}

new SortedNumberListMerger(3, true);
new SortedNumberListMerger(3, false);