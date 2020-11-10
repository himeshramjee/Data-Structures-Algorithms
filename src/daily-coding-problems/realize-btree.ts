/*
Good morning! Here's your coding interview problem for today.
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
*/

import { readFromFile, splitEntry } from "../solutions/read-file";

class DCPNode<T> {
  value: T
  left: DCPNode<T> | null;
  right: DCPNode<T> | null;

  constructor(value: T, left: DCPNode<T> | null, right: DCPNode<T> | null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class DCPBinaryTree {
  root: DCPNode<string> | null;
  emptyNodeMarker: string = "-1";

  constructor(startNode?: DCPNode<string>) {
    this.root = null;
    if (startNode) {
      this.root = startNode;
    }
  }

  // Mock functions - the serialize and deserialize only print out values in order that they would be visited to an actual BTree
  serialize(root: DCPNode<string>): String {
    let serializedItems: String = "";

    console.log("Serializing items...");
    this.serializer(serializedItems, root);
    console.log("Serialization result:");
    console.log(serializedItems);

    return serializedItems;
  }

  private serializer(serializedItems: String = "", root: DCPNode<string> | null) {
    if (!root) {
      return;
    }
    // Simulate go left
    this.serializer(serializedItems, root.left);
    // Visit a node
    console.log(`\t processed node: ${root.value}`);
    serializedItems = serializedItems + " " + root.value;
    // Simulate go right
    this.serializer(serializedItems, root.right);
  }

  deserialize(serializedObject: string): DCPNode<string> | null {
    const items: string[] = serializedObject.split(',');

    if (items.length < 1) {
      console.error("Cannot deserialize emtpy object.");
      return null;
    }

    // Create the root node
    const item = items.shift();
    if (!item) {
      console.error("Missing root item.");
      return null;
    }
    let root = new DCPNode<string>(item, null, null);
    console.log(`Root node: ${root.value}`);

    // Construct all remaining nodes
    this.deserializer(items, root);

    return root;
  }

  private deserializer(items: string[], subtreeRoot: DCPNode<string>) : DCPNode<string> | null {
    if (items.length === 0) {
      return null;
    }

    // Grab next item
    let tempNode = null;
    let item: string | null = this.getNextItem(items);
    if (!item) {
      return null;
    }

    console.log(`\t Next item: ${item} with root ${subtreeRoot ? subtreeRoot.value : "n/a"}`);

    // Construct new left node
    tempNode = new DCPNode<string>(item, null, null);
    subtreeRoot.left = tempNode;

    // Simulate go left
    this.deserializer(items, tempNode);

    // Visit a node
    console.log(`\t new node: ${tempNode.value} rooted at ${subtreeRoot ? subtreeRoot.value : "n/a"}`);

    // // Grab next item
    // item = this.getNextItem(items);
    // if (!item) {
    //   return null;
    // }
    // // Construct new right node
    // tempNode = new DCPNode<string>(item, null, null);

    // Simulate go right
    subtreeRoot.right = this.deserializer(items, tempNode);

    return subtreeRoot;
  }

  private getNextItem(items: string[]) : string | null {
    const item: string | undefined = items.shift();

    if (!item || item === this.emptyNodeMarker) {
      return null;
    }

    return item;
  }
}

// function runRealizeTreeTest() {
//   let node: DCPNode<string> = new DCPNode("root", 
//     new DCPNode<string>("left.left", null, null), 
//     new DCPNode<string>("right", null, null));

//   let dcpBT: DCPBinaryTree = new DCPBinaryTree(node);

//   let serialized = dcpBT.serialize();
//   let deserialized: DCPNode<string> = dcpBT.deserialize(serialized);

//   if (deserialized.left?.left?.value === "left.left") {
//     console.log("Passed");
//   } else {
//     console.log("Failed");
//   }
// }

function getBTreeDataFromDisk(): string[] {
  let treeValues: string[] = [];

  let fileReadResult: boolean = !readFromFile("../daily-coding-problems/data/serialized-btree.txt", treeValues, splitEntry);
  if (fileReadResult || treeValues.length < 1) {
    throw new Error("Failed to read input file. Exiting program.");
  }
  console.log("Working with following input from file...");
  treeValues.map((entry) => {
    process.stdout.write(`${entry} `);
  });
  process.stdout.write("\n\n");

  return treeValues;
}

function realizeTree() {
  // Read input data from disk
  let treeValues: string[] = getBTreeDataFromDisk();
  
  let dcpBT: DCPBinaryTree = new DCPBinaryTree();

  // Deserialize into BTree
  console.log("Constructing (deserializing) into BTree...");
  const btreeData = treeValues.join(',');
  const root: DCPNode<string> | null = dcpBT.deserialize(btreeData);

  // Serialize for on-disk format
  if (!root) {
    console.error("Deserialize returned invalid root node. The fucker, how dare it.");
    return;
  }
  // dcpBT.serialize(root);
}

realizeTree();
