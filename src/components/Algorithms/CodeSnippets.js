export function BubbleSortSnippet() {
    const code =
    `def bubbleSort(arr):
  n = len(arr)
  # Traverse through all array elements
  for i in range(n - 1):

  # Last i elements are already in place
  for j in range(0, n - i - 1):
  # Traverse the array from 0 to n-i-1

  # Swap if the element found is greater than the next element
  if arr[j] > arr[j + 1]:
  arr[j], arr[j + 1] = arr[j + 1], arr[j]
  `;
  
    return <pre>{code}</pre>;
  }
  

  export function InsertionSortSnippet() {
    const code = `def insertionSort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
    key = arr[i]
        
    # Move elements of arr[0..i-1], that are greater than key,
    # to one position ahead of their current position
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key
`;

  
    return <pre>{code}</pre>;
  }



  

export function MergeSortSnippet() {
  const code = `def merge(arr, left, mid, right):
    n1 = mid - left + 1
    n2 = right - mid

    # Create temporary arrays
    L = [0] * n1
    R = [0] * n2

    # Copy data to temporary arrays L[] and R[]
    for i in range(n1):
        L[i] = arr[left + i]
    for j in range(n2):
        R[j] = arr[mid + 1 + j]

    # Merge the temporary arrays back into arr
    i = 0  # Initial index of first subarray
    j = 0  # Initial index of second subarray
    k = left  # Initial index of merged subarray

    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    # Copy the remaining elements of L[], if there are any
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1

    # Copy the remaining elements of R[], if there are any
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def mergeSort(arr, left, right):
    if left < right:
        # Find the middle point
        mid = (left + right) // 2

        # Sort first and second halves
        mergeSort(arr, left, mid)
        mergeSort(arr, mid + 1, right)

        # Merge the sorted halves
        merge(arr, left, mid, right)

# Test the mergeSort function
arr = [64, 34, 25, 12, 22, 11, 90]
n = len(arr)

mergeSort(arr, 0, n - 1)

print("Sorted array:")
for i in range(n):
    print(arr[i], end=" ")
`;

  return <pre>{code}</pre>;
}




export function QuickSortSnippet() {
  const code = `def partition(arr, low, high):
    # Select the rightmost element as the pivot
    pivot = arr[high]
  
    # Index of the smaller element
    i = low - 1
  
    for j in range(low, high):
    # If current element is smaller than or equal to pivot
    if arr[j] <= pivot:
    # Swap elements at i and j
    arr[i + 1], arr[j] = arr[j], arr[i + 1]
    # Move the index of smaller element
    i += 1
  
    # Swap the pivot element with the element at (i + 1)
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
  
    # Return the partition index
    return i + 1

    def quickSort(arr, low, high):
    if low < high:
    # Find the partition index
    pi = partition(arr, low, high)

    # Sort the elements before and after the partition
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
    
`;

  return <pre>{code}</pre>;
}


  