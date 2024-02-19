# ValidDate

<BtnGroup 
	issue="https://tsch.js.org/9155/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/9174"
/>

> 题目

Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

**Leap year is not considered**

Good Luck!

```ts
ValidDate<"0102">; // true
ValidDate<"0131">; // true
ValidDate<"1231">; // true
ValidDate<"0229">; // false
ValidDate<"0100">; // false
ValidDate<"0132">; // false
ValidDate<"1301">; // false
```

> 解答

```ts
type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type MM = `0${Num}` | `1${0 | 1 | 2}`;

type AllDate =
  | `${MM}${`${0}${Num}` | `${1}${0 | Num}` | `2${0 | Exclude<Num, 9>}`}`
  | `${Exclude<MM, "02">}${29 | 30}`
  | `${Exclude<MM, "02" | "04" | "06" | "09" | "11">}${31}`;

type ValidDate<T extends string> = T extends AllDate ? true : false;
```
