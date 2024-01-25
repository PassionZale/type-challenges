# 标题

<BtnGroup 
  issue="https://tsch.js.org/11/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31849"
/>

> 题目

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

例如：

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; 
// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

> 解答

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [key in T[number]]: key
}
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/5896"
/>

```ts
// 使用原来的  any[]  无法满足 test-case
// 为 string symbol number这三个可以为对象键的类型
type TupleToObject<T extends readonly (string | symbol | number)[]> = {
  [P in T[number]]: P
}

// ts 内置的类型 PropertyKey
// declare type PropertyKey = string | number | symbol;
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
```