/*
Given an example of a city map:

# # # #  # 
#  .  .   .  # 
#  .  # H # 
#  X # H # 
#  # # #  # 

where:
# ->A building
. -> Open road
H -> A hotel
X -> Your start position.

Question 1: Explain how would you determine the number of hotels with n number of steps where say n = 7.
Question 2: Write your solution in code/pseudocode.
Question 3: What is the runtime complexity of your code?
*/
// City Traveller - Count number of hotels that are within distance K (inclusive)
const MAP_LEGEND_EMPTY_CELL = ".";
const MAP_LEGEND_BUILDING = "#";
const MAP_LEGEND_START_POSITION = "X";
const MAP_LEGEND_HOTEL = "H";

let cityMap: string[][] = [];
let mapColumnCount: number = 0;
let mapRowCount: number = 0;
let maxStepsToHotel: number = 0;

// Read city map from flat file or in memory list
let cityMapInput : Array<string> = new Array<string>();
console.log("Using default input data");
cityMapInput = new Array<string>("5 5", "7", "#####", "#...#", "#.#H#", "#X#H#", "#####"); 
if (cityMapInput.length <= 2) {
  console.log("Failed to get input data.");
}

// Get map dimensions
populateMapConstraints();

// Transform city map into 2d Array
transformInputDataToArray();

// Find all 
printMap();

// Helper functions
function populateMapConstraints() {
  let dimensionData = cityMapInput.shift();
  let maxStepsData = cityMapInput.shift();

  if (!dimensionData || !maxStepsData) {
    throw new Error("Failed to load map constraint data.");
  }

  mapRowCount = parseInt(dimensionData.split(" ")[0]);
  mapColumnCount = parseInt(dimensionData.split(" ")[1]);
}

function transformInputDataToArray() {
  let cityMapInputEntryItems;
  for (let r = 0; r < mapRowCount; r++) {
    cityMapInputEntryItems = cityMapInput.shift()?.split('');

    if (!cityMapInputEntryItems) {
      throw new Error("Invalid map input entry.");
    }

    cityMap[r] = new Array<string>(5);
    for (let c = 0; c < mapColumnCount; c++) {
      cityMap[r][c] = cityMapInputEntryItems[c];
    }
  }
}

function printMap() {
  for (let r = 0; r < mapRowCount; r++) {
    for (let c = 0; c < mapColumnCount; c++) {
      process.stdout.write(`${cityMap[r][c]} `);
    }
    console.log();
  }
}