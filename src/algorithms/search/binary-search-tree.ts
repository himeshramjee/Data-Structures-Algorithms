import { NumbersSearch } from "./numbers-search";
import { TreeNode } from "../../structures/tree-node";

class BinarySearchTree extends NumbersSearch {
  root: TreeNode<number> | null;

  constructor(dataSetSize: number = 50) {
    super(dataSetSize);

    this.root = null;

    this.dataset.map((n: number, i: number) => {
      if (!this.insert(n, i)) {
        console.log(`Failed to insert node with key ${n}.`);
      }
    });
  }

  find(searchKey: number, dataset?: number[]) : number {
    if (searchKey === undefined || searchKey === null) {
      console.log("A search key is required to run a search.");
      return -1;
    }

    if (this.root == null) {
      console.log(`Result: ${searchKey} does not exist in empty tree.`);
      return -1;
    }

    let keyNode: TreeNode<number> | null = this.findNode(searchKey);
    if (!keyNode) {
      // console.log(`Result: ${searchKey} does not exist in the tree. Result ${keyNode}.`);
      return -1;
    }

    if (keyNode.key === searchKey) {
      // console.log(`Result: ${searchKey} found with data: ${keyNode.data}`);
      return keyNode.data;
    }

    console.error(`Whoa! This should never have happened! findSubtreeForKey() should have returned null.`);
    return -1;
  }

  insert(key: number, data: number) : boolean {
    // Check for required input
    if ((key === undefined || key === null) || (data === undefined || data === null)) {
      console.log("Both key and data are required to insert a new node.");
      return false;
    }

    // Is this the first node being inserted?
    if (!this.root) {
      this.root = new TreeNode<number>(key, data, null);
      return true;
    }

    // Find the node to insert at
    let nextNode = this.root;
    let parentNode = null;
    while (true) {
      if (nextNode.key === key) {
        console.log(`Node with key ${key} already exists.`);
        return false;
      }

      // Check if we should insert left
      if (key < nextNode.key) {
        if (nextNode.leftChild) {
          parentNode = nextNode;
          nextNode = nextNode.leftChild;
          continue;
        } else {
          nextNode.leftChild = new TreeNode<number>(key, data, nextNode);
          return true;
        }
      }

      // Check if we should insert right
      if (key > nextNode.key) {
        if (nextNode.rightChild) {
          parentNode = nextNode;
          nextNode = nextNode.rightChild;
          continue;
        } else {
          nextNode.rightChild = new TreeNode<number>(key, data, nextNode);
          return true;
        }
      }
    }
  }

  // Illustrative only
  // Input: 2, 6, 10, 9, 1, 7, 3, 5, 8, 4
  //               2             
  //         /            \      
  //        1              6     
  //                     /   \   
  //                    3     10 
  //                   / \   / \ 
  //                  1   5 9   2
  //                     / /     
  //                    4  7     
  //                       \     
  //                        8    
  delete(key: number) : boolean {
    console.log(`\nDeleting ${key}`);

    let nodeToDelete : TreeNode<number> | null = this.findNode(key);
    let parentNode: TreeNode<number> | null = nodeToDelete?.parentNode ? nodeToDelete?.parentNode : null;

    if (!nodeToDelete) {
      console.log(`Node with key ${key} does not exist. Nothing has been deleted.`);
      return false;
    } else if (nodeToDelete.key != key) {
      console.log(`Unexpected key found. Expected ${key} but got ${nodeToDelete.key}. Nothing has been deleted.`);
      return false;
    }  // else, nodeToDelete exists so delete it next

    // Delete root node
    if (parentNode == null) {
      nodeToDelete = null;
      return true;
    }

    if (nodeToDelete.key === key) {
      // Delete node with no children - node is on left
      if (parentNode.leftChild?.key === nodeToDelete.key) {
        parentNode.leftChild = null;
        return true;
      }

      // Delete node with no children - node is on right
      if (parentNode.rightChild?.key === nodeToDelete.key) {
        parentNode.rightChild = null;
        return true;
      }

      // Delete node with 1 child - node is on left
      if (parentNode.leftChild?.key === nodeToDelete.key) {
        if (nodeToDelete.leftChild) {
          parentNode.leftChild = nodeToDelete.leftChild;
        }
        if (nodeToDelete.rightChild) {
          parentNode.leftChild = nodeToDelete.rightChild;
        }
        return true;
      }

      // Delete node with 1 child - node is on right
      if (parentNode.rightChild?.key === nodeToDelete.key) {
        if (nodeToDelete.leftChild) {
          parentNode.rightChild = nodeToDelete.leftChild;
        }
        if (nodeToDelete.rightChild) {
          parentNode.rightChild = nodeToDelete.rightChild;
        }
        return true;
      }

      // Delete a subtree/node with 2 children
      console.log("\t TODO: Deleting a subtree isn't yet supported.");
      return false;
    }

    return false;
  }

  private findNode(nodeKey: number) : TreeNode<number> | null {
    // console.log(`findNode searching for key ${nodeKey}`);
    if (!this.root) {
      // console.log(`${nodeKey} not found in empty tree.`);
      return null;
    }

    // Check key at root which has no parent
    if (this.root.key === nodeKey) {
      return this.root;
    }

    let currentNode: TreeNode<number> | null = this.root;
    while (true) {
      // Check if the search key is located in current subtree
      if (currentNode.leftChild?.key === nodeKey) {
        currentNode = currentNode.leftChild;
        // console.log(`Found ${currentNode.key} at left of parent node ${currentNode.parentNode?.key}`);
        return currentNode;
      }
      if (currentNode.rightChild?.key === nodeKey) {
        currentNode = currentNode.rightChild;
        // console.log(`Found ${currentNode.key} at right of parent node ${currentNode.parentNode?.key}`);
        return currentNode;
      }

      // Determine next node to search
      if (nodeKey > currentNode.key) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild;
          continue;
        } else {
          // Return - key not found
          currentNode = null;
          return null;
        }
      }
      if (nodeKey < currentNode.key) {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild;
          continue;
        } else {
          // Return - key not found
          currentNode = null;
          return null;
        }
      }

      // console.log("Key does not exist in tree.");
      // currentNode = null;
      return null;
    }
  }
}

function doSearch() {
  console.clear();
  console.log("\nStarting demo...\n");
  const binarySearchTree: BinarySearchTree = new BinarySearchTree(10);
  
  let runTestResult = binarySearchTree.runTest();
  console.log(`${runTestResult ? "All" : "Some"} internal runTest()s ${runTestResult ? "Passed" : "Failed."}.`);
  
  let deleteResult = binarySearchTree.delete(5);
  console.log(`${deleteResult ? "Node 5 was deleted\n" : "Failed to delete Node 5\n"}`);
  
  console.log(`Confirming that Node 5 is no longer in the tree...`);
  let result5 = binarySearchTree.find(5);
  console.log(`Result after deleting 5: ${result5} which is ${result5 == -1 ? "Correct." : "Incorrect."}`);
  console.log("\nDemo is done.");
}
doSearch();