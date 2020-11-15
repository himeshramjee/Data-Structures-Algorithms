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
  serializedItems: string = "";
  
  constructor(startNode?: DCPNode<string>) {
    this.root = null;
    if (startNode) {
      this.root = startNode;
    }
  }

  serialize(item: DCPNode<string>): String {
    console.log("Serializing items...");
    this.serializer(item);
    console.log(`Serialization result: ${this.serializedItems}.`);

    return this.serializedItems;
  }

  private serializer(item: DCPNode<string> | null) {
    if (!item) {
      return;
    }

    // Visit a node
    this.serializedItems += " " + item.value;
    console.log(`\t processed node: ${item.value}. SerializedItems: ${this.serializedItems}`);

    // Recurse left
    if (item.left) {
      this.serializer(item.left);
    } else {
      this.serializedItems += " -1";
    }

    // Recurse right
    if (item.right) {
      this.serializer(item.right);
    } else {
      this.serializedItems += " -1";
    }
  }

  deserialize(serializedObject: string): DCPNode<string> | null {
    const items: string[] = serializedObject.split(',');

    if (items.length < 1) {
      console.error("Cannot deserialize emtpy object.");
      return null;
    }

    // Construct all remaining nodes
    return this.deserializer(items, null);
  }

  private deserializer(items: string[], parent: DCPNode<string> | null, goingLeft: boolean = true) : DCPNode<string> | null {
    if (items.length === 0) {
      return null;
    }

    // Grab next item and construct new node
    let item: string | null = this.getNextItem(items);
    if (!item) {
      return null;
    }
    let tempNode = new DCPNode<string>(item, null, null);
    if (parent) {
      if (goingLeft) {
        parent.left = tempNode;
      } else {
        parent.right = tempNode;
      }
    }

    // Visit node
    console.log(`\t New ${goingLeft ? "left" : "right" } node: ${tempNode.value} ${parent ? "rooted at " + parent.value : "is the root node"}`);

    // Recurse left
    this.deserializer(items, tempNode);

    // Recurse right
    this.deserializer(items, tempNode, false);

    return tempNode;
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
  dcpBT.serialize(root);
}

realizeTree();
