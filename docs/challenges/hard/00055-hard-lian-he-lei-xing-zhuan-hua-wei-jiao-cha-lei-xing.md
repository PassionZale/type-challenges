
# 联合类型转化为交叉类型

<BtnGroup 
	issue="https://tsch.js.org/55/solutions"
/>

> 题目

  实现高级工具类型 `UnionToIntersection<U>`

  例如

  ```ts
  type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

> 解答

```ts
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/122"
/>
	