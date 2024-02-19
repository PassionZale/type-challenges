# ClassPublicKeys

<BtnGroup 
	issue="https://tsch.js.org/2828/solutions"
	featured="https://github.com/type-challenges/type-challenges/issues/25353"
/>

> 题目

Implement the generic `ClassPublicKeys<T>` which returns all public keys of a class.

For example:

```ts
class A {
  public str: string;
  protected num: number;
  private bool: boolean;
  getNum() {
    return Math.random();
  }
}

type publicKeys = ClassPublicKeys<A>; // 'str' | 'getNum'
```

> 解答

```ts
type ClassPublicKeys<T, P = keyof T> = P extends keyof T ? P : never;
```
