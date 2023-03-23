import { getAdjacentOnes } from "./adjacency.js";

export const tick = (matrix, rowLen, colLen) => {
  const newMatrix = matrix.slice();
  const newAgent = [];
  const startTime = performance.now();

  for (let index = 0; index < rowLen * colLen; index++) {
    const i = Math.floor(index / colLen);
    const j = index % colLen;

    if (newMatrix[index] === 4) { newMatrix[index] = 0; }
    const cell = matrix[index];
    if (cell === 3) {
      newAgent.push([i, j]);
    }

    const adjacentOnes = getAdjacentOnes(i, j, matrix, rowLen, colLen);
    if ((cell === 0 || cell === 3) && adjacentOnes > 1 && adjacentOnes < 5) {
      newMatrix[index] = 1;
      if (cell === 3) { newAgent.push([i, j]); }
    } else if (cell === 1 && !(adjacentOnes > 3 && adjacentOnes < 5)) {
      newMatrix[index] = 0;
    } else if (cell === 3) {
      newMatrix[index] = 0;
      newAgent.push([i, j]);
    }
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  console.log(`Time taken in ms: ${timeTaken}`);
  return [newMatrix, newAgent.pop(), matrix];
};