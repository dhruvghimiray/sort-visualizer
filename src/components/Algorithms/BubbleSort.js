export function getBubbleSortAnimations(array) {
    const animations = [];
    const n = array.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Push indices for visualization
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
  
        if (array[j] > array[j + 1]) {
          // Swap elements
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
  
          // Push indices and heights for visualization
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        } else {
          // Push same indices with original heights
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        }
      }
    }
  
    return animations;
  }




  