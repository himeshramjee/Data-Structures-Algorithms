import { NumbersSearch } from "./numbers-search";

class BinarySearchResursive extends NumbersSearch {

  constructor(dataSetSize: number = 42) {
    super(dataSetSize);

    // Sort the dataset
    this.sortItems(this.dataset.length, this.dataset);
  }

  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  10, 11, 12, 13, 14, 15, 16, 17, 18]
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  find(searchKey: number, dataset: number[]) : number {
    let searchKeyIndex: number = -1;
    let start: number = 0;
    let end: number = dataset.length - 1;

    searchKeyIndex = this.doMagic(searchKey, start, end, dataset);

    return searchKeyIndex;
  }

  private doMagic(searchKey: number, start: number, end: number, dataset: number[]) : number {
    let midPointIndex: number = 0;

    while (start <= end) {
      // Calculate new midpoint
      midPointIndex = start + Math.floor((end - start) / 2);

      if (searchKey == dataset[midPointIndex]) {
        return midPointIndex;
      }

      // Left half
      if (searchKey < dataset[midPointIndex]) {
        return this.doMagic(searchKey, start, midPointIndex - 1, dataset);
      }

      // Right half
      if (searchKey > dataset[midPointIndex]) {
        return this.doMagic(searchKey, midPointIndex + 1, end, dataset);
      }
    }

    return -1;
  }
}

const binarySearch: BinarySearchResursive = new BinarySearchResursive(100);
NumbersSearch.run(binarySearch);