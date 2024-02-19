# FizzBuzz

<BtnGroup 
	issue="https://tsch.js.org/14080/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/22044"
/>

> 题目

The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

Print integers 1 to N, except:

- Print "Fizz" if an integer is divisible by 3;
- Print "Buzz" if an integer is divisible by 5;
- Print "FizzBuzz" if an integer is divisible by both 3 and 5.

For example, for N = 20, the output should be:
`1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz`

In the challenge below, we will want to generate this as an array of string literals.

For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by
correctly using the tail-call optimisation for recursion).

> 解答

```ts
type FizzBuzzOne<
  C extends number,
  C3 extends number,
  C5 extends number,
  _FB = `${C3 extends 3 ? "Fizz" : ""}${C5 extends 5 ? "Buzz" : ""}`
> = _FB extends "" ? `${C}` : _FB;

type FizzBuzz<
  N extends number,
  _R extends string[] = [],
  _CT extends unknown[] = [unknown],
  _C3T extends unknown[] = [unknown],
  _C5T extends unknown[] = [unknown]
> = _R["length"] extends N
  ? _R
  : FizzBuzz<
      N,
      [..._R, FizzBuzzOne<_CT["length"], _C3T["length"], _C5T["length"]>],
      [..._CT, unknown],
      _C3T["length"] extends 3 ? [unknown] : [..._C3T, unknown],
      _C5T["length"] extends 5 ? [unknown] : [..._C5T, unknown]
    >;
```
