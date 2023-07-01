export function getInsertionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      // Push indices for visualization
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);

      // Swap elements
      array[j + 1] = array[j];

      // Push indices and heights for visualization
      animations.push([j + 1, array[j + 1]]);
      animations.push([j, array[j]]);

      j--;
    }

    array[j + 1] = key;
  }

  return animations;
}
