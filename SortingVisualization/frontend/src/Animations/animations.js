import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import React from "react";
import './animations.css';

const PRIMARY_COLOR = '#428bca';
const SECONDARY_COLOR = '#150855';
const SPEED = 1;
const NUMBER_OF_ARRAY_BARS = 350;
const MAX_HEIGHT = 500;

const SORTING_ALGORITHMS = ["Merge Sort", "Quick Sort", "Selection Sort", "Insertion Sort"];

// Referenced and modified from Youtube video https://www.youtube.com/watch?v=pFXYym4Wbkc
// and github source code:
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, MAX_HEIGHT));
        }
        this.setState({array});
    }

    animateSorting() {
        let animations = [];
        switch (document.getElementById('algorithm').value) {
            case "Merge Sort":
                animations = getMergeSortAnimations(this.state.array);
                break;
            case "Quick Sort":
                break;
            case "Selection Sort":
                break;
            case "Insertion Sort":
                break;

        }

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
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

    createSelection() {
        let select = []

        // Outer loop to create parent
        for (let i = 0; i < SORTING_ALGORITHMS.length; i++) {
            select.push(<option value={SORTING_ALGORITHMS[i]}>{SORTING_ALGORITHMS[i]}</option>)
        }
        return select
    }

    render() {
        const {array} = this.state;

        return (
            <div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <label>Select Sorting Algorithm: </label>
                <select className="m-2" id="algorithm">
                    {this.createSelection()}
                </select>
                <button onClick={() => this.animateSorting()}>Start Sort</button>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
