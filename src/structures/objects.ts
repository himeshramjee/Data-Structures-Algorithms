// Only option in ES5
const objBrackets = { "(" : ")", "{" : "}", "[" : "]" };

Object.entries(objBrackets).map((entry) => {
  console.log(`Entry: ${entry[0]} = ${entry[1]}`);
});