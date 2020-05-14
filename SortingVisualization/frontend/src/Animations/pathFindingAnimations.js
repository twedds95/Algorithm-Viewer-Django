import React from "react";
import './pathFindingAnimations.css';
import {getA_StarAnimations} from "../PathFindingAlgorithms/aStar";

const PRIMARY_COLOR = '#e7e4e4';
const START_COLOR = 'rgb(3,253,77)';
const END_COLOR = '#c925e7';
const WALL_COLOR = '#000000';
const PATH_COLOR = '#428bca';
const VISITED_COLOR = 'rgba(213,48,48,0.47)';
const FAILURE_COLOR = 'rgb(255,0,0)';

const SPEED = 50;
const PROB_OF_WALL = 0.25;
const NUMBER_OF_BOXES_WIDTH = 120;
const NUMBER_OF_BOXES_HEIGHT = 60;
const BOX_DIM = 6;
const MARGIN = 2;

const ALGORITHMS = ["A*"];


export default class PathFindingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        this.resetGrid();
    }

    resetGrid() {
        const grid = [];
        //TODO: Reset not working for some reason, need to refresh every time

        // let points = generateTwoUniquePoints();
        // let start = {isA: 'start', x: points.startX, y: points.startY};
        // let end = {isA: 'end', x: points.endX, y: points.endY};
        let start = {isA: 'start', x: 0, y: 0};
        let end = {isA: 'end', x: NUMBER_OF_BOXES_WIDTH - 1, y: NUMBER_OF_BOXES_HEIGHT - 1};
        for (let i = 0; i < NUMBER_OF_BOXES_WIDTH; i++) {
            for (let j = 0; j < NUMBER_OF_BOXES_HEIGHT; j++) {
                if (!((i === start.x && j === start.y) || (i === end.x && j === end.y))) {
                    if (Math.random() < PROB_OF_WALL) {
                        grid.push({isA: 'wall', x: i, y: j});
                    } else {
                        grid.push({isA: 'free', x: i, y: j});
                    }
                }
            }
        }
        grid.push(start);
        grid.push(end);

        this.setState({grid});
    }

    animatePath() {
        let animations = [];
        switch (document.getElementById('algorithm').value) {
            case "A*":
                animations = getA_StarAnimations(this.state.grid);
                break;

            default:
                break;
        }

        for (let i = 0; i < animations.length; i++) {
            let action = animations[i].action;
            const square = animations[i].square;
            const gridSquareID = (square.y * NUMBER_OF_BOXES_WIDTH) + square.x + 1;
            const gridSquare = document.getElementById(gridSquareID);
            const gridSquareStyle = gridSquare.style;
            if (action === 'newPath') {
                setTimeout(() => {
                    gridSquareStyle.backgroundColor = PATH_COLOR;
                }, i * SPEED);
            } else if (action === 'visit') {
                setTimeout(() => {
                    gridSquareStyle.backgroundColor = VISITED_COLOR;
                }, i * SPEED);
            } else if (action === 'failure') {
                setTimeout(() => {
                    gridSquareStyle.backgroundColor = FAILURE_COLOR;
                }, i * SPEED);
            } else if (action === 'rebuild') {
                setTimeout(() => {
                    gridSquareStyle.backgroundColor = PATH_COLOR;
                }, i * SPEED);
            }
        }
    }

    createSelection() {
        let select = []
        for (let i = 0; i < ALGORITHMS.length; i++) {
            select.push(<option value={ALGORITHMS[i]}>{ALGORITHMS[i]}</option>)
        }
        return select
    }

    renderTheGrid() {
        const {grid} = this.state;
        let squares = [];
        for (let i = 0; i < grid.length; i++) {
            let y = grid[i].y * (BOX_DIM + MARGIN)
            let x = grid[i].x * (BOX_DIM + MARGIN)
            let key = (grid[i].y * NUMBER_OF_BOXES_WIDTH) + grid[i].x + 1;
            switch (grid[i].isA) {
                case 'free':
                    squares.push(<div
                        className="grid-square"
                        id={key}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            top: `${y}px`,
                            left: `${x}px`,
                            width: `${BOX_DIM}px`,
                            height: `${BOX_DIM}px`,
                            margin: `${MARGIN}px`,
                        }}>
                    </div>)
                    break;
                case 'wall':
                    squares.push(<div
                        className="grid-square"
                        id={key}
                        style={{
                            backgroundColor: WALL_COLOR,
                            top: `${y}px`,
                            left: `${x}px`,
                            width: `${BOX_DIM}px`,
                            height: `${BOX_DIM}px`,
                            margin: `${MARGIN}px`,
                        }}>
                    </div>)
                    break;
                case 'start':
                    squares.push(<div
                        className="grid-square"
                        id={key}
                        style={{
                            backgroundColor: START_COLOR,
                            top: `${y}px`,
                            left: `${x}px`,
                            width: `${BOX_DIM}px`,
                            height: `${BOX_DIM}px`,
                            margin: `${MARGIN}px`,
                        }}>
                    </div>)
                    break;
                case 'end':
                    squares.push(<div
                        className="grid-square"
                        id={key}
                        style={{
                            backgroundColor: END_COLOR,
                            top: `${y}px`,
                            left: `${x}px`,
                            width: `${BOX_DIM}px`,
                            height: `${BOX_DIM}px`,
                            margin: `${MARGIN}px`,
                        }}>
                    </div>)
                    break;
                default:
                    break;
            }

        }
        return squares;
    }

    render() {
        return (
            <div>
                <h1> Visualize Path Finding Algorithms at Work</h1>
                <button onClick={() =>this.resetGrid()}>Generate New Grid</button>
                <label>Select Path Finding Algorithm: </label>
                <select className="m-2" id="algorithm">
                    {this.createSelection()}
                </select>
                <button onClick={() => this.animatePath()}>Find Path</button>
                <div className="array-container">
                    {this.renderTheGrid()}
                </div>
            </div>
        );
    }
}

function generateTwoUniquePoints() {
    let min = 0;
    let xS = [];
    let yS = [];
    let points;
    for (let i = 0; i < 2; i++) {
        xS.push(Math.floor(Math.random() * (NUMBER_OF_BOXES_WIDTH - min) + min));
        yS.push(Math.floor(Math.random() * (NUMBER_OF_BOXES_HEIGHT - min) + min));
    }
    if (xS[0] === xS[1] && yS[0] === yS[1]) {
        points = generateTwoUniquePoints();
    } else {
        points = {startX: xS[0], startY: yS[0], endX: xS[1], endY: yS[1]};
    }
    return points;
}