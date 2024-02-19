# 获取只读属性

<BtnGroup 
	issue="https://tsch.js.org/5/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/12656"
/>

> 题目

实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

例如

```ts
interface Todo {
  readonly title: string;
  readonly description: string;
  completed: boolean;
}

type Keys = GetReadonlyKeys<Todo>; // expected to be "title" | "description"
```

> 解答

```ts
/**
 * 思路是将T的只读键key取出来，拿到一个{key:key}的类型（其中非只读属性的值均为never）并取value（会自动过滤掉never类型的值只剩下只读key）
 * Equal取原类型和已将原类型只读属性全去掉的类型（{ -readonly [R in P]: T[R] }）对比结果为真的赋值never，为假说明key类型不一样，赋值key（供最后一步取key）
 * [ P in keyof Required<T> ] 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项，保证能取到所有key
 * 最后一步keyof Result依然会获得所有key，即使有些key对应值为never，故而用Result{keyof T}取值过滤掉never
 **/
type GetReadonlyKeys<T> = {
  [P in keyof Required<T>]: Equal<
    { [k in P]: T[k] },
    { -readonly [R in P]: T[R] }
  > extends true
    ? never
    : P;
}[keyof T];
```
