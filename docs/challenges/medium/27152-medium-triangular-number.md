# Triangular number

<BtnGroup 
	issue="https://tsch.js.org/27152/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32286"
/>

> 题目

Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

> 解答

计算的题目基本上都用数组来实现，利用数组的 length 求和，这题相当于需要把每个数转成对应长度的数组，例如 3，需要转成 1，2，3 这三个数字对应长度的数组

```ts
1: ['']
2: ['', ''],
3: ['', '', ''],
```

递归创建即可

```ts
type CountArr<N extends number, R extends string[] = []> = R["length"] extends N
  ? R
  : CountArr<N, [...R, ""]>;

type Triangular<
  N extends number,
  R extends any[] = [],
  Count extends string[] = []
> = Count["length"] extends N
  ? R["length"]
  : Triangular<
      N,
      [...CountArr<[...Count, ""]["length"]>, ...R],
      [...Count, ""]
    >;
```
