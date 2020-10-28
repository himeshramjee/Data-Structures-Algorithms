export abstract class SortBase<T> {
  protected items: T[];  // FIXME: Move up one level in class hierarchy
  protected maxItemCount: number;
  
  abstract sort(): void;

  constructor(maxItemCount: number) {
    this.items = new Array<T>();
    this.maxItemCount = maxItemCount;
  }

  public applySort() {
    console.log(`These ${this.items.length} items must be sorted:`);
    this.displayItems();

    // Start "high resolution" timer
    let hrStartTime = process.hrtime();

    // Do sort
    this.sort();

    // Stop timer
    let hrEndTime = process.hrtime(hrStartTime);

    // Show the results
    this.displayItems();
    console.info('Execution time (hr): %ds %dms', hrEndTime[0], hrEndTime[1] / 1000000);
  }

  protected swapItems(leftFromIndex: number, rightToIndex: number) {
    const z = this.items[leftFromIndex];
    this.items[leftFromIndex] = this.items[rightToIndex];
    this.items[rightToIndex] = z;
  }

  // Shuffle array - (apparently using Fisher-Yates Algorithm?)
  protected shuffleItems() {
    for (let i: number = this.maxItemCount - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.items[i];
      this.items[i] = this.items[j];
      this.items[j] = temp;
    }
  }

  protected displayItems() {
    process.stdout.write("\t");
    this.items.map(i => {
      process.stdout.write(i + ", ");
    });
    process.stdout.write("\n");
  }
}