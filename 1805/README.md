---
title: "LeetCode 1805: Number Of Different Integers In A String"
date: "06/12/22"
---

## [The Problem](https://leetcode.com/problems/number-of-different-integers-in-a-string/)

## Solution

First we have to break down the problem.

1. [Problem archetype](#problem-archetype)
2. [Problem Breakdown](#problem-breakdown)
   1. [Identify whether a character is a number](#identify-number)
   2. [Removing duplicates](#removing-duplicates)
   3. [Remove Leading Zeros](#remove-leading-zeros)
3. [Edge cases and common pitfalls](#edge-cases-and-common-pitfalls)
4. [Solution Code](#solution-code)
5. [In Conclusion](#in-conclusion)

## Problem Archetype

At first glance it looks like we may be able to do this using only 1 pointer and we probably can. However, for simplicity's sake, we are going to start with a solution using 2 pointers. Even using 2 pointers, we should be able to iterate over the string only once. In other words, we can solve this problem in O(n) time complexity.

Since we need to store values as we iterate, our solution will also have a space complexity of O(n) since the input string could be all numbers and we would have to store every single one of them.

## Problem Breakdown

### Identify number

We can determine whether a character in a string is a number using its ASCII value. There are plenty of ASCII tables out there, but I referenced [this one](https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html). Since we see the numbers are ASCII values 48 - 57, we check that the ASCII value of a given character is in that range.

### Removing Duplicates

This comes down to choosing the right data structure out of the gate. Since we don't care about the order of the elements we're keeping track of, we can rely on a [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to store our elements, but not store any duplicates. Sets in JavaScript are as easy to work with as arrays, but unlike arrays, they are unordered and can only contain each unique element once.

### Remove Leading Zeros

Using JavaScript's BigInt constructor gives us this for free. We could implement this ourselves using a leadingZeros flag as we go. For the purposes of this solution, I don't think we need it.

### Edge Cases And Common Pitfalls

1. [Off-by-one errors](https://en.wikipedia.org/wiki/Off-by-one_error)

This isn't unique to this problem, but just pay attention to how you're indexing your string as you iterate over it. I spent an embarrassing amount of time trying to debug my solution only to realize I was trying to dereference past the end of the string and crashing my program.

2. Really large sequences of numbers

Our solution breaks down when we encounter a large sequence of numbers. Since we are working in Javascript, numbers break down once we reach [Number.MAX_SAFE_INTEGER - 2 ^ 53](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). As the numbers get larger than MAX_SAFE_INTEGER, `parseInt()` will start doing crazy things like parsing the number as [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity), and since `Infinity === Infinity` evaluates to true, extremely large numbers will all be treated as duplicates by our set. Because of this, we need to parse our numbers as [BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

## Solution Code

```JavaScript
function numDifferentIntegers(word) {
  const wordLength = word.length;
  const nums = new Set();

  let acc = "";
  let slowP = 0;
  let fastP = 0;
  while (slowP < wordLength) {
    if (!isNumber(word[slowP])) {
      slowP++;
      continue;
    }
    fastP = slowP;
    while (fastP < wordLength && isNumber(word[fastP])) {
      acc += word[fastP];
      fastP++;
    }
    nums.add(BigInt(acc));
    acc = "";
    slowP = fastP;
    slowP++;
  }
  return nums.size;
}

function isNumber(x) {
  const charCode = x.charCodeAt(0);
  return charCode >= 48 && charCode <= 57;
}

function __test() {
  const num = numDifferentIntegers("123abc321oui00123");
  console.log(num);
}

__test();
```

## In Conclusion

There you have it. There are definitely some improvements to be made here. In-lining the isNumber function would likely provide a slight speed improvement, and we can certainly do this with 1 pointer instead of 2. Removing the leading zeros ourselves would also be a good exercise. All in all, we have a relatively fast and memory-efficient solution with acceptable algorithmic complexity.
