# Tag

<BtnGroup 
	issue="https://tsch.js.org/697/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/22316"
/>

> 题目

Despite the structural typing system in TypeScript, it is sometimes convenient to mark some types with tags, and so that these tags do not interfere with the ability to assign values of these types to each other.

For example, using tags, you can check that some value passes through the calls of the required functions, and in the correct order:

```ts
const doA = <T extends string>(x: T) => {
  const result = x;

  return result as Tag<typeof result, "A">;
};

const doB = <T extends string>(x: T) => {
  const result = x;

  return result as Tag<typeof result, "B">;
};

const a = doA("foo");
const b = doB(a);

type Check0 = IsTrue<HasTags<typeof b, ["A", "B"]>>;
```

Write a function `Tag<B, T extends string>` that takes a type `B` other than `null` and `undefined` and returns a type labeled with the string literal type `T`.

The labeled types must be mutually assignable with the corresponding original types:

```ts
declare let x: string;
declare let y: Tag<string, "A">;

x = y = x;
```

When tagging a type already marked with a tag, a new tag must be added to the end of the list of all tags of the type:

```ts
type T0 = Tag<{ foo: string }, "A">;
type T1 = Tag<T0, "B">;

type Check1 = IsTrue<HasExactTags<T1, ["A", "B"]>>;
```

Add some functions to check for type tags.

`GetTags<B>` retrieves a list of all tags of a type `B`:

```ts
type T2 = Tag<number, "C">;

type Check2 = IsTrue<Equal<GetTags<T2>, ["C"]>>;
```

`HasTag<B, T extends string>` checks if type `B` is tagged with tag `T` (and returns `true` or `false`):

```ts
type T3 = Tag<0 | 1, "D">;

type Check3 = IsTrue<HasTag<T3, "D">>;
```

`HasTags<B, T extends readonly string[]>` checks if type `B` is tagged in succession with tags from tuple `T`:

```ts
type T4 = Tag<Tag<Tag<{}, "A">, "B">, "C">;

type Check4 = IsTrue<HasTags<T4, ["B", "C"]>>;
```

`HasExactTags<B, T extends readonly string[]>` checks if the list of all tags of type `B` is exactly equal to the `T` tuple:

```ts
type T5 = Tag<Tag<unknown, "A">, "B">;

type Check5 = IsTrue<HasExactTags<T5, ["A", "B"]>>;
```

Finally, add type `UnTag<B>`, which removes all tags from type `B`:

```ts
type T6 = Tag<{ bar: number }, "A">;
type T7 = UnTag<T6>;

type Check6 = IsFalse<HasTag<T7, "A">>;
```

> 解答

```ts
/**
 * 版本二
 * 这一版是在版本一的基础上做了修改，将 GetTags 的返回值由交集变为并集，纯粹是为了满足测试用例的需要，增加了一些额外的逻辑
 * 学完版本一之后，如果非得要通关，可以使用这一版
 */

// ---- Start: Structures ----

declare const UniqueSymbol: unique symbol;

type UniqueSymbolType = typeof UniqueSymbol;

type TagsWrapper<B, TGS> = UniqueSymbolType | (UniqueSymbolType & [B, TGS]);

type TagsBag<B, TGS> = {
  [UniqueSymbol]?: TagsWrapper<B, TGS>;
};

// ---- End: Structures ----

// ---- Start: Get Tags ----

type Union2Intersection<U> = (
  U extends unknown ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type _GetTags<B> = Equal<B, never> extends true
  ? []
  : B extends TagsBag<unknown, infer Tags extends string[]>
  ? Equal<Tags, string[]> extends true
    ? []
    : Tags
  : [];

type GetTags<B> = Union2Intersection<_GetTags<B>> extends infer Result
  ? Equal<Result, never> extends true
    ? []
    : Result extends string[]
    ? Result
    : never
  : never;

// ---- End: Get Tags ----

// ---- Start: Wrap and Unwrap ----

type PassEmptyValue<B, D> = Equal<B, null> extends true
  ? null
  : Equal<B, undefined> extends true
  ? undefined
  : D;

type Tag<B, TG> = PassEmptyValue<
  B,
  UnTag<B> & TagsBag<UnTag<B>, [...GetTags<B>, TG]>
>;

type UnTag<B> = PassEmptyValue<B, Omit<B, UniqueSymbolType>>;

// ---- End: Tag and UnTag ----

// ---- Start: Other Methods ----

type Includes<
  A extends readonly unknown[],
  B extends readonly unknown[]
> = A extends [...B, ...unknown[]]
  ? true
  : A extends [unknown, ...infer Rest]
  ? Includes<Rest, B>
  : false;

type HasTag<B, T extends string> = Includes<GetTags<B>, [T]>;
type HasTags<B, T extends readonly string[]> = Includes<GetTags<B>, T>;
type HasExactTags<B, T extends readonly string[]> = Equal<GetTags<B>, T>;

// ---- End: Other Methods ----
```
