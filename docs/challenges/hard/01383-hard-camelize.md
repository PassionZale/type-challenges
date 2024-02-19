# Camelize

<BtnGroup 
	issue="https://tsch.js.org/1383/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/1403"
/>

> 题目

实现 Camelize 类型: 将对象属性名从 蛇形命名(下划线命名) 转换为 小驼峰命名

```ts
Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [{ snake_case: string }];
}>;

// expected to be
// {
//   someProp: string,
//   prop: { anotherProp: string },
//   array: [{ snakeCase: string }]
// }
```

> 解答

```ts
type SnakeToCamel<
  S extends string,
  Cap extends boolean = false
> = S extends `${infer Head}_${infer Tail}`
  ? `${Cap extends true ? Capitalize<Head> : Head}${SnakeToCamel<Tail, true>}`
  : Cap extends true
  ? Capitalize<S>
  : S;

type TerminalTypes = number | boolean | symbol | bigint | Function;

type Camelize<T> = {
  default: {
    [K in keyof T as Camelize<K>]: Camelize<T[K]>;
  };
  array: T extends [infer Head, ...infer Tail]
    ? [Camelize<Head>, ...Camelize<Tail>]
    : [];
  string: SnakeToCamel<T & string>;
  terminal: T;
}[T extends any[]
  ? "array"
  : T extends TerminalTypes
  ? "terminal"
  : T extends string
  ? "string"
  : /** default */
    "default"];
```
