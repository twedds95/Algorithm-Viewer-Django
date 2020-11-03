import React from "react";
import './App.css';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Algorithm Viewer Project</h1>

                <p>React app to visualize different algorithms, and other fun projects

                Personal project that started off as just a visualization of sorting algorithms, but now takes on any other personal project or challenge I code.</p>
                <h2>List of Challenges Completed:</h2>

                <h3>Sorting Visualizations</h3>
                <div>- Merge Sort</div>
                <div>- Quick Sort</div>
                <div>- Selection Sort</div>
                <div>- Insertion Sort</div>
                <div>- Bead Sort (Gravity Sort)</div>

                <h3>Path Finding Visualization with A*</h3>
                <h3>Fourier Transform Visualization</h3>
                <p>Draw anything and have it drawn back to your using Fourier Transorms to define every continuous line.</p>
                <h3>Smart Rockets (Evolutionary Algorithm)</h3>
                <p>Rockets that evolve from generation to generation as they try to make it to their landing zone without crashing.</p>
            </div>
        );
    }
}