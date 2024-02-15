# MapTypes

<BtnGroup 
	issue="https://tsch.js.org/5821/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32224"
/>

> 题目

Implement `MapTypes<T, R>` which will transform types in object T to different types defined by type R which has the following structure

```ts
type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
};
```

## Examples:

```ts
type StringToNumber = { mapFrom: string; mapTo: number };
MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber>; // gives { iWillBeANumberOneDay: number; }
```

Be aware that user can provide a union of types:

```ts
type StringToNumber = { mapFrom: string; mapTo: number };
type StringToDate = { mapFrom: string; mapTo: Date };
MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber>; // gives { iWillBeNumberOrDate: number | Date; }
```

If the type doesn't exist in our map, leave it as it was:

```ts
type StringToNumber = { mapFrom: string; mapTo: number };
MapTypes<
  { iWillBeANumberOneDay: string; iWillStayTheSame: Function },
  StringToNumber
>; // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
```

> 解答

```ts
type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [key in keyof T]: [
    R extends { mapFrom: T[key] } ? R["mapTo"] : never
  ] extends [never]
    ? T[key]
    : R extends { mapFrom: T[key] }
    ? R["mapTo"]
    : never;
};
```
