# 统计数组中的元素个数

<BtnGroup 
	issue="https://tsch.js.org/9989/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32268"
/>

> 题目

通过实现一个`CountElementNumberToObject`方法，统计数组中相同元素的个数

```ts
type Simple1 = CountElementNumberToObject<[]>;

// return {}

type Simple2 = CountElementNumberToObject<[1, 2, 3, 4, 5]>;

// return {
//   1: 1,
//   2: 1,
//   3: 1,
//   4: 1,
//   5: 1,
// };

type Simple3 = CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>;

// return {
//   1: 2,
//   2: 2,
//   3: 2,
//   4: 1,
//   5: 1,
// };
```

> 解答

```ts
// 由于 case 中会存在多维数组的情况，因此需要将数组打平
type Flatten<T, R extends any[] = []> = T extends [infer F, ...infer L]
  ? [F] extends [never]
    ? Flatten<L, R>
    : F extends any[]
    ? Flatten<L, [...R, ...Flatten<F>]>
    : Flatten<L, [...R, F]>
  : R;

type Count<T, R extends Record<string | number, any[]> = {}> = T extends [
  infer F extends string | number,
  ...infer L
]
  ? F extends keyof R
    ? Count<L, Omit<R, F> & Record<F, [...R[F], 0]>>
    : Count<L, R & Record<F, [0]>>
  : {
      [K in keyof R]: R[K]["length"];
    };

type CountElementNumberToObject<T> = Count<Flatten<T>>;
```
