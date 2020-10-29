class TowersApp {
  run(nDisks: number = 3) {
    this.doTowers(nDisks, "A", "B", "C");
  }
  
  doTowers(topN: number, from: string, inter: string, to: string) {
    if(topN==1) {
      console.log(`Disk ${topN} from ${from} to ${to}`);
    } else {
      // console.log(` Disk ${topN} from ${from} to ${to}`);
      this.doTowers(topN-1, from, to, inter); // from-->inter
      
      console.log(`Disk ${topN} from ${from} to ${to}`);
      this.doTowers(topN-1, inter, from, to); // inter-->to
    }
  }
}

const ta = new TowersApp();
ta.run(10);