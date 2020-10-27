// Only option in ES5
const bracketObject = { "(" : ")", "{" : "}", "[" : "]" };

// Maps available from ES6
const bracketMap = new Map<string, string>();

Object.entries(bracketObject).map((entry) => {
  bracketMap.set(entry[0], entry[1]);
});

console.log(`Bracket Map has ${bracketMap.size} entries`);
console.log(bracketMap);

console.log(bracketMap.has("(") ? `( is matched by ${bracketMap.get("(")}` : "'(' is not supported");

console.log("Deleting '(' from map...");
bracketMap.delete("(");

console.log(bracketMap.has("(") ? `( is matched by ${bracketMap.get("(")}` : "'(' is not supported");