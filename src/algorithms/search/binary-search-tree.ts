import { textChangeRangeIsUnchanged } from "typescript";
import { NumbersSearch } from "./numbers-search";

class TreeNode<T, O> {
  key: T;
  data: O;
  leftChild?: TreeNode<T, O>;
  rightChild?: TreeNode<T, O>;

  constructor(key: T, data: O, leftChild?: TreeNode<T, O>, rightChild?: TreeNode<T, O>) {
    this.key = key;
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

  displayNode() : void {
    console.log(`${this.key} has ${this.data ? "data" : "no data"}. \n\tLeftChild: ${this.leftChild ? this.leftChild.key : "none"}\n\tRigthChild: ${this.rightChild ? this.rightChild.key : "none"}`)
  }
}

class Tree<T, O> {
  root: TreeNode<T, O> | undefined;

  find(key: T) {
    if (key === undefined || key === null) {
      console.log("A search key is required to run a search.");
      return;
    }

    console.log(`Finding ${key}`);

    let nextNode: TreeNode<T, O> | undefined = this.root;

    while (nextNode != undefined) {
      // Check if the search key is located in current subtree
      if (nextNode.key === key) {
        console.log(`Found ${nextNode.key} in node with data ${nextNode.data} `);
        break;
      }
      if (nextNode.leftChild?.key === key) {
        console.log(`Found ${nextNode.leftChild.key} in a left node with data ${nextNode.leftChild.data} `);
        break;
      }
      if (nextNode.rightChild?.key === key) {
        console.log(`Found ${nextNode.rightChild.key} in a right node with data ${nextNode.rightChild.data} `);
        break;
      }

      // Determine next node to search
      if (key > nextNode.key) {
        if (nextNode.rightChild) {
          nextNode = nextNode.rightChild;
          console.log(`\tAssigning right side nextNode (${nextNode.key}) to continue search...`);
          continue;
        } else {
          // Return key not found
        }
      }
      if (key < nextNode.key) {
        if (nextNode.leftChild) {
          nextNode = nextNode.leftChild;
          console.log(`\tAssigning left side nextNode (${nextNode.key}) to continue search...`);
          continue;
        } else {
          // Return key not found
        }
      }

      console.log("Key does not exist in tree.");
      nextNode = undefined;
    }
  }

  insert(key: T, data: O) : boolean {
    // Check for required input
    if ((key === undefined || key === null) || (data === undefined || data === null)) {
      console.log("Both key and data are required to insert a new node.");
      return false;
    }

    // Is this the first node being inserted?
    if (!this.root) {
      this.root = new TreeNode<T, O>(key, data);
      return true;
    }

    // Find the node to insert at
    let nextNode = this.root;
    while (true) {
      if (nextNode.key === key) {
        console.log(`Node with key ${key} already exists.`);
        return false;
      }

      // Check if we should insert left
      if (key < nextNode.key) {
        if (nextNode.leftChild) {
          nextNode = nextNode.leftChild;
          continue;
        } else {
          nextNode.leftChild = new TreeNode<T, O>(key, data);
          return true;
        }
      }

      // Check if we should insert right
      if (key > nextNode.key) {
        if (nextNode.rightChild) {
          nextNode = nextNode.rightChild;
          continue;
        } else {
          nextNode.rightChild = new TreeNode<T, O>(key, data);
          return true;
        }
      }
    }
  }

  delete(key: T) {
    console.log(`Deleting ${key}`);
  }
}

class BinarySearchTree extends NumbersSearch {
  private tree: Tree<number, number>;

  constructor(dataSetSize: number = 5) {
    super(dataSetSize);

    this.tree = new Tree<number, number>();

    this.dataset.map((n: number) => {
      if (!this.tree.insert(n, n)) {
        console.log(`Failed to insert node with key ${n}.`);
      }
    });
  }

  find(searchKey: number, dataset?: number[]) : number {
    this.tree.find(searchKey);

    return searchKey;
  }
}

console.clear();
const binarySearchTree: BinarySearchTree = new BinarySearchTree();
const searchKey : number = 1;
console.log(`Finding ${searchKey}...`);
binarySearchTree.find(searchKey);
console.log("Done.");