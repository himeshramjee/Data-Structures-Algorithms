/*
Good morning! Here's your coding interview problem for today.
This problem was recently asked by Google.
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
Bonus: Can you do this in one pass?
*/

class SumK {
  private inputNumbers: Array<number> = new Array<number>(10, 15, 3, 7);

  // allow the same number to be used twice in a single calculation, i.e. as both operands.
  private allowNumberDoubling = true; 

  constructor() {
    const k: number = 6;
    console.log(`Input numbers: ${this.inputNumbers}`);

    console.log(`[1] Number list has sum ${k}: ${this.hasSum(k)}`);

    console.log("[2] First sorting numbers...]")
    this.inputNumbers = this.inputNumbers.sort((a, b) : number => {
      if (a < b) {
        return -1;
      } else if (a == b) {
        return 0;
      } else {
        return 1;
      }
    });
    process.stdout.write(`\t`);
    console.log(this.inputNumbers);
    console.log(`[2] Number list has sum ${k}: ${this.hasSumSinglePass(k)}`);
  }


  hasSum(k: number) {
    for (let i = 0; i < this.inputNumbers.length; i++) {
      for (let j = this.allowNumberDoubling ? i : i + 1; j < this.inputNumbers.length; j++) {
        if ((this.inputNumbers[i] + this.inputNumbers[j]) == k) {
          return true;
        }
      }
    }

    return false;
  }

  hasSumSinglePass(k: number) {
    let i: number = 0;
    let j: number = this.inputNumbers.length - 1;
    let tempResult;

    while (i <= j) {
      tempResult = this.inputNumbers[i] + this.inputNumbers[j];
      if (tempResult === k || (this.allowNumberDoubling && (this.inputNumbers[i] * 2 === k || this.inputNumbers[j] * 2 === k))) {
        return true;
      }
      i++;
      j--;

      if (tempResult > k) {
        this.inputNumbers.pop();
      }

      if (tempResult < k) {
        this.inputNumbers.shift();
      }
    }

    return false;
  }
}

new SumK();