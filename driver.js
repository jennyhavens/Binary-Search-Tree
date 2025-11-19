import { Tree } from "./binarySearchTree.js";
import { prettyPrint } from "./binarySearchTree.js";

function randomNumbersArray(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

const randomArray = randomNumbersArray(10);
const bst = new Tree(randomArray);

console.log("=== INITIAL TREE ===");
prettyPrint(bst.root);
console.log("Initial tree (in-order):", collectValues(bst, "inOrderForEach"));
console.log("Tree (level-order):", collectValues(bst, "levelOrderForEach"));
console.log("Tree (pre-order):", collectValues(bst, "preOrderForEach"));
console.log("Tree (post-order):", collectValues(bst, "postOrderForEach"));

console.log("Is the tree balanced?", bst.isBalanced());

console.log("\n=== AFTER INSERTING VALUES ===");
console.log("Inserting additional values to unbalance the tree...");
[101, 102, 103, 104, 105].forEach((num) => bst.insert(num));

prettyPrint(bst.root);
console.log("Is the tree balanced after insertions?", bst.isBalanced());

console.log("\n=== AFTER REBALANCING ===");
console.log("Rebalancing the tree...");
bst.rebalance();

prettyPrint(bst.root);
console.log("Is the tree balanced after rebalancing?", bst.isBalanced());
console.log(
  "Rebalanced tree (in-order):",
  collectValues(bst, "inOrderForEach")
);
console.log(
  "Rebalanced tree (level-order):",
  collectValues(bst, "levelOrderForEach")
);
console.log(
  "Rebalanced tree (pre-order):",
  collectValues(bst, "preOrderForEach")
);
console.log(
  "Rebalanced tree (post-order):",
  collectValues(bst, "postOrderForEach")
);

// Helper function to collect values into an array
function collectValues(tree, traversalMethod) {
  const values = [];
  tree[traversalMethod]((value) => values.push(value));
  return values;
}
