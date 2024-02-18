# DeepMutable

<BtnGroup 
	issue="https://tsch.js.org/17973/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32273"
/>

> 题目

实现一个通用的 `DeepMutable<T>` ，它使对象的每个属性，及其递归的子属性 - 可变。

例如：

```ts
type X = {
  readonly a: () => 1;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "s";
        };
        readonly k: "hello";
      };
    };
  };
};

type Expected = {
  a: () => 1;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "s";
        };
        k: "hello";
      };
    };
  };
};

type Todo = DeepMutable<X>; // should be same as `Expected`
```

你可以假设我们在这个挑战中只处理对象。 数组、函数、类等不需要考虑。 但是，您仍然可以通过涵盖尽可能多的不同案例来挑战自己。

> 解答

使用 `-readonly` 移除属性中的只读限制：

```ts
type DeepMutable<T extends Record<keyof any, any>> = T extends (
  ...args: any[]
) => any
  ? T
  : {
      -readonly [K in keyof T]: DeepMutable<T[K]>;
    };
```
