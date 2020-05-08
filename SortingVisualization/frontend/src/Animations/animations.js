import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getQuickSortAnimations} from "../SortingAlgorithms/quickSort";
import {getBeadSortAnimations} from "../SortingAlgorithms/beadSort";
import React from "react";
import './animations.css';
import {getselectionSortAnimations} from "../SortingAlgorithms/selectionSort";

const PRIMARY_COLOR = '#428bca';
const SECONDARY_COLOR = '#150855';
let SPEED = 1;
const NUMBER_OF_ARRAY_BARS = 350;
const MAX_HEIGHT = 500;

const SORTING_ALGORITHMS = ["Merge Sort", "Quick Sort", "Selection Sort", "Insertion Sort", "Bead (Gravity) Sort"];

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
        var animations = [];
        switch (document.getElementById('algorithm').value) {
            case "Merge Sort":
                // Divide & Conquer by splitting in half always
                animations = getMergeSortAnimations(this.state.array);
                break;
            case "Quick Sort":
                // Divide & Conquer by splitting both sides of a pivot that is now at the right position
                animations = getQuickSortAnimations(this.state.array);
                break;
            case "Selection Sort":
                // Find the smallest/largest number and through it to the front/back
                animations = getselectionSortAnimations(this.state.array);
                break;
            case "Insertion Sort":
                // One by one, find where each number goes and place it there
                break;
            case "Bead (Gravity) Sort":
                // Abacus algorithm, push everything to the right
                animations = getBeadSortAnimations(this.state.array);
                break;
            default:
                break;

        }

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            let action = animations[i].action;

            if (action === 'compare') {
                const barOneIdx = animations[i].indOne;
                const barTwoIdx = animations[i].indTwo;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
            } else if (action === 'normal') {
                const barOneIdx = animations[i].indOne;
                const barTwoIdx = animations[i].indTwo;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
            } else if (action === 'newHeight') {
                setTimeout(() => {
                    const barOneIdx = animations[i].indOne;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${animations[i].heightOne}px`;
                }, i * SPEED);
            } else if (action === 'swap') {
                setTimeout(() => {
                    const barOneIdx = animations[i].indOne;
                    const barTwoIdx = animations[i].indTwo;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${animations[i].heightOne}px`;
                    barTwoStyle.height = `${animations[i].heightTwo}px`;
                }, i * SPEED);
            }
        }
    }

    createSelection() {
        let select = []
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
