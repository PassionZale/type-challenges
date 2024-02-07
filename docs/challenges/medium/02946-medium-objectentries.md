# ObjectEntries

<BtnGroup 
	issue="https://tsch.js.org/2946/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32076"
/>

> 题目

Implement the type version of `Object.entries`

For example

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];
```

> 解答

数组转联合类型用 `[number]` 作为下标：

```ts
// const sizes: readonly ["small", "medium", "large"]
const sizes = ["small", "medium", "large"] as const;

// type SizesUnion = "small" | "medium" | "large"
type SizesUnion = (typeof sizes)[number];
```

对象转联合类型用 `[keyof T]` 作为下标：

```ts
type Foo = {
  age: 18;
  name: "Tom";
};

// type FooUnion = 18 | "Tom"
type FooUnion = Foo[keyof Foo];
```

第一步，需要将所给定的泛型 `Model` 的 `value` 转换为 `[key, value]` 的元祖：

```ts
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ObjectValueToTuple<T> = {
  [K in keyof T]: [K, T[K]];
};

// type S = {
//     name: ["name", string];
//     age: ["age", number];
//     locations: ["locations", string[] | null];
// }
type S = ObjectValueToTuple<Model>;
```

第二步，将对象转联合类型：

```ts
type ObjectEntries<T> = ObjectValueToTuple<T>[keyof T];

// type S1 = ["name", ["name", string]] | ["age", ["age", number]] | ["locations", ["locations", string[] | null]]
type S1 = ObjectEntries<S>;
```

最终得到答案：

```ts
type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
```

但是这个答案无法满足：

```ts
// type S2 =
		|	["name", string | undefined]
		| ["age", number | undefined]
		| ["locations", string[] | null | undefined]
		| undefined
type S2 = ObjectEntries<Partial<Model>>

// type S3 = ["key", undefined] | undefined
type S3 = ObjectEntries<{ key?: undefined }>
```

继续优化答案，

使用 `Required<Model>` 将泛型中的 `key` 变成非可选，这样可以处理传入 `Partial<Model>` 的场景，

当 `value` 为 `undefined` 时，返回 `undefined`，兼容 `undefined` 被移除的场景。

> 当需要判断两个类型全等时，可以将源类型和目标类型转换为元祖，使用 `extends` 进行判断：
> `[T[K]] extends [undefined]`

```ts
type ObjectEntries<T> = {
  [K in keyof Required<T>]: [
    K,
    [T[K]] extends [undefined] ? undefined : Required<T>[K]
  ];
}[keyof T];
```
