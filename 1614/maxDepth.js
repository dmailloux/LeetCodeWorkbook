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

function __test(input) {
  console.log(maxDepth(input));
}

const input = "(1+(2*3)+((8)/4))+1";
__test(input);
