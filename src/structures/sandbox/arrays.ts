const inputString = "abcdef";

const alpharray1: Array<string> = new Array<string>();
const alpharray2: Array<string> = new Array<string>();

inputString.split('').map(c => {
  alpharray1.push(c);
  alpharray2.unshift(c);
});

console.log(alpharray1);
console.log("and now with unshift...\n")
console.log(alpharray2);