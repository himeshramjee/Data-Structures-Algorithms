// Test the following input strings to see if they are balanced. i.e. every bracket must be closed starting with inner most bracket to outermost.

const inputStrings: string[] = [ 
  // FIXME: Yes these should be test assertions or at least proper objects but looking for quick way to eyeball results.
  "({[)}]       is not balanced", 
  "({[]})       is balanced", 
  "                            ", // is not balanced :)
  "             is not balanced", 
  "({[          is not balanced", 
  "(a{b[c]})    is balanced", 
  "(d{e[f]}     is not balanced", 
  "[a]{b}(c)    is balanced", 
  "]})}         is not balanced",
  "a{b(c[d]e)f} is balanced" 
];

const bracketsDataSet = new Set<string>();
const bracketsMap: Map<string, string> = new Map<string, string>([ 
  ["(", ")"], 
  ["{", "}"], 
  ["[", "]"] 
]);

bracketsMap.forEach((value, key) => {
  bracketsDataSet.add(key);
  bracketsDataSet.add(value);
});

function getCharsToProcess(input: string) : string[] {
  if (input.trim().length == 0) {
    return [];
  }
  const charsToProcess = input.split('');
  let countBrackets = 0;
  charsToProcess.map(c => {
    if (bracketsDataSet.has(c)) {
      countBrackets++;
    }
  });

  return countBrackets >= 2 ? charsToProcess : [];
}

function bracketsAreBalanced(inputString: string) : boolean {
  const charsToProcess = getCharsToProcess(inputString);
  if (charsToProcess.length == 0) {
    return false;
  }

  // Simulate a Stack/Queue (former in this case) with the humble array
  let arrayStack: Array<string> = new Array<string>();
  let poppedChar;
  let inputChar;

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
    console.log(`${str} \t -> Yes balanced.`);
  } else {
    console.log(`${str} \t -> Nope not balanced.`);
  }
});