import React from "react";
import './pathFindingAnimations.css';
import {getA_StarAnimations} from "../PathFindingAlgorithms/aStar";

const PRIMARY_COLOR = '#b6adad';
const START_COLOR = '#428bca';
const END_COLOR = '#c925e7';
const WALL_COLOR = '#000000';
const PATH_COLOR = 'rgba(3,253,77,0.47)';
const SPEED = 0.7;
const PROB_OF_WALL = 0.2;
const NUMBER_OF_BOXES_WIDTH = 80;
const NUMBER_OF_BOXES_HEIGHT = 40;
const BOX_DIM = 10;
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
        let squares = [];

        function generateTwoUniquePoints() {
            let min = 0;
            let xS = [];
            let yS = [];
            let points = {};
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

        let points = generateTwoUniquePoints();
        let start = {isA: 'start', x: points.startX, y: points.startY};
        let end = {isA: 'end', x: points.endX, y: points.endY};
        for (let i = 0; i < NUMBER_OF_BOXES_WIDTH; i++) {
            for (let j = 0; j < NUMBER_OF_BOXES_HEIGHT; j++) {
                if (!((i === start.x && j === start.y) || (i === end.x && j === end.y))) {
                    if (Math.random() < PROB_OF_WALL) {
                        squares.push({isA: 'wall', x: i, y: j});
                    } else {
                        squares.push({isA: 'free', x: i, y: j})
                    }
                }
            }
        }
        squares.push(start);
        squares.push(end);
        this.setState({grid: squares});
    }

    animatePath() {
        let animations = [];
        switch (document.getElementById('algorithm').value) {
            case "A*":
                animations = getA_StarAnimations(this.state);
                break;

            default:
                break;
        }

        for (let i = 0; i < animations.length; i++) {
            const squares = document.getElementsByClassName('grid-square');
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
        let squares = [];
        let grid = this.state.grid;
        for (let i = 0; i < grid.length; i++) {
            {
                let y = grid[i].y * (BOX_DIM + MARGIN)
                let x = grid[i].x * (BOX_DIM + MARGIN)
                switch (grid[i].isA) {
                    case 'wall':
                        squares.push(<div
                            className="grid-square"
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
                    case 'free':
                        squares.push(<div
                            className="grid-square"
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
                    case 'path':
                        squares.push(<div
                            className="grid-square"
                            style={{
                                backgroundColor: PATH_COLOR,
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
        }
        return squares
    }

    render() {
        return (
            <div>
                <h1> Visualize Path Finding Algorithms at Work</h1>
                <button onClick={() => this.resetGrid()}>Generate New Grid</button>
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
