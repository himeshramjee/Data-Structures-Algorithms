/*
Good morning! Here's your coding interview problem for today.
This problem was recently asked by Google.
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
Bonus: Can you do this in one pass?
*/

let inputNumbers: Array<number> = new Array<number>(10, 15, 3, 7);

// allow the same number to be used twice in a single calculation, i.e. as both operands.
let allowNumberDoubling = true; 

function hasSum(k: number) {
  for (let i = 0; i < inputNumbers.length; i++) {
    for (let j = allowNumberDoubling ? i : i + 1; j < inputNumbers.length; j++) {
      if ((inputNumbers[i] + inputNumbers[j]) == k) {
        return true;
      }
    }
  }

  return false;
}

function hasSumSinglePass(k: number) {
  let i: number = 0;
  let j: number = inputNumbers.length - 1;
  let tempResult;

  while (i <= j) {
    tempResult = inputNumbers[i] + inputNumbers[j];
    if (tempResult === k || (allowNumberDoubling && (inputNumbers[i] * 2 === k || inputNumbers[j] * 2 === k))) {
      return true;
    }
    i++;
    j--;

    if (tempResult > k) {
      inputNumbers.pop();
    }

    if (tempResult < k) {
      inputNumbers.shift();
    }
  }

  return false;
}

const k: number = 6;
console.log(`Input numbers: ${inputNumbers}`);

console.log(`[1] Number list has sum ${k}: ${hasSum(k)}`);

console.log("[2] First sorting numbers...]")
inputNumbers = inputNumbers.sort((a, b) : number => {
  if (a < b) {
    return -1;
  } else if (a == b) {
    return 0;
  } else {
    return 1;
  }
});
process.stdout.write(`\t`);
console.log(inputNumbers);
console.log(`[2] Number list has sum ${k}: ${hasSumSinglePass(k)}`);