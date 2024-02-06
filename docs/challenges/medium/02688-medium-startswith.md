# StartsWith

<BtnGroup 
	issue="https://tsch.js.org/2688/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32041"
/>

> 题目

实现`StartsWith<T, U>`,接收两个 string 类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

例如:

```typescript
type a = StartsWith<"abc", "ac">; // expected to be false
type b = StartsWith<"abc", "ab">; // expected to be true
type c = StartsWith<"abc", "abcd">; // expected to be false
```

> 解答

```ts
type StartsWith<T extends string, U extends string> = U extends ""
  ? true
  : T extends `${U}${infer _}`
  ? true
  : false;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/2690"
/>

> take it a litter change type StartsWith<T extends string, U extends string> = T extends `${U}${infer Other}`?true:false
>
> if T extends `${U}${some}` , Prove that T contains U, but U not prove that T
>
> so: Expect<Equal<StartsWith<'abc', 'ab'>, true>>, Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,

> ```ts
> type StartsWith<
>   T extends string,
>   U extends string
> > = T extends `${U}${string}` ? true : false;
> ```
