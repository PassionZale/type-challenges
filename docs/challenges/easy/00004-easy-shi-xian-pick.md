# 实现 Pick

<BtnGroup 
  issue="https://tsch.js.org/4/solutions"
  answer="https://github.com/type-challenges/type-challenges/issues/31823"
/>

> 题目

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

> 解答

```ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
```

> 精选

<BtnGroup 
  featured="https://github.com/type-challenges/type-challenges/issues/13427"
/>

> ```ts
> type MyPick<T, K extends keyof T> = {
>   [key in K]: T[key];
> };
> ```
>
> 答案和大部分人都是相同的，只是在这里和说明一下 keyof 及 in 的概念及用法，避免刚接触的小伙伴查找。
>
> ##### keyof: 取 interface 的键后保存为联合类型
>
> ```ts
> interface userInfo {
>   name: string;
>   age: number;
> }
> type keyofValue = keyof userInfo;
> // keyofValue = "name" | "age"
> ```
>
> ##### in: 取联合类型的值，主要用于数组和对象的构建
>
> 切记不要用于 interface, 否则会报错
>
> ```ts
> type name = "firstname" | "lastname";
> type TName = {
>   [key in name]: string;
> };
> // TName = { firstname: string, lastname: string }
> ```
>
> ##### 用于实际开发，举个例子：
>
> ```ts
> function getValue(o: object, key: string) {
>   return o[key];
> }
> const obj1 = { name: "张三", age: 18 };
> const values = getValue(obj1, "name");
> ```
>
> 这样写丧失了 ts 的优势：
>
> 1. 无法确定返回值类型
> 2. 无法对 key 进行约束
>
> ```
> function getValue<T extends Object,K extends keyof T>(o: T,key: K): T[K] {
>   return o[key]
> }
> const obj1 = { name: '张三'， age: 18}
> const values = getValue(obj1, 'name')
> // 如果第二个参数不是obj1中的参数就会报错
> ```
