// Given an array of size n
// Split array in half
// Sort both halves
// Merge 2 halves and sort

import { NumberSort } from "./number-sort"

class MergeSort extends NumberSort{

  protected sort() {
    this.sortNumbers(this.items);
  }

  // static loopCount: number = 20;
  private sortNumbers(numbersToSort: number[]) : Array<number> {
    // if (MergeSort.loopCount == 0) {
    //   return numbersToSort;
    // } else {
    //   MergeSort.loopCount = MergeSort.loopCount - 1;
    // }

    // Base case
    if (numbersToSort.length == 1) {
      return numbersToSort;
    }

    let midPointIndex: number = Math.floor(numbersToSort.length / 2);
    console.log(`\nMidpointIndex is ${midPointIndex} for length ${numbersToSort.length}`);
    let leftArray: Array<number> = new Array<number>();
    let rightArray: Array<number> = new Array<number>();
    
    console.log(`\tLeft from 0 to ${midPointIndex - 1}`);
    if (midPointIndex == 1) {
      leftArray = new Array<number>(numbersToSort[0])
    } else {
      leftArray = this.sortNumbers(numbersToSort.slice(0, midPointIndex));
    }
    leftArray.sort();
    
    console.log(`\tRight from ${midPointIndex} to ${numbersToSort.length - 1}`);
    if (midPointIndex == 1) {
      rightArray = new Array<number>(numbersToSort[1])
    } else { 
      rightArray = this.sortNumbers(numbersToSort.slice(midPointIndex, numbersToSort.length));
    }
    rightArray.sort();

    return this.mergeSort(leftArray, rightArray);
  }

  private mergeSort(leftArray: number[], rightArray: number[]) {
    console.log(`Merging ${leftArray} and ${rightArray}`);
    let mergedArray: number[] = new Array<number>(leftArray.length + rightArray.length);

    // TODO: Possible optimizations given the input arrays are both sorted
    //       1. Compare first element of leftArray to last element of rightArray (and vice versa)
    //          Any difference would mean a simple concat operation will enough to merge the 2 arrays.

    // FIXME: The copies aren't 1 for 1. See this example:
    //          1 2 7
    //          3 5 6
    //          A 1 for 1 copy would result in: 1 3 2 5 6 7
    let shorterArrayLength = leftArray.length;
    let leftIsShorter = true;
    let leftValue;
    let rightValue;

    if (leftArray.length > rightArray.length) {
      shorterArrayLength = rightArray.length;
      leftIsShorter = false;
    }

    for (let i = 0; i < shorterArrayLength; i++) {
      leftValue = leftArray[i];
      rightValue = rightArray[i];

      if (leftValue < rightValue) {
        mergedArray.push(leftValue);
        mergedArray.push(rightValue);
      } else {
        mergedArray.push(rightValue);
        mergedArray.push(leftValue);
      }
    };

    if (leftIsShorter) {
      for (let j = leftArray.length; j < rightArray.length; j++) {
        mergedArray.push(rightArray[j]);
      }
    } else {
      for (let j = rightArray.length; j < leftArray.length; j++) {
        mergedArray.push(leftArray[j]);
      }
    }

    console.log(`\t Into ${mergedArray}`);
    return mergedArray;
  }

}

function runMergeSort() {
  console.clear();

  // Sort the array
  const ms = new MergeSort(10);
  ms.sortItems();
}

// runMergeSort();

console.log("Broken code: This is a work in progress.");

// let left = [1, 5, 2, 7, 3];
// let x = left.slice(0, 0);
// console.log(x);