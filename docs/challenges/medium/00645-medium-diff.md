# Diff

<BtnGroup 
  issue="https://tsch.js.org/645/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31974"
/>

> 题目

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string;
  b: number;
};
type Bar = {
  a: string;
  c: boolean;
};

type Result1 = Diff<Foo, Bar>; // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo>; // { b: number, c: boolean }
```

> 解答

```ts
namespace t00645 {
  // 在对象类型上使用 联合类型 | 和 交叉类型 & 的区别
  type O1 = {
    name: string;
    age: string;
  };

  type O2 = {
    name: string;
    gender: number;
  };

  // type K1 = "name" | "age" | "gender"
  type K1 = keyof (O1 & O2);
  // type K2 = "name"
  type K2 = keyof (O1 | O2);

  // type S1 = {
  //   age: string;
  //   gender: number;
  // }
  type S1 = Omit<O1 & O2, keyof (O1 | O2)>;
}
```

合并答案：

```ts
type Diff<O1, O2> = Omit<O1 & O2, keyof (O1 | O2)>;
```
