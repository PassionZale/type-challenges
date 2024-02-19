# Integers Comparator

<BtnGroup 
	issue="https://tsch.js.org/274/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/11444"
/>

> 题目

Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

- If `a` is greater than `b`, type should be `Comparison.Greater`.
- If `a` and `b` are equal, type should be `Comparison.Equal`.
- If `a` is lower than `b`, type should be `Comparison.Lower`.

**Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

> 解答

```ts
enum Comparison {
Greater,
Equal,
Lower,
}

type Comparator<
A extends number | string,
B extends number | string

> = `${A}` extends `-${infer AbsA}`
> ? `${B}` extends `-${infer AbsB}`

    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower

: `${B}` extends `-${number}`
? Comparison.Greater
: ComparePositives<`${A}`, `${B}`>;

// Compares two positive long numbers
type ComparePositives<
A extends string,
B extends string,
ByLength = CompareByLength<A, B>

> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

// Compares two strings by length
type CompareByLength<
A extends string,
B extends string

> = A extends `${infer _}${infer AR}`
> ? B extends `${infer _}${infer BR}`

    ? CompareByLength<AR, BR>
    : Comparison.Greater

: B extends `${infer _}${infer _}`
? Comparison.Lower
: Comparison.Equal;

// Compares two positive long numbers of the same length
type CompareByDigits<
A extends string,
B extends string

> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
> ? CompareDigits<AF, BF> extends Comparison.Equal

    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>

: Comparison.Equal;

// Compares two digits
type CompareDigits<A extends string, B extends string> = A extends B
? Comparison.Equal
: "0123456789" extends `${string}${A}${string}${B}${string}`
? Comparison.Lower
: Comparison.Greater;
```
