export const getQuickSortAnimations = (array) => {
  const animations = [];
  const sortedArray = [...array];
  quickSortHelper(sortedArray, 0, sortedArray.length - 1, animations);
  return animations;
};

const quickSortHelper = (array, startIdx, endIdx, animations) => {
  if (startIdx >= endIdx) return;

  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
};

const partition = (array, startIdx, endIdx, animations) => {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    // Compare array[i] with pivotValue
    animations.push([i, endIdx]); // Highlight the bars being compared

    if (array[i] <= pivotValue) {
      // Swap array[i] with array[pivotIdx]
      animations.push([i, array[pivotIdx], pivotIdx, array[i]]); // Swap the heights of the bars
      swap(array, i, pivotIdx);
      pivotIdx++;
    } else {
      animations.push([i, array[i], i, array[i]]); // Restore the original color of the bar
    }
  }

  // Swap array[pivotIdx] with array[endIdx]
  animations.push([pivotIdx, array[endIdx], endIdx, array[pivotIdx]]); // Swap the heights of the bars
  swap(array, pivotIdx, endIdx);

  return pivotIdx;
};

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
