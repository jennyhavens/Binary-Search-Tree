export default class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    // Sort and remove duplicates
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedUniqueArray);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    const insertRecursively = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = insertRecursively(node.left, value);
      } else if (value > node.data) {
        node.right = insertRecursively(node.right, value);
      }
      return node;
    };
    this.root = insertRecursively(this.root, value);
  }

  deleteItem(value) {
    const deleteRecursively = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value < node.data) {
        node.left = deleteRecursively(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursively(node.right, value);
      } else {
        // Node to delete found
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        // Node has two children, find the inorder successor
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        node.data = successor.data;
        node.right = deleteRecursively(node.right, successor.data);
      }
      return node;
    };
    this.root = deleteRecursively(this.root, value);
  }

  find(value) {
    const findRecursively = (node, value) => {
      if (node === null) {
        return false;
      }
      if (value === node.data) {
        return true;
      }
      return value < node.data
        ? findRecursively(node.left, value)
        : findRecursively(node.right, value);
    };
    return findRecursively(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    if (this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode.data);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    const inOrderRecursively = (node) => {
      if (node !== null) {
        inOrderRecursively(node.left);
        callback(node.data);
        inOrderRecursively(node.right);
      }
    };
    inOrderRecursively(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    const preOrderRecursively = (node) => {
      if (node !== null) {
        callback(node.data);
        preOrderRecursively(node.left);
        preOrderRecursively(node.right);
      }
    };
    preOrderRecursively(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    const postOrderRecursively = (node) => {
      if (node !== null) {
        postOrderRecursively(node.left);
        postOrderRecursively(node.right);
        callback(node.data);
      }
    };
    postOrderRecursively(this.root);
  }

  height(value) {
    const findNode = (node, value) => {
      if (node === null) return null;
      if (value === node.data) return node;
      return value < node.data
        ? findNode(node.left, value)
        : findNode(node.right, value);
    };

    const calculateHeight = (node) => {
      if (node === null) return -1;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    const targetNode = findNode(this.root, value);
    if (targetNode === null) return -1; // Value not found
    return calculateHeight(targetNode);
  }

  depth(value) {
    const calculateDepth = (node, value, depth = 0) => {
      if (node === null) return -1;
      if (value === node.data) return depth;
      return value < node.data
        ? calculateDepth(node.left, value, depth + 1)
        : calculateDepth(node.right, value, depth + 1);
    };
    return calculateDepth(this.root, value);
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return 0;

      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1; // Not balanced
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkBalance(this.root) !== -1;
  }

  rebalance() {
    const nodes = [];
    this.inOrderForEach((value) => {
      nodes.push(value);
    });
    this.root = this.buildBalancedTree(nodes);
  }

  buildBalancedTree(nodes) {
    if (nodes.length === 0) return null;

    const mid = Math.floor(nodes.length / 2);
    const node = new Node(nodes[mid]); // Should be Node, not TreeNode
    node.left = this.buildBalancedTree(nodes.slice(0, mid));
    node.right = this.buildBalancedTree(nodes.slice(mid + 1));
    return node;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
export { prettyPrint };
