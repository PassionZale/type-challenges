# BitwiseXOR

<BtnGroup 
	issue="https://tsch.js.org/30575/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/30577"
/>

> 题目

Implement `BitwiseXOR<S1,S2>` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2

For example:

```typescript
BitwiseXOR<"0", "1">; // expect '1'
BitwiseXOR<"1", "1">; // expect '0'
BitwiseXOR<"10", "1">; // expect '11'
```

> 解答

```ts
type MakePrefix<
  S extends string,
  P extends string = ""
> = S extends `${string}${infer R}` ? MakePrefix<R, `${P}0`> : P;

type Pad<S1 extends string, S2 extends string> = [S1, S2] extends [
  `${string}${infer RS1}`,
  `${string}${infer RS2}`
]
  ? Pad<RS1, RS2>
  : [MakePrefix<S2>, MakePrefix<S1>];

type _XOR<S1 extends string, S2 extends string, R extends string = ""> = [
  S1,
  S2
] extends [`${infer F1}${infer R1}`, `${infer F2}${infer R2}`]
  ? _XOR<R1, R2, `${R}${F1 extends F2 ? "0" : "1"}`>
  : R;

type BitwiseXOR<S1 extends string, S2 extends string> = Pad<S1, S2> extends [
  infer P1 extends string,
  infer P2 extends string
]
  ? _XOR<`${P1}${S1}`, `${P2}${S2}`>
  : never;
```
