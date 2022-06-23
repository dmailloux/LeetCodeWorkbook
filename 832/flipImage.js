/**
 * @param {Array<Array<0 | 1>>} image
 * @return {Array<Array<0 | 1>>}
 */
function flipAndInvertImage(image) {
  const imageLength = image.length;

  for (let i = 0; i < imageLength; i++) {
    reverseAndInvertArrayOfBitsInPlace(image[i]);
  }

  return image;
}

/**
 * @param {Array<0 | 1>} bitArray
 */
function reverseAndInvertArrayOfBitsInPlace(bitArray) {
  const bitArrayLength = bitArray.length;

  let startContainer;
  let endContainer;

  for (let i = 0, j = bitArrayLength - 1; i <= j; i++, j--) {
    startContainer = bitArray[i];
    endContainer = bitArray[j];
    bitArray[i] = getBitInverse(endContainer);
    bitArray[j] = getBitInverse(startContainer);
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
