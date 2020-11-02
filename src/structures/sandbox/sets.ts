// Only option in ES5
const bracketsObject = { "(" : ")", "{" : "}", "[" : "]" };

// Sets available from ES6
const openBracketSet = new Set<string>();

Object.entries(bracketsObject).map((entry) => {
  openBracketSet.add(entry[0]);
});

console.log(`Bracket Set has ${openBracketSet.size} entries`);

console.log(openBracketSet.has("(") ? `( exists in the set` : "'(' is not part of the set");

console.log("Deleting '(' from set...");
openBracketSet.delete("(");

console.log(openBracketSet.has("(") ? `( exists in the set` : "'(' is not part of the set");