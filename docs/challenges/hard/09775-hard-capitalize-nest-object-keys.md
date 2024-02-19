# Capitalize Nest Object Keys

<BtnGroup 
	issue="https://tsch.js.org/9775/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/25130"
/>

> 题目

Capitalize the key of the object, and if the value is an array, iterate through the objects in the array.

> 解答

```ts
type CapitalizeNestObjectKeys<T extends object> = T extends [
  infer F extends object,
  ...infer R
]
  ? //数组遍历
    [
      CapitalizeNestObjectKeys<F>,
      ...(R extends []
        ? []
        : CapitalizeNestObjectKeys<R> extends any[]
        ? CapitalizeNestObjectKeys<R>
        : never)
    ]
  : //结构体
    {
      [P in keyof T as P extends string
        ? Capitalize<P>
        : P]: T[P] extends object ? CapitalizeNestObjectKeys<T[P]> : T[P];
    };

// old way
// ForEach version
// type TypeFuncMap<T = any> = {
//   CapitalizeNestObjectKeys: T extends object ? CapitalizeNestObjectKeys<T> : T;
// };
// type ForEach<T extends any[], FN extends keyof TypeFuncMap> = T extends [infer F, ...infer R] ? [TypeFuncMap<F>[FN], ...ForEach<R, FN>] : [];

// type CapitalizeNestObjectKeys<T extends object> = { [P in keyof T as P extends string ? Capitalize<P> : P]:
//   T[P] extends any[] ? ForEach<T[P], `CapitalizeNestObjectKeys`>
//   : T[P] extends object ? CapitalizeNestObjectKeys<T[P]> : T[P] };
```
