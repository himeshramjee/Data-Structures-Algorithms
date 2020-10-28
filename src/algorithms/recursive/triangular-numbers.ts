// Given a number series by 1, 3, 5, 6, 10, 15, 21, ..., n. 
// Write a function to determine the number at some position p in the series.

function triangleFormula(p: number) : number {
  return (Math.pow(p, 2) + p)/2;
}

function triangleLoop(p: number) : number {
  let sum : number = 0;

  while (p > 0) {
    sum += p--;
  }

  return sum;
}

function triangleRecurse(p: number) : number {
  if (p == 1) {
    return 1;
  } else {
    return p += triangleRecurse(p - 1);
  }
}

console.log("\nCalculating using a formula...");
let sum4 = triangleFormula(4);
console.log(`Number at position 4 is ${sum4}`);
let sum7 = triangleFormula(7);
console.log(`Number at position 7 is ${sum7}`);
let sum1000 = triangleFormula(1000);
console.log(`Number at position 1000 is ${sum1000}`);

console.log("\nCalculating using typical loop...");
sum4 = triangleLoop(4);
console.log(`Number at position 4 is ${sum4}`);
sum7 = triangleLoop(7);
console.log(`Number at position 7 is ${sum7}`);
sum1000 = triangleLoop(1000);
console.log(`Number at position 1000 is ${sum1000}`);

console.log("\nNow with a recursive function call...");
sum4 = triangleRecurse(4);
console.log(`Number at position 4 is ${sum4}`);
sum7 = triangleRecurse(7);
console.log(`Number at position 7 is ${sum7}`);
sum1000 = triangleRecurse(1000);
console.log(`Number at position 1000 is ${sum1000}`);