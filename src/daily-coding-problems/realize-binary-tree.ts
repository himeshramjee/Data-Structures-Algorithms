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
  root: DCPNode<string>;

  constructor(startNode: DCPNode<string>) {
    this.root = startNode;
  }

  serialize(): string {

    return '';
  }

  deserialize(serializedObject: string): DCPNode<string> {
    
    return this.root;
  }
}

let node: DCPNode<string> = new DCPNode("root", new DCPNode<string>("left.left", null, null), new DCPNode("right", null, null));
let dcpBT: DCPBinaryTree = new DCPBinaryTree(node);

let serialized = dcpBT.serialize();
let deserialized: DCPNode<string> = dcpBT.deserialize(serialized);

if (deserialized.left?.left?.value === "left.left") {
  console.log("Passed");
} else {
  console.log("Failed");
}
