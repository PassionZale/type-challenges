# Remove Index Signature

<BtnGroup 
  issue="https://tsch.js.org/1367/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31983"
/>

> 题目

Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

For example:

```ts
type Foo = {
  [key: string]: any;
  foo(): void;
};

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }
```

> 解答

消除对象的属性，只需要返回 `{ never: T[k]}` 即可。

通过三目运算穷举 `case` 中需要满足的类型，可以获得答案：

```ts
type RemoveIndexSignature<T> = {
  [k in keyof T as string extends k
    ? never
    : number extends k
    ? never
    : symbol extends k
    ? never
    : k]: T[k];
};
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/14662#issuecomment-1837202015"
/>

通过穷举 `case` 中的类型进行过滤比较死板：

```ts
type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
};
```

> > @wattlebird The main observation here is that explicitly written keys inside `type = { ... }` are literal types, whereas index signature keys are `string | number | symbol`. All we need to do now is differentiate between keys that are literal types or supertypes thereof. Notice that `'Hello World' extends string` but `string extends 'Hello World'` is not the case.
> > The more verbose solution would be:
> >
> > ```ts
> > type RemoveIndexSignature<T> = {
> >   [K in keyof T as /* filters out all 'string' keys */
> >   string extends K
> >     ? never
> >     : /* filters out all 'number' keys */
> >     number extends K
> >     ? never
> >     : /* filers out all 'symbol' keys */
> >     symbol extends K
> >     ? never
> >     : K /* all that's left are literal type keys */]: T[K];
> > };
> > ```
> >
> > the above could be shortened into the following, yielding @alexfung888's solution:
> >
> > ```ts
> > type RemoveIndexSignature<T, P = PropertyKey> = {
> >   [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
> > };
> > ```
> >
> > the main trick here is to distribute over `PropertyKey` by storing it in a generic variable `P = PropertyKey` since `extends` distributes over only naked types, `P extends PropertyKey` wouldn't work. I.e:
> >
> > ```ts
> > P extends K ? never : (K extends P ? K : never)  /* P = string | number | symbol */
> >
> > // becomes
> > (string | number | symbol) extends K ? never : (K extends P ? K : never)
> >
> > // becomes
> > | string extends K ? never : (K extends string ? K : never)
> > | number extends K ? never : (K extends number ? K : never)
> > | symbol extends K ? never : (K extends symbol ? K : never)
> > ```
> >
> > after substituting `K = "somePropertyName"` you can see how only literal types are preserved.
>
> Wow, very clear, thanks for your sharing, good job! @psmolak

> @wattlebird The main observation here is that explicitly written keys inside `type = { ... }` are literal types, whereas index signature keys are `string | number | symbol`. All we need to do now is differentiate between keys that are literal types or supertypes thereof. Notice that `'Hello World' extends string` but `string extends 'Hello World'` is not the case.
>
> The more verbose solution would be:
>
> ```ts
> type RemoveIndexSignature<T> = {
>   [K in keyof T as /* filters out all 'string' keys */
>   string extends K
>     ? never
>     : /* filters out all 'number' keys */
>     number extends K
>     ? never
>     : /* filers out all 'symbol' keys */
>     symbol extends K
>     ? never
>     : K /* all that's left are literal type keys */]: T[K];
> };
> ```
>
> the above could be shortened into the following, yielding @alexfung888's solution:
>
> ```ts
> type RemoveIndexSignature<T, P = PropertyKey> = {
>   [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
> };
> ```
>
> the main trick here is to distribute over `PropertyKey` by storing it in a generic variable `P = PropertyKey` since `extends` distributes over only naked types, `P extends PropertyKey` wouldn't work. I.e:
>
> ```ts
> P extends K ? never : (K extends P ? K : never)  /* P = string | number | symbol */
>
> // becomes
> (string | number | symbol) extends K ? never : (K extends P ? K : never)
>
> // becomes
> | string extends K ? never : (K extends string ? K : never)
> | number extends K ? never : (K extends number ? K : never)
> | symbol extends K ? never : (K extends symbol ? K : never)
> ```
>
> after substituting `K = "somePropertyName"` you can see how only literal types are preserved.
