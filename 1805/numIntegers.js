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
