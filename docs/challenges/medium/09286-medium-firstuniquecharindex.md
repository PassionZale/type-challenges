# FirstUniqueCharIndex

<BtnGroup 
	issue="https://tsch.js.org/9286/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/32262"
/>

> 题目

Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

> 解答

```ts
type FirstUniqueCharIndex<
  T extends string,
  U extends string[] = []
> = T extends `${infer F}${infer R}`
  ? // 判断F 在不在 U中存在相同的
    F extends U[number]
    ? // 如果在就把F添加进去，此时也相当于索引+1了
      FirstUniqueCharIndex<R, [...U, F]>
    : // 如果不在，继续判断F在不在R中存在
    R extends `${string}${F}${string}`
    ? FirstUniqueCharIndex<R, [...U, F]>
    : // 双重判断后都不在，就可以返回索引了
      U["length"]
  : -1;
```
