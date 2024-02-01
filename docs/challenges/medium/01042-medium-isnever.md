# IsNever

<BtnGroup 
  issue="https://tsch.js.org/1042/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31980"
/>

> 题目

实现一个 `IsNever` 类型，它接受一个泛型 `T`。

如果泛型解析为 `never `，则返回 `true`，否则返回 `false`。

例如:

```ts
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false
```

> 解答

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

开始你可能会写出这样的答案：

```ts
type IsNever<T> = T extends never ? true : false;
```

你会发现这种 `case` 无法通过测试：

```ts
type A = IsNever<never>; // check failed
```

为什么使用 `[T] extends [never]` 可以参考 [#614](https://github.com/type-challenges/type-challenges/issues/614)

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/1076"
/>

也可以使用内置类型 `Equal` 来实现：

> This solution seems too simple, but in my opinion, using the standard `Equal` function is the most correct way to create functions of the form `IsNever`, `IsAny`, `IsVoid`, and so on, since `Equal` [extracts the exact internal function of type equality from TS](https://github.com/microsoft/TypeScript/commit/ca3d0d37a7d58692a6daadb2fe6b5dc338cf63e8#diff-d9ab6589e714c71e657f601cf30ff51dfc607fc98419bf72e04f6b0fa92cc4b8), and does not rely on some peculiarities of types (which may hypothetically change in future versions of TS).
>
> [TS Playground](https://www.typescriptlang.org/play?ssl=27&ssc=34&pln=27&pc=1#code/PQKgUABBCMAMAsAmCBaCBJAzgOQKYDdcAnSVFci0gIwE8IALASyIHsaBDCRxgLwFcA1pwAUAASasO3fkICUEAMQBbXABNGfJYr4A7Rix3aALowA2mUqQXWIART65MJg5ajolAB1O4VOoxE4jGg9cDBwCYgAaCAB3JgBjeggjdgFHLh0PPn8gkIgAAwAVfIA6UnQAM2T6UNzQliqiRxZTQkxklgKdCKJ86KajPiJDfKMiBz6IFiMaohjGTFD8ivZzXFLXCAAxFiIIXAAPdk9vAC5N-MujCyg6iABBCABeMLxCIgAebveAPihgYD7A4heJGNQdCBUWrjXCkO4AIWerx6H10qlwFUY3VUfwBQJBYNUEKhEBWazhwVCAGEkVg3sQvnxTKZcYDDgTwUZOiSyYsKXkACK08LvD4AbQAuqz8bhQZzuaFebDbpSIABRYX0z46TRQojS9mywnExWrPlQS75TZ-ABqjFwMSmhgA4owjAAJPhUU4MIxGDyYU4A66JEoAK0wJV2AHNgHAkGAQMAwCnQBAAPqZrPZrMQACaLCGECpLHREHdxFCOermYgSZTdzpKMKfxeaoAjnxVl8etEWymwGma9WIIVHP4qexFu1hzm68nGJ5dv4AN7qzuraJq4FGrc70FbM24aLYaYdrumCAAX1JrC0AHJRHUUIlVt4dNHHMBsmZMPeG6q8RTukLxiqQ24Eh857dk2orfMQPzRGMDg-Ih4H7kYUEbqYHywQy8F7AAPhAThEFi0aIaSR6oZE6GQdBOF4Z8ABEzGUUqNF0UaWEXrhIoMmiGJYmo7HUWhUAQdxDF8VqjLMqJaycRJGE8TB-GfJKCmLEp6oqdJTEfCuV5abgnESgOg4gBms65lsQwzMQEAAMpggG1k2em86WaQfxOfQ7BNBANCFnsmAtD+BiBr6-qBsGmChhGUZELG8aIMA7A6JgMTED5EB2g6JHhc4mU+vQfoBkGwAhvQ4aRjGcYIGlYWmBFmW5QAsrs1L+cyuAfo4pXlbFVXxTViUxomyZgEAA).
>
> ```ts
> type IsNever<T> = Equal<never, T>;
> ```
