export abstract class SearchBase<T> {

  protected abstract find(searchKey: T, dataset: T[]) : T;

  // Shuffle array - (apparently using Fisher-Yates Algorithm?)
  protected shuffleItems(itemsStore: T[]) {
    for (let i: number = itemsStore.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = itemsStore[i];
      itemsStore[i] = itemsStore[j];
      itemsStore[j] = temp;
    }
  }

  public displayItems(itemsStore: T[]) {
    process.stdout.write("\t");
    itemsStore.map(i => {
      process.stdout.write(i + ", ");
    });
    process.stdout.write("\n");
  }
}