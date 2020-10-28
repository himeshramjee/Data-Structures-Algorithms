import { NumbersSearch } from "./numbers-search";

class BinarySearch extends NumbersSearch {
  constructor(dataset?: number[], dataSetSize: number = 42) {
    super();

    // Populate the dataset
    if (!dataset) {
      dataset = new Array<number>();
    }

    if (dataset.length == 0) {
      this.populateItems(dataSetSize, dataset);
    }

    // Randomise the data - yes demonstrative only for the binary search precon, I'll sort it next :)
    this.shuffleItems(dataset);

    // Sort the dataset
    this.sortItems(dataset.length, dataset);

    console.log("\nPrinting dataset:");
    this.displayItems(dataset);
    console.log();
  }

  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  10, 11, 12, 13, 14, 15, 16, 17, 18]
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  find(searchKey: number, dataset: number[]) : number {
    let searchKeyIndex: number = -1;
    let start: number = 0;
    let end: number = dataset.length - 1;
    let midPointIndex: number = 0;
    let loopCount: number = 0;

    while (start <= end) {
      if (loopCount++ == 10) {
        break;
      }
      // Calculate new midpoint
      midPointIndex = start + Math.floor((end - start) / 2);

      if (searchKey == dataset[midPointIndex]) {
        searchKeyIndex = midPointIndex;
        break;
      }

      // Left half
      if (searchKey < dataset[midPointIndex]) {
        end = midPointIndex - 1;
        continue;
      }

      // Right half
      if (searchKey > dataset[midPointIndex]) {
        start = midPointIndex + 1;
        continue;
      }
    }

    return searchKeyIndex;
  }
}

let dataset: number[] = new Array<number>();
const binarySearch: BinarySearch = new BinarySearch(dataset, 30);

let searchBadKeys: number[] = [-1]; 
searchBadKeys.push(dataset[dataset.length - 1] + 1);
let searchKeys = searchBadKeys.concat(dataset.slice(0, 20));

let result = -1;
let resultMessage = "\~(^^)~/";

searchKeys.map(searchKey => {
  result = binarySearch.find(searchKey, dataset);
  if (result == -1) {
    if (searchBadKeys.indexOf(searchKey) != -1) {
      resultMessage = "Correct";
    } else {
      resultMessage = "Incorrect";
    }
  } else {
    resultMessage = (dataset[result] == searchKey) ? "Correct" : "Incorrect";
  }
  
  console.log(`Location of ${searchKey} is at index ${result}. ${resultMessage}`);
});