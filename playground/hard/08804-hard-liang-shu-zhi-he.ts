/*
  8804 - 两数之和
  -------
  by PsiloLau (@Psilocine) #困难 #array #math

  ### 题目

  给定一个整数数组 nums 和一个目标整数 target, 如果 nums 数组中存在两个元素的和等于 target 返回 true, 否则返回 false

  > 在 Github 上查看：https://tsch.js.org/8804/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 1. get permutations from an array
type Permutation<T> = T extends [infer One, ...infer Rest]
  ? [One, ...Permutation<Rest>] | [...Permutation<Rest>, One]
  : [];

// 2. test case for permutation
// [1, 2, 3] | [1, 3, 2] | [2, 3, 1] | [3, 2, 1]
type test_permutation = Permutation<[1, 2, 3]>;

// 3. get first two elems from an array
type GetFirstTwo<T> = T extends T
  ? T extends [infer One, infer Two, ...infer Rest]
    ? [One, Two]
    : never
  : never;

// 4. combine GetFirstTwo and Permutations then we get
//    all posibles of number addition in an array
type GetAllPosibles<T> = GetFirstTwo<Permutation<T>>;

// 5. test case for GetAllPosibles
type test_GetAllPosibles1 = GetAllPosibles<test_permutation>;
type test_GetAllPosibles2 = GetAllPosibles<[3, 3]>; // [3,3]
type test_GetAllPosibles3 = GetAllPosibles<[1, 3, 3]>; // [3,3] | [3,1]
type test_GetAllPosibles4 = GetAllPosibles<[3, 2, 4]>; // [3,2] | [3,4] | [2,4]

// 6. get result of add two number
type CreateTupple<
  S extends number,
  Res extends 1[] = []
> = Res["length"] extends S ? Res : CreateTupple<S, [...Res, 1]>;
type Add<A extends number, B extends number> = [
  ...CreateTupple<A>,
  ...CreateTupple<B>
]["length"];

// 7. test cases for Add
type test_add = Add<4, 6>; // 10

// 8. GetAllPosibles as a union R,
//    expand union R then find if Add<One, Two> extends target number,
//    then we got result like: true | never | never | never
type FindPosible<T, U, R = GetAllPosibles<T>> = R extends R
  ? R extends [infer One, infer Two]
    ? Add<One & number, Two & number> extends U
      ? true
      : never
    : never
  : never;

// 9. if result contains not never, then it contains a true
type TwoSum<T extends number[], U extends number> = [
  FindPosible<T, U>
] extends [never]
  ? false
  : FindPosible<T, U>;

// 10. final test cases
type test2 = TwoSum<[2, 7, 11, 15], 6>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8804/answer/zh-CN
  > 查看解答：https://tsch.js.org/8804/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
