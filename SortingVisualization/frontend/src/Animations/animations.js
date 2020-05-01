import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';

const PRIMARY_COLOR = '#428bca';
const SECONDARY_COLOR = '#150855';
const SPEED = 1;

// Referenced and modified from Youtube video https://www.youtube.com/watch?v=pFXYym4Wbkc
// and github source code:
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx

export function changeColor() {
    const arrayBars = document.getElementsByClassName('rect-bar');
    for (const bar in arrayBars) {
        if (bar.style.fill === PRIMARY_COLOR){
            bar.style.fill = SECONDARY_COLOR
        }
        else {
            bar.style.fill = PRIMARY_COLOR
        }
    }
}

      export function animateSorting(numLib) {
            console.log(numLib)
            let numList = [];
            for (const n in numLib) {
                numList.push(n)
            }
            const animations = getMergeSortAnimations(numList);
            for (let i = 0; i < animations.length; i++) {
              const arrayBars = document.getElementsByClassName('rect-bar');
              const isColorChange = i % 3 !== 2;
              if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                  barOneStyle.fill = color;
                  barTwoStyle.fill = color;
                }, i * SPEED);
              } else {
                setTimeout(() => {
                  const [barOneIdx, newHeight] = animations[i];
                  const barOneStyle = arrayBars[barOneIdx].style;
                  barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
              }
            }
}
