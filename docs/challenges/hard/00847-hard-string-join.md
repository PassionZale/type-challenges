# String Join

<BtnGroup 
	issue="https://tsch.js.org/847/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/850"
/>

> 题目

Create a type-safe string join utility which can be used like so:

```ts
const hyphenJoiner = join("-");
const result = hyphenJoiner("a", "b", "c"); // = 'a-b-c'
```

Or alternatively:

```ts
join("#")("a", "b", "c"); // = 'a#b#c'
```

When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e:

```ts
join("")("a", "b", "c"); // = 'abc'
```

When only one item is passed, we should get back the original item (without any delimiter added):

```ts
join("-")("a"); // = 'a'
```

> 解答

```ts
type Tuple = readonly string[];

/**
 * Tail<['1', '2', '3']> = ['2', '3'].
 */
type Tail<T extends Tuple> = T extends readonly [infer _, ...infer Rest]
  ? Rest
  : [];

/**
 * Join<['1', '2'], " - "> = '1 - 2'.
 * Join<['1'], " - "> = '1'.
 * Join<[], 'x'> = ''.
 */
type Join<T extends Tuple, Separator extends string> = T extends readonly []
  ? ""
  : T extends readonly [infer Head]
  ? Head
  : `${T[0]}${Separator}${Join<Tail<T>, Separator>}`;

declare function join<D extends string>(
  delimiter: D
): <P extends Tuple>(...parts: P) => Join<P, D>;
```
