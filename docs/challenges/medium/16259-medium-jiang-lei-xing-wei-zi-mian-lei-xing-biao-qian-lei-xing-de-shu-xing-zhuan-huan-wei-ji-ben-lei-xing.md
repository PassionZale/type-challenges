# 将类型为字面类型（标签类型）的属性，转换为基本类型

<BtnGroup 
	issue="https://tsch.js.org/16259/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32272"
/>

> 题目

将类型为字面类型（标签类型）的属性，转换为基本类型。

```ts
type PersonInfo = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
};

// 要求结果如下：
type PersonInfo = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
};
```

> 解答

```ts
type ToPrimitive<T> = T extends object
  ? T extends (...args: never[]) => unknown
    ? Function
    : {
        [Key in keyof T]: ToPrimitive<T[Key]>;
      }
  : T extends { valueOf: () => infer P }
  ? P
  : T;
```

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/28263"
/>

> 1. `T extends object ? ... : ...`：这个条件类型判断 T 是否是对象类型。
>
>    - 如果 T 是对象类型，进入第一个分支。
>    - 否则，进入第二个分支。
>
> 2. 对象类型的处理：`T extends (...args: never[]) => unknown ? Function : { [Key in keyof T]: ToPrimitive<T[Key]> }`：
>
>    - 如果 T 是函数，返回 Function 类型。这是为处理对象类型中的函数类型定义。
>    - 如果 T 不是函数，对 T 的每个属性进行递归求解，得到一个将 T 的所有属性转换为原始类型的新映射类型 `{ [Key in keyof T]: ToPrimitive<T[Key]>}`。
>
> 3. 非对象类型的处理（基本类型和包装对象类型）：`T extends { valueOf: () => infer P } ? P : T`：
>
>    - 如果 T 是一个包装对象类型，如 Number 或 String 类型，它会具有一个 valueOf 方法返回对应的原始类型。这里，我们通过条件类型 `T extends { valueOf: () => infer P } ? P : T` 判断 T 是否具有 valueOf 方法，如果有则返回它的返回值的类型 P。
>    - 如果 T 已经是一个原始类型，这个条件类型直接返回原始类型 T。
>
> ```ts
> type ToPrimitive<T> = T extends object
>   ? T extends (...args: never[]) => unknown
>     ? Function
>     : {
>         [Key in keyof T]: ToPrimitive<T[Key]>;
>       }
>   : T extends { valueOf: () => infer P }
>   ? P
>   : T;
> ```
