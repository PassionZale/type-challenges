# Includes

<BtnGroup 
  issue="https://tsch.js.org/898/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31866"
/>

> 题目

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
```

> 解答

```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/1568"
/>

> ```ts
> /**
> Returns a boolean for whether given two types are equal.
> @link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
> */
> type IsEqual<T, U> =
> 	(<G>() => G extends T ? 1 : 2) extends
> 	(<G>() => G extends U ? 1 : 2)
> 		? true
> 		: false;
> 
> type Includes<Value extends any[], Item> =
> 	IsEqual<Value[0], Item> extends true
> 		? true
> 		: Value extends [Value[0], ...infer rest]
> 			? Includes<rest, Item>
> 			: false;
> ```

