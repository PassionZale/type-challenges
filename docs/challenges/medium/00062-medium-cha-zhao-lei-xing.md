# 查找类型

<BtnGroup 
  issue="https://tsch.js.org/62/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31924"
/>

> 题目

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中通过指定公共属性`type`的值来获取相应的类型。

换句话说，在以下示例中：

`LookUp<Dog | Cat, 'dog'>`的结果应该是`Dog`，

`LookUp<Dog | Cat, 'cat'>`的结果应该是`Cat`。

```ts
interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type MyDog = LookUp<Cat | Dog, "dog">; // expected to be `Dog`
```

> 解答

使用 `{ type: T }` 来进行匹配，通过三目运算来提取正确的类型：

```ts
Dog extends {type: 'dog'} ? Dog : never

Cat extends {type: 'dog'} ? Cat : never
```

```ts
type LookUp<U, T extends string> = U extends { type: T } ? U : never
```