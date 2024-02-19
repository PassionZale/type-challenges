# InorderTraversal

<BtnGroup 
	issue="https://tsch.js.org/3376/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/14093"
/>

> 题目

Implement the type version of binary tree inorder traversal.

For example:

```typescript
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

type A = InorderTraversal<typeof tree1>; // [1, 3, 2]
```

> 解答

```ts
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : [];
```