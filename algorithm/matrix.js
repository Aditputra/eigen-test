function matrixResult(matrix) {
  let sumDiagonal = { left: 0, right: 0 };
  const matrixLength = matrix.length;
  const sameElLength = matrix
    .slice(1)
    .every((arr) => arr.length === matrix[0].length);
  if (sameElLength) {
    for (let i = 0; i < matrixLength; i++) {
      const matrixElLeft = !isNaN(parseFloat(matrix[i][i])) ? matrix[i][i] : 0;
      const matrixElRight = !isNaN(parseFloat(matrix[i][matrixLength - i - 1]))
        ? matrix[i][matrixLength - i - 1]
        : 0;
      sumDiagonal.left += matrixElLeft;
      sumDiagonal.right += matrixElRight;
    }
  }
  return parseFloat(
    (parseFloat(sumDiagonal.left) - parseFloat(sumDiagonal.right)).toFixed(1)
  );
}
const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrixResult(matrix));
