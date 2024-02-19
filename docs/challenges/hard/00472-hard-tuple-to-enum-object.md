# Tuple to Enum Object

<BtnGroup 
	issue="https://tsch.js.org/472/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/10450"
/>

> 题目

枚举是 TypeScript 的一种原生语法（在 JavaScript 中不存在）。因此在 JavaScript 中枚举会被转成如下形式的代码：

```js
let OperatingSystem;
(function (OperatingSystem) {
  OperatingSystem[(OperatingSystem["MacOS"] = 0)] = "MacOS";
  OperatingSystem[(OperatingSystem["Windows"] = 1)] = "Windows";
  OperatingSystem[(OperatingSystem["Linux"] = 2)] = "Linux";
})(OperatingSystem || (OperatingSystem = {}));
```

在这个问题中，你实现的类型应当将给定的字符串元组转成一个行为类似枚举的对象。此外，枚举的属性一般是 `pascal-case` 的。

```ts
Enum<["macOS", "Windows", "Linux"]>;
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
```

如果传递了第二个泛型参数，且值为 `true`，那么返回值应当是一个 `number` 字面量。

```ts
Enum<["macOS", "Windows", "Linux"], true>;
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
```

> 解答

方法一：

```ts
type EnsureArray<T, R = string> = T extends R[] ? T : never;

type Enum<
  T extends readonly string[],
  B extends boolean = false,
  R extends Readonly<Record<string, any>> = Readonly<{}>,
  Index extends unknown[] = []
> = T extends readonly [infer F, ...infer Rest]
  ? Enum<
      Readonly<EnsureArray<Rest>>,
      B,
      Readonly<
        R & {
          [K in F & string as Capitalize<K>]: B extends true
            ? Index["length"]
            : K;
        }
      >,
      [...Index, unknown]
    >
  : R;
```

方法二：

```ts
type EnsureArray<T, Type = string> = T extends Type[] ? T : never;
type Enum<T extends readonly string[], B extends boolean = false> = {
  readonly [key in T[number] as Capitalize<key>]: B extends true
    ? FindIndex<T, key>
    : key;
};
type FindIndex<
  T extends readonly string[],
  K extends string,
  Index extends unknown[] = []
> = T extends readonly [infer F, ...infer Rest]
  ? F extends K
    ? Index["length"]
    : FindIndex<EnsureArray<Rest>, K, [...Index, unknown]>
  : never;

// FindIndex 另一种写法
type FindIndex<
  T extends readonly string[],
  E extends string,
  Index extends unknown[] = []
> = T extends readonly [infer L, ...infer Rest]
  ? [E, L] extends [L, E]
    ? Index["length"]
    : FindIndex<EnsureArray<Rest>, E, [...Index, unknown]>
  : never;

// FindIndex 另一种写法
type FindIndex<
  T extends readonly string[],
  K extends string,
  Index extends unknown[] = []
> = T[Index["length"]] extends K
  ? Index["length"]
  : FindIndex<T, K, [...Index, unknown]>;
```

方法三：

```ts
type Enum<T extends readonly string[], B extends boolean = false> = {
  [key in keyof T as T[key] extends string
    ? Capitalize<T[key]>
    : never]: B extends false ? T[key & string] : StringToNumber<key & string>;
};

type StringToNumber<
  S extends string,
  R extends unknown[] = []
> = S extends `${R["length"]}`
  ? R["length"]
  : StringToNumber<S, [...R, unknown]>;
```

方法四：

```ts
type TupleIndex<T extends readonly unknown[]> = T extends readonly [
  ...infer Rest,
  infer L
]
  ? TupleIndex<Rest> & { [p in L & string]: Rest["length"] }
  : {};

type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [K in keyof TupleIndex<T> as Capitalize<K & string>]: N extends true
    ? TupleIndex<T>[K]
    : K;
};
```

方法五：

```ts
type Format<
  T extends readonly unknown[],
  P extends unknown[] = []
> = T extends readonly [infer F, ...infer R]
  ? [[F, P["length"]], ...Format<R, [...P, unknown]>]
  : [];

type Enum<T extends readonly string[], B extends boolean = false> = {
  readonly [K in Format<T>[number] as Capitalize<K[0]>]: B extends true
    ? K[1]
    : K[0];
};
```

方法六：

```ts
type TupleIndex<T extends readonly unknown[]> = T extends readonly [
  infer F,
  ...infer R
]
  ? TupleIndex<R> | R["length"]
  : never;

type Enum<T extends readonly string[], B extends boolean = false> = {
  readonly [K in TupleIndex<T> as Capitalize<T[K]>]: B extends true ? K : T[K];
};
```
