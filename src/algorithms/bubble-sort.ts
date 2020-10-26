import { HighlightSpanKind } from "typescript";

class BubbleSort {
  private items: number[];
  private itemCount: number;
  
  public constructor(itemsToSort: number[]) {
    this.items = itemsToSort;  
    this.itemCount = itemsToSort.length;
  }

  public displayItems() {
    console.log(`Displaying ${this.itemCount} sort items.`);
    this.items.map(i => {
      process.stdout.write(i + ", ");
    });
    console.log("\n");
  }

  public sort() {
    console.log("Snorting items...");

    // [3, 1, 8, 5, 2, 4, 9, 10, 6, 7]
    for (let outer = this.itemCount -1; outer >= 0; outer--) {
      for (let inner = 0; inner < outer; inner++) {
        if (this.items[inner] > this.items[inner + 1]) {
          this.swapItems(inner, inner + 1);
        }
      }
    }

    console.log("Items are now sorted.\n");
  }

  private swapItems(x: number, y: number) {
    const z = this.items[x];
    this.items[x] = this.items[y];
    this.items[y] = z;
  }
}

// ======================= Main :) ======================= 

console.clear();

const maxItemCount = 50;
const itemsToSort: number[] = new Array<number>();

// Populate arrary
for (let i: number = 1; i <= maxItemCount; i++) {
  itemsToSort.push(i);
}

// Shuffle array - (apparently using Fisher-Yates Algorithm?)
for (let i: number = itemsToSort.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = itemsToSort[i];
  itemsToSort[i] = itemsToSort[j];
  itemsToSort[j] = temp;
}

// Sort the array
const boobleSort: BubbleSort = new BubbleSort(itemsToSort);
boobleSort.displayItems();

// using "high resolution" timer
let hrStartTime = process.hrtime();
boobleSort.sort();
let hrEndTime = process.hrtime(hrStartTime);

// now show the results
boobleSort.displayItems();
console.info('Execution time (hr): %ds %dms', hrEndTime[0], hrEndTime[1] / 1000000);