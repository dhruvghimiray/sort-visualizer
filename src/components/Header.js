import React, { useState, useEffect } from "react";
import "../components/CSS/style.css";
import { getMergeSortAnimations } from "./Algorithms/MergeSort";
import { getBubbleSortAnimations } from "./Algorithms/BubbleSort";
import { getInsertionSortAnimations } from "./Algorithms/InsertionSort";
import { getQuickSortAnimations } from "./Algorithms/QuickSort";
import {
  BubbleSortSnippet,
  InsertionSortSnippet,
  MergeSortSnippet,
  QuickSortSnippet,
} from "./Algorithms/CodeSnippets";

const SECONDARY_COLOR = "red";
const PRIMARY_COLOR = "#2196f3";

// Creating array and Sorting State

export default function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [isSorting, setIsSorting] = useState(false);
  const [isBubbleSorting, setIsBubbleSorting] = useState(false);
  const [isInsertionSorting, setIsInsertionSorting] = useState(false);
  const [isQuickSorting, setIsQuickSorting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(3);

  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  // Key Listeners
 
 



  //Sorting Speed

  const handleSpeedSliderChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    setAnimationSpeed(newSpeed);
  };

  const createNewArray = () => {
    const newArray = [];
    const minValue = 20; // Minimum value for the numbers in the array
    const maxValue = 320; // Maximum value for the numbers in the array

    for (let i = 0; i < arraySize; i++) {
      const randomNumber =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      newArray.push(randomNumber);
    }

    setArray(newArray);
  };

  useEffect(() => {
    createNewArray();
    // eslint-disable-next-line
  }, [arraySize]);
  
  



  const handleSliderChange = (e) => {
    const newSize = parseInt(e.target.value);
    setArraySize(newSize);
    setArray((prevArray) =>
      prevArray.map((value, bar) => ({
        value,
        ...bar,
        color: PRIMARY_COLOR,
      }))
    );
  };

  // Stop Sorting function

  const stopSorting = () => {
    setIsSorting(false);
    setIsBubbleSorting(false);
    setIsInsertionSorting(false);
    setIsQuickSorting(false);

    setArray((prevArray) =>
      prevArray.map((bar) => ({ ...bar, color: PRIMARY_COLOR }))
    );

    setIsAnimationEnabled(false);

    // Clear all the timeouts to stop ongoing animations
    let id = window.setTimeout(() => {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // Reinitialize the sorting flags and animation state
    setIsSorting(false);
    setIsBubbleSorting(false);
    setIsInsertionSorting(false);
    setIsQuickSorting(false);
    setIsAnimationEnabled(true);

    createNewArray();
  };

  // Merge Sort Function
  const mergeSort = () => {
    setIsSorting(true);

    // Implement the getMergeSortAnimations function
    const animations = getMergeSortAnimations([...array]);

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      const [barOneIdx, barTwoIdx] = animations[i];

      if (!isAnimationEnabled) {
        return;
      } else if (isColorChange) {
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barOneIdx] = { value: newArray[barOneIdx].value, color };
            newArray[barTwoIdx] = { value: newArray[barTwoIdx].value, color };
            return newArray;
          });

          if (i === animations.length - 1) {
            setIsSorting(false);
          }
        }, i * animationSpeed); // Use the animationSpeed state variable here
      } else {
        const [barOneIdx, newHeight] = animations[i];
        setTimeout(() => {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barOneIdx] = { value: newHeight, color: PRIMARY_COLOR };
            return newArray;
          });

          if (i === animations.length - 1) {
            setIsSorting(false);
          }
        }, i * animationSpeed); // Use the animationSpeed state variable here
      }
    }
  };

  // Bubble Sort

  const bubbleSort = () => {
    setIsBubbleSorting(true);

    // Implement the getBubbleSortAnimations function
    const animations = getBubbleSortAnimations([...array]);

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const [barOneIdx, barTwoIdx] = animations[i];
      if (!isAnimationEnabled) {
        return;
      } else if (isColorChange) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barOneIdx] = { value: newArray[barOneIdx].value, color };
            newArray[barTwoIdx] = { value: newArray[barTwoIdx].value, color };
            return newArray;
          });

          if (i === animations.length - 1) {
            setIsBubbleSorting(false);
          }
        }, i * animationSpeed);
      } else {
        const [barIdx, newHeight] = animations[i];
        setTimeout(() => {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barIdx] = { value: newHeight, color: PRIMARY_COLOR };
            return newArray;
          });

          if (i === animations.length - 1) {
            setIsBubbleSorting(false);
          }
        }, i * animationSpeed);
      }
    }
    
    
  };

  // Insertion Sort

  const insertionSort = () => {
    setIsInsertionSorting(true);
    const animations = getInsertionSortAnimations([...array]);

    for (let i = 0; i < animations.length; i++) {
      const [barIdx, newHeight] = animations[i];

      setTimeout(() => {
        setArray((prevArray) => {
          const newArray = [...prevArray];
          newArray.forEach((bar, index) => {
            if (index === barIdx) {
              // Highlight the bars being compared or swapped in red
              newArray[index] = { value: newHeight, color: SECONDARY_COLOR };
            } else {
              // Restore the primary color for other bars
              newArray[index] = { value: bar.value, color: PRIMARY_COLOR };
            }
          });
          return newArray;
        });

        if (i === animations.length - 1) {
          setIsInsertionSorting(false);

          // Set a timeout to turn all bars back to primary color (blue)
          setTimeout(() => {
            setArray((prevArray) =>
              prevArray.map((bar) => ({
                value: bar.value,
                color: PRIMARY_COLOR,
              }))
            );
          }, animationSpeed);
        }
      }, i * animationSpeed);
    }
  };

  //Quick Sort

  // Quick Sort

  const quickSort = () => {
    setIsQuickSorting(true);
    const animations = getQuickSortAnimations([...array]);

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[i];

      setTimeout(() => {
        setArray((prevArray) => {
          const newArray = [...prevArray];
          newArray[barOneIdx] = { value: newHeightOne, color: PRIMARY_COLOR };
          newArray[barTwoIdx] = { value: newHeightTwo, color: SECONDARY_COLOR };
          return newArray;
        });

        if (i === animations.length - 1) {
          setIsQuickSorting(false);
          setArray((prevArray) =>
            prevArray.map((bar) => ({ ...bar, color: PRIMARY_COLOR }))
          );
        }
      }, i * animationSpeed);
    }
  };

  // Dark Mode

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    createNewArray();
    // eslint-disable-next-line
  }, [arraySize, isDarkMode]);

  return (
    <>
      <div>
        <h1
          className={`text-center my-0 ${
            !isDarkMode ? " text-light bg-body-tertiary" : ""
          }`}
          style={isDarkMode ? { backgroundColor: "#6554AF" } : {}}
          data-bs-theme="dark"
        >
          Algorithm Visualizer
        </h1>

        <nav
          className={`navbar ${
            isDarkMode ? "" : "bg-body-tertiary text-light"
          }`}
          style={isDarkMode ? { backgroundColor: "#6554AF" } : {}}
          data-bs-theme="dark"
        >
          <form className="container-fluid justify-content-start">
            <button
              className={`btn ${
                isDarkMode ? "btn-outline-dark" : "btn-outline-light"
              } mx-2`}
              type="button"
              onClick={createNewArray}
              disabled
            >
              Slide to create array
            </button>

            <input
              type="range"
              min="20"
              max="320"
              value={arraySize}
              className="slider"
              onChange={handleSliderChange}
              disabled={
                isSorting ||
                isBubbleSorting ||
                isInsertionSorting ||
                isQuickSorting
              }
            />

            <button
              className={`btn ${
                isDarkMode ? "btn-outline-dark" : "btn-outline-light"
              } mx-2`}
              type="button"
              disabled
            >
              Slide to change Speed
            </button>

            <input
              type="range"
              min="1"
              max="8"
              value={animationSpeed}
              className="slider"
              onChange={handleSpeedSliderChange}
              disabled={
                isSorting ||
                isBubbleSorting ||
                isInsertionSorting ||
                isQuickSorting
              }
            />
            <label>{`Animation Speed: ${animationSpeed}x`}</label>

            {/* Dark Mode Toggle */}
            <div className="form-check form-switch " id="main-box">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={isDarkMode}
                onChange={() => setIsDarkMode((prevMode) => !prevMode)}
              />
              <label
                style={isDarkMode ? { backgroundColor: "#6554AF" } : {}}
                htmlFor="flexSwitchCheckChecked"
              >
                Toggle for Surprise !
              </label>
            </div>

            <div className="ms-auto">
              <button
                className={`btn btn ${
                  isDarkMode ? "btn-dark" : "btn-outline-danger"
                } mx-2`}
                type="button"
                onClick={stopSorting}
              >
                Stop Sorting
              </button>

              <button
                className={`btn btn-sm ${
                  isDarkMode ? "btn-dark" : "btn-outline-light"
                } mx-2`}
                type="button"
                disabled={
                  isSorting ||
                  isBubbleSorting ||
                  isInsertionSorting ||
                  isQuickSorting
                }
                onClick={bubbleSort}
                data-bs-toggle="offcanvas"
                data-bs-target="#bubbleSort"
                aria-controls="offcanvasScrolling"
              >
                Bubble Sort
              </button>

              {/* Bubble Sort offcanvas */}

              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="bubbleSort"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header">
                  <h2 className="offcanvas-title" id="offcanvasScrollingLabel">
                    BubbleSort
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <p>
                    Bubble Sort is a basic and straightforward sorting algorithm
                    that repeatedly compares adjacent elements and swaps them if
                    they are in the wrong order. It gets its name because
                    smaller elements "bubble" to the beginning of the array
                    during each iteration. Bubble Sort has an average and
                    worst-case time complexity of O(n^2), where n is the number
                    of elements in the array.
                  </p>
                  <hr />
                  <h3>Code</h3>
                  <br />
                  <BubbleSortSnippet />
                </div>
              </div>

              <button
                className={`btn btn-sm ${
                  isDarkMode ? "btn-dark" : "btn-outline-light"
                } mx-2`}
                type="button"
                disabled={
                  isSorting ||
                  isBubbleSorting ||
                  isInsertionSorting ||
                  isQuickSorting
                }
                onClick={insertionSort}
                data-bs-toggle="offcanvas"
                data-bs-target="#insertionSort"
                aria-controls="offcanvasScrolling"
              >
                Insertion Sort
              </button>

              {/* Insertion Sort offCanvas */}
              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="insertionSort"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header">
                  <h2 className="offcanvas-title" id="offcanvasScrollingLabel">
                    Insertion Sort
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <p>
                    Insertion Sort is a simple and efficient sorting algorithm
                    that works by repeatedly inserting elements from an unsorted
                    portion of the array into their correct positions in the
                    sorted portion. It has an average and worst-case time
                    complexity of O(n^2), where n is the number of elements in
                    the array.
                  </p>
                  <hr />
                  <h3>Code</h3>
                  <br />
                  <InsertionSortSnippet />
                </div>
              </div>

              <button
                className={`btn btn-sm ${
                  isDarkMode ? "btn-dark" : "btn-outline-light"
                } mx-2`}
                type="button"
                disabled={
                  isSorting ||
                  isBubbleSorting ||
                  isInsertionSorting ||
                  isQuickSorting
                }
                onClick={quickSort}
                data-bs-toggle="offcanvas"
                data-bs-target="#quickSort"
                aria-controls="offcanvasScrolling"
              >
                Quick Sort
              </button>

              {/* Quick Sort offCanvas */}

              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="quickSort"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header">
                  <h2 className="offcanvas-title" id="offcanvasScrollingLabel">
                    Quick Sort
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <p>
                    Quick Sort is a widely used sorting algorithm based on the
                    divide-and-conquer strategy. It works by selecting a pivot
                    element from the array and partitioning the other elements
                    into two sub-arrays, according to whether they are less than
                    or greater than the pivot. The sub-arrays are then
                    recursively sorted. Quick Sort has an average-case time
                    complexity of O(n log n), making it one of the fastest
                    sorting algorithms. However, in the worst-case scenario,
                    when the pivot selection is poor, it can degrade to O(n^2).
                  </p>
                  <hr />
                  <h3>Code</h3>
                  <br />
                  <QuickSortSnippet />
                </div>
              </div>

              <button
                className={`btn btn-sm ${
                  isDarkMode ? "btn-dark" : "btn-outline-light"
                } mx-2`}
                type="button"
                disabled={
                  isSorting ||
                  isBubbleSorting ||
                  isInsertionSorting ||
                  isQuickSorting
                }
                onClick={mergeSort}
                data-bs-toggle="offcanvas"
                data-bs-target="#mergeSort"
                aria-controls="offcanvasScrolling"
              >
                Merge Sort
              </button>

              {/* Merge Sort offCanvas */}

              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="mergeSort"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header">
                  <h2 className="offcanvas-title" id="offcanvasScrollingLabel">
                    Merge Sort
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <p>
                    Merge sort is a sorting algorithm that divides the input
                    array into smaller subarrays, sorts them independently, and
                    then merges them to obtain a final sorted array. It follows
                    the divide-and-conquer approach and has a time complexity of
                    O(n log n).
                  </p>
                  <hr />
                  <h3>Code</h3>
                  <br />
                  <MergeSortSnippet />
                </div>
              </div>
            </div>
          </form>
        </nav>
      </div>

      <div style={isDarkMode ? { backgroundColor: "#9575DE" } : {}}>
        <div className="continer-fluid" id="bar-container">
          <div id="bars" className="flex-container">
            {array.map((bar, index) => (
              <span
                key={index}
                className="bar"
                style={{
                  height: `${bar.value * 1.7}px`,
                  backgroundColor: isDarkMode ? "#2B2730" : bar.color,
                  width: "2px",
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
