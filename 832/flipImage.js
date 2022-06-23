/**
 * @param {Array<Array<0 | 1>>} image
 * @return {Array<Array<0 | 1>>}
 */
function flipAndInvertImage(image) {
  const imageLength = image.length;

  for (let i = 0; i < imageLength; i++) {
    reverseArrayOfBitsInPlace(image[i]);
  }

  for (let i = 0; i < imageLength; i++) {
    invertArrayOfBitsInPlace(image[i]);
  }
  return image;
}

/**
 * @param {Array<0 | 1>} bitArray
 */
function reverseArrayOfBitsInPlace(bitArray) {
  const bitArrayLength = bitArray.length;
  let newArr = [];
  for (let i = bitArrayLength - 1; i >= 0; i--) {
    newArr.push(bitArray[i]);
  }

  for (let i = bitArrayLength - 1; i >= 0; i--) {
    bitArray[i] = newArr[i];
  }
}

/**
 * @param {Array<0 | 1>} bitArray
 */
function invertArrayOfBitsInPlace(bitArray) {
  const bitArrayLength = bitArray.length;
  for (let i = 0; i < bitArrayLength; i++) {
    bitArray[i] = getBitInverse(bitArray[i]);
  }
}

/**
 * @param {0 | 1} bit
 * @return { 0 | 1}
 */
function getBitInverse(bit) {
  if (bit === 0) {
    return 1;
  } else {
    return 0;
  }
}

function __test(input) {
  console.log(flipAndInvertImage(input));
}

const input = [
  [1, 1, 0],
  [1, 0, 1],
  [0, 0, 0],
];

__test(input);
