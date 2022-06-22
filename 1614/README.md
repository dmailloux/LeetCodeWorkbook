# Maximum Nesting Depth Of The Parentheses

## [The Problem](https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/)

## Solution

1. [Problem Breakdown](#problem-breakdown)
   1. [Stacks](#using-a-stack)
   2. [The Red Herring](#the-red-herring)
   3. [Max number of open parentheses](#max-number-of-open-parentheses)
   4. [Algorithmic Complexity](#algorithmic-complexity)
2. [Solution Code](#solution-code)
3. [In Conclusion](#in-conclusion)

## Problem Breakdown

### Using a Stack

When a programmer sees brackets, they can't help but think of stacks. JavaScript doesn't have a built-in stack so we'll have to make our own. So without giving it a second thought, let's get into implementing a simple [stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Our implementation is really cool because we get to use [classes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript).

Any self-respecting stack needs to implement the following methods: `push`, `pop`, `peek` (sometimes called `top`), and we can also have `isEmpty` as a treat.

- `push` adds an item to the top of the stack
- `pop` returns the item at the top of the stack as well as removes it
- `peek` returns the top item of the stack, but does not remove it
- `isEmpty` returns true if the stack is empty

We can keep track of the items in our stack using an array. Luckily for us, JavaScript arrays already implement `push` and `pop` for us, we just need to implement `peek` and `isEmpty`. Our `push` and `pop` methods will be simple wrappers for the array built-ins.

```JavaScript
class Stack {
  items = [];

  push(x) {
    this.items.push(x);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}
```

### The Red Herring

Turns out, this isn't a stack problem at all, it's a _trick problem_. So much attention paid to the details of what qualifies as a **valid parenthesis string** and how **nesting depth** is defined gives the impression that we might need to validate a **valid parenthesis string** ourselves. However, careful consideration of the constraints tells us that there is **no need to worry about the brackets balancing because "it is guaranteed that parentheses expression s is a VPS."** This gives us a lot more freedom in how we solve this particular problem.

### Max Number of Open Parentheses

Because we can always assume we are given a **VPS**, and we only care about the **_maximum_ nesting depth**, all we need to do is keep track of our current, and maximum nesting depth as we iterate over the string. We increase our current nesting depth every time we open a bracket, and decrease it every time we see a closing bracket. It's also important that when we encounter an open bracket, we set our maximum nesting depth to whichever is larger between the current nesting depth and the existing maximum nesting depth.

### Algorithmic Complexity

We can do this in one pass over the string so this solution has a time complexity of O(n). Since we only need to store a few variables and the size of the input has no bearing on how much we need to store, this solution has a space complexity of O(1). Had we used a stack, we could still do this in O(n) time, but we would need O(n) space since we might need to store as many brackets as there are characters in the string.

## Solution Code

```JavaScript
/**
 * @param {string} s
 * @return {number}
 */
function maxDepth(s) {
  const sLength = s.length;
  let depth = 0;
  let maxDepth = 0;

  for (let i = 0; i < sLength; i++) {
    if (s[i] === "(") {
      depth++;
      maxDepth = Math.max(depth, maxDepth);
    }
    if (s[i] === ")") {
      depth--;
    }
  }

  return maxDepth;
}

```

## In Conclusion

The lesson today is _read the question carefully_. Think about what you _don't_ need to do as much as what you do need to do. If this question came up in an interview, I would have spent the first 10 minutes implementing a stack before realizing it wasn't necessary and running out of time.
