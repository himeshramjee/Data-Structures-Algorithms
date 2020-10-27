const inputStrings: string[] = [ 
  "({[)}]", 
  "({[]})", 
  "   ", 
  "({[", 
  "(a{b[c]})", 
  "(d{e[f]}", 
  "[a]{b}(c)", 
  "]})}" 
];

// Test the above input strings to see if they are balanced. i.e. every bracket must be closed starting with inner most bracket to outermost.

// Maps available from ES6
const bracketsMap: Map<string, string> = new Map<string, string>([ 
  ["(", ")"], 
  ["{", "}"], 
  ["[", "]"] 
]);
const bracketsDataSet = new Set<string>();
bracketsMap.forEach((value, key) => {
  bracketsDataSet.add(key);
  bracketsDataSet.add(value);
});

function bracketsAreBalanced(inputString: string) : boolean {
  if (inputString.trim().length == 0) {
    return false;
  }

  // Simulate a Stack/Queue (former in this case) with the humble array
  let arrayStack: Array<string> = new Array<string>();
  let poppedChar;
  let inputChar;

  // Explode string into parts
  const charsToProcess = inputString.split('');
  for (let i = 0; i < charsToProcess.length; i++) {
    inputChar = charsToProcess[i];

    // Skip non bracket characters
    if (!bracketsDataSet.has(inputChar)) {
      continue;
    }
    
    // Push opening brackets to stack
    if (bracketsMap.has(inputChar)) {
      arrayStack.unshift(inputChar);
      continue;
    }

    // Match closing bracket to last pushed on stack
    poppedChar = arrayStack.shift();
    if (!poppedChar) {
      // Stack is empty and we've not matched a close bracket
      return false;
    }

    // Check if we've got a matching closing bracket
    if (bracketsMap.get(poppedChar) !== inputChar) {
      return false;
    }
  };

  return arrayStack.length == 0;
}

inputStrings.map(str => {
  if (bracketsAreBalanced(str)) {
    console.log(`${str} \n\t is balanced.`);
  } else {
    console.log(`${str} \n\t is not balanced.`);
  }
});