export class TreeNode<O> {
  key: number;
  data: O;
  leftChild: TreeNode<O> | null;
  rightChild: TreeNode<O> | null;
  parentNode: TreeNode<O> | null;

  constructor(key: number, data: O, parent: TreeNode<O> | null) {
    this.key = key;
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parentNode = parent;
  }

  displayNode() : void {
    console.log(`${this.key} has ${this.data ? "data" : "no data"}. \n\tLeftChild: ${this.leftChild ? this.leftChild.key : "none"}\n\tRigthChild: ${this.rightChild ? this.rightChild.key : "none"}\n\tParent: ${this.parentNode ? this.parentNode : "none"}`)
  }
}