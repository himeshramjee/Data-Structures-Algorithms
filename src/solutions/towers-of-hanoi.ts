class HanoiDisk {
  size: number;

  constructor(sizeOfDisk: number) {
    this.size = sizeOfDisk;
  }
}

class HanoiTower {
  private maxDisks: number;
  private disks: Array<HanoiDisk>;

  public name: string;

  constructor(name: string, totalDiskCount: number){
    this.name = name;
    this.maxDisks = totalDiskCount;
    this.disks = new Array<HanoiDisk>();
  }

  createDisks() {
    if (!this.isEmpty()) {
      this.disks = new Array<HanoiDisk>(this.maxDisks);
    }

    for(let c = 1; c <= this.maxDisks; c++) {
      this.disks.push(new HanoiDisk(c));
    }
  }

  push(disk: HanoiDisk): boolean {
    if (this.isFull()) {
      return false;
    }

    const topDisk = this.peek();
    if (topDisk && disk.size > topDisk.size) {
      return false;
    }

    this.disks.unshift(disk);

    return true;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    return this.disks.shift();
  }

  private peek() {
    if (!this.isEmpty()) {
      return new HanoiDisk(this.disks[0].size);
    }

    return null;
  }

  private isFull() : boolean {
    return this.disks.length == this.maxDisks;
  }

  private isEmpty() : boolean {
    return this.disks.length == 0;
  }

  display() {
    if (this.isEmpty()) {
      console.log(`Tower - ${this.name} has 0 disks.`);
      return;
    }

    console.log(`Tower - ${this.name} has ${this.disks.length} disks`);
    this.disks.map(d => {
      console.log(`\t${d.size}`);
    });
    console.log();
  }
}

class TowersOfHanoi {
  sourceTower: HanoiTower;
  intermediateTower: HanoiTower;
  destinationTower: HanoiTower;

  constructor(diskCount: number) {
    this.sourceTower = new HanoiTower("A", diskCount);        // Source
    this.intermediateTower = new HanoiTower("B", diskCount);  // Intermediate
    this.destinationTower = new HanoiTower("C", diskCount);   // Destination

    this.sourceTower.createDisks();

    this.sourceTower.display();
    this.intermediateTower.display();
    this.destinationTower.display();

    this.solvePuzzle(diskCount);
  }

  solvePuzzle(diskCount: number) {
    console.log("\nSolve the puzzle...");

    // Start "high resolution" timer
    let hrStartTime = process.hrtime();
    this.moveDisks(diskCount, this.sourceTower, this.intermediateTower, this.destinationTower);
    // Stop timer
    let hrEndTime = process.hrtime(hrStartTime);
    
    console.log("\nResults:");
    this.sourceTower.display();
    this.intermediateTower.display();
    this.destinationTower.display();
    
    console.info('Execution time (hr): %ds %dms', hrEndTime[0], hrEndTime[1] / 1000000);
  }

  private moveDisks(countDisksToMove: number, from: HanoiTower, intermediate: HanoiTower, to: HanoiTower) : boolean {
    // Check for base case, intermediate move not required
    if (countDisksToMove === 1) {
      return this.moveOneDisk(from, to);
    }

    // Intermediate move
    // console.log(`\tDisk ${countDisksToMove} from ${from.name} to ${to.name} [Temp]`);
    // this.moveOneDisk(from, to);
    this.moveDisks(countDisksToMove - 1, from, to, intermediate);

    // Destination move
    console.log(`\tDisk (${countDisksToMove}) from ${from.name} to ${to.name} [Dest]`);
    this.moveOneDisk(from, to);
    this.moveDisks(countDisksToMove - 1, intermediate, from, to);

    return true;
  }

  private moveOneDisk(from: HanoiTower, to: HanoiTower) : boolean {
    const disk = from.pop();
      if (!disk) {
        console.error(`\t[Error] No disk to move from ${from.name} to ${to.name}`);
        return false;
      }

      console.log(`Disk ${disk.size} from ${from.name} to ${to.name}`);
      if (!to.push(disk)) {
        console.error(`\t[Error] Failed to move ${disk.size} from ${from.name} to ${to.name}`);
      };

      return true;
  }
}

const toh: TowersOfHanoi = new TowersOfHanoi(16);

console.log("THIS IS NOT A RELIABLE SOLUTION (mostly cos I still don't understand why it works)");