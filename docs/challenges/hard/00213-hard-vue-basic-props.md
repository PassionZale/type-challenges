# Vue Basic Props

<BtnGroup 
	issue="https://tsch.js.org/213/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/215"
/>

> 题目

**This challenge continues from [6 - Simple Vue](//tsch.js.org/6), you should finish that one first, and modify your code based on it to start this challenge**.

In addition to the Simple Vue, we are now having a new `props` field in the options. This is a simplified version of Vue's `props` option. Here are some of the rules.

`props` is an object containing each field as the key of the real props injected into `this`. The injected props will be accessible in all the context including `data`, `computed`, and `methods`.

A prop will be defined either by a constructor or an object with a `type` field containing constructor(s).

For example

```js
props: {
  foo: Boolean;
}
// or
props: {
  foo: {
    type: Boolean;
  }
}
```

should be inferred to `type Props = { foo: boolean }`.

When passing multiple constructors, the type should be inferred to a union.

```ts
props: {
  foo: {
    type: [Boolean, Number, String];
  }
}
// -->
type Props = { foo: boolean | number | string };
```

When an empty object is passed, the key should be inferred to `any`.

For more specified cases, check out the Test Cases section.

> `required`, `default`, and array props in Vue are not considered in this challenge.

> 解答

```ts
type InferComputed<C extends Record<string, any>> = {
  [K in keyof C]: ReturnType<C[K]>;
};

type Prop<T = any> = PropType<T> | { type?: PropType<T> };
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];

type PropConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T };

type InferPropType<P> = P extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any;

type InferProps<P extends Record<string, any>> = {
  [K in keyof P]: InferPropType<P[K]>;
};

declare function VueBasicProps<
  P,
  D,
  C extends Record<string, any>,
  M,
  Props = InferProps<P>
>(options: {
  props?: P;
  data(this: Props): D;
  computed: C & ThisType<Props & D & InferComputed<C> & M>;
  methods: M & ThisType<Props & D & InferComputed<C> & M>;
}): Props & D & InferComputed<C> & M;
```
