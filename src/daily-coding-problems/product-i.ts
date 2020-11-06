/*
Good morning! Here's your coding interview problem for today.
This problem was asked by Uber.
Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. 
If our input was [3, 2, 1], the expected output would be [2, 3, 6].
Follow-up: what if you can't use division?
*/

class ProductI {
  // private inputNumbers: number[] = [1, 2, 3, 4, 5];
  private inputNumbers: number[] = [3, 2, 1];

  constructor() {
    let currentIndex = -1;
    let tempProductResult = 0;

    process.stdout.write(`Input numbers: `);
    console.log(this.inputNumbers);
    process.stdout.write('Results: ');
    while (++currentIndex < this.inputNumbers.length) {
      tempProductResult = 1;

      for (let i = 0; i < this.inputNumbers.length; i++) {
        if (currentIndex === i) {
          // we want the product of all numbers except the one at i
          continue;
        }

        tempProductResult = tempProductResult * this.inputNumbers[i];
      }
      process.stdout.write(`${tempProductResult} `)
    }
    console.log();
  }
}

new ProductI();