import { NumbersSearch } from "./numbers-search";

class BinarySearch extends NumbersSearch {

  constructor(dataSetSize: number = 42) {
    super(dataSetSize);

    // Sort the dataset
    this.sortItems(this.dataset.length, this.dataset);
  }

  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  10, 11, 12, 13, 14, 15, 16, 17, 18]
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  protected find(searchKey: number, dataset: number[]) : number {
    let searchKeyIndex: number = -1;
    let start: number = 0;
    let end: number = dataset.length - 1;
    let midPointIndex: number = 0;

    while (start <= end) {
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

const binarySearch: BinarySearch = new BinarySearch();
binarySearch.runTest();