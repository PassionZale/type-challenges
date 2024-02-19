# Tower of hanoi

<BtnGroup 
	issue="https://tsch.js.org/30430/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32296"
/>

> 题目

Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

[Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
[GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

> 解答

```ts
type Hanoi<
  N extends number,
  From = "A",
  To = "B",
  Intermediate = "C",
  CurrentIndex extends 1[] = []
> = CurrentIndex["length"] extends N
  ? []
  : [
      ...Hanoi<N, From, Intermediate, To, [...CurrentIndex, 1]>,
      [From, To],
      ...Hanoi<N, Intermediate, To, From, [...CurrentIndex, 1]>
    ];
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/30769"
/>

We should move disk from rod-A to rod-B using rod-C as a intemediate helper rod. Only one disk at a time.

So, I explain on `Hanoi<1>` example.

By default Acc is empty array and it's length `0`, so we skip true branch of our comparison and go to false branch.

1. We should get an array of arrays (combination of A | B | C). So, wrap false branch with [].
2. First recursive spread.
   - We run "Hanoi" type with `Hanoi<1, 'A', 'C', 'B', [...[], '🇺🇦']>`.
     - Here we should take a look on number of rings and length of Acc.
     - We have `Rings = 1` and Acc with one '🇺🇦'. So, result gonna be an empty `[]` with length 1.
     - That's why we use spread operator. When we spread an empty array we get `never` type and it skiped in our RESULT ARRAY.
   - Just an array with `['A', 'B']`
   - The same explanation as in a 2.1

```ts
type Hanoi<
  Rings extends number,
  FromRod extends string = "A",
  ToRod extends string = "B",
  IntermediateRod extends string = "C",
  Acc extends "🇺🇦"[] = []
> = Acc["length"] extends Rings
  ? []
  : [
      ...Hanoi<Rings, FromRod, IntermediateRod, ToRod, [...Acc, "🇺🇦"]>,
      [FromRod, ToRod],
      ...Hanoi<Rings, IntermediateRod, ToRod, FromRod, [...Acc, "🇺🇦"]>
    ];
```
