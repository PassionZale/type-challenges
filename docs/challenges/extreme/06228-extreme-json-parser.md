# JSON Parser

<BtnGroup 
	issue="https://tsch.js.org/6228/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/6329"
/>

> 题目

You're required to implement a type-level partly parser to parse JSON string into a object literal type.

Requirements:

- `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

> 解答

```ts
type Parse<T extends string> = Eval<T> extends [infer V, infer U] ? V : never;

type Eval<T> = T extends `${" " | "\n"}${infer U}`
  ? Eval<U>
  : T extends `true${infer U}`
  ? [true, U]
  : T extends `false${infer U}`
  ? [false, U]
  : T extends `null${infer U}`
  ? [null, U]
  : T extends `"${infer U}`
  ? EvalString<U>
  : T extends `${"["}${infer U}`
  ? EvalArray<U>
  : T extends `${"{"}${infer U}`
  ? EvalObject<U>
  : false;

type Escapes = { r: "\r"; n: "\n"; b: "\b"; f: "\f" };

type EvalString<T, S extends string = ""> = T extends `"${infer U}`
  ? [S, U]
  : (
      T extends `\\${infer C}${infer U}`
        ? C extends keyof Escapes
          ? [C, U]
          : false
        : false
    ) extends [infer C, infer U]
  ? EvalString<U, `${S}${C extends keyof Escapes ? Escapes[C] : never}`>
  : T extends `${infer C}${infer U}`
  ? EvalString<U, `${S}${C}`>
  : false;

type EvalArray<T, A extends any[] = []> = T extends `${" " | "\n"}${infer U}`
  ? EvalArray<U, A>
  : T extends `]${infer U}`
  ? [A, U]
  : T extends `,${infer U}`
  ? EvalArray<U, A>
  : Eval<T> extends [infer V, infer U]
  ? EvalArray<U, [...A, V]>
  : false;

type EvalObject<T, K extends string = "", O = {}> = T extends `${
  | " "
  | "\n"}${infer U}`
  ? EvalObject<U, K, O>
  : T extends `}${infer U}`
  ? [O, U]
  : T extends `,${infer U}`
  ? EvalObject<U, K, O>
  : T extends `"${infer U}`
  ? Eval<`"${U}`> extends [`${infer KK}`, infer UU]
    ? EvalObject<UU, KK, O>
    : false
  : T extends `:${infer U}`
  ? Eval<U> extends [infer V, infer UU]
    ? EvalObject<UU, "", Merge<{ [P in K]: V } & O>>
    : false
  : false;

type Merge<T> = { [P in keyof T]: T[P] };
```
