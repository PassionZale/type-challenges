# 柯里化 1

<BtnGroup 
	issue="https://tsch.js.org/17/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/UPDATE_HERE_AFTER_SUBMIT_ANSWER"
/>

> 题目

> 在此挑战中建议使用 TypeScript 4.0

[柯里化](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

例如：

```ts
const add = (a: number, b: number) => a + b;
const three = add(1, 2);

const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);
```

传递给 `Currying` 的函数可能有多个参数，您需要正确输入它的类型。

在此挑战中，柯里化后的函数每次仅接受一个参数。接受完所有参数后，它应返回其结果。

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/28634"
/>

> This solution is longer but slightly better than the canonical one (#1404) in that it takes care to preserve the names of the function parameters. Extracting the first element of a tuple while preserving its label is tricky but possible thanks to @jcalz's [answer](https://stackoverflow.com/a/72244704/388951) to a Stack Overflow question.
>
> ```ts
> // See https://stackoverflow.com/a/72244704/388951
> type FirstAsTuple<T extends any[]> = T extends [any, ...infer R]
>   ? T extends [...infer F, ...R]
>     ? F
>     : never
>   : never;
>
> type Curried<F> = F extends (...args: infer Args) => infer Return
>   ? Args["length"] extends 0 | 1
>     ? F
>     : Args extends [any, ...infer Rest]
>     ? (...args: FirstAsTuple<Args>) => Curried<(...rest: Rest) => Return>
>     : never
>   : never;
>
> declare function Currying<T extends Function>(fn: T): Curried<T>;
> ```
>
> Compare: <img alt="image" width="685" src="https://private-user-images.githubusercontent.com/98301/251254026-a214cba7-5ebd-42d4-8dfb-2328f0b22fe9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDgzMTE3NTMsIm5iZiI6MTcwODMxMTQ1MywicGF0aCI6Ii85ODMwMS8yNTEyNTQwMjYtYTIxNGNiYTctNWViZC00MmQ0LThkZmItMjMyOGYwYjIyZmU5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjE5VDAyNTczM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBmMjI5OTEzMGZlYmI5MzZlYzI0NDA2YTI2MDcwNTc0YTM0ZDg1Mzg5ODMxN2Q5OTFlYjJmNTcwY2U5ZGJhYTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.e5xES_F5Jgn2646IRYWihKhpTBUmApBGOijVra7rFjs">
>
> vs: <img alt="Screenshot 2023-07-05 at 3 00 48 PM" width="709" src="https://private-user-images.githubusercontent.com/98301/251254449-5276eb83-2217-43e6-a8b3-bd7f9c5e8119.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDgzMTE3NTMsIm5iZiI6MTcwODMxMTQ1MywicGF0aCI6Ii85ODMwMS8yNTEyNTQ0NDktNTI3NmViODMtMjIxNy00M2U2LWE4YjMtYmQ3ZjljNWU4MTE5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjE5VDAyNTczM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThkNjBiZDg1ZDI3ZWI2YzYyZWM2ZGVmNjM5Yzk5ZmZiZTE0YjU0MzNjYzAxOTU5MzU4MjFiODk2OGVlZGZkZDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.5olFlfgdKA8ef_HVh32jXSydDefBsUiRgSRK5UeiFeY">
