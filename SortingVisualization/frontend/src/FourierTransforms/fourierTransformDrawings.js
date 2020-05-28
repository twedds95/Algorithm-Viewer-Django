import React from "react";
import DrawArea from "./drawingArea";
import dft from "./fourierTransform";

let time = 0;
const HEIGHT = 500;
const WIDTH = window.innerWidth;
const SPEED = 500;
const Y_OFFSET = HEIGHT * 3 / 10;
const X_OFFSET = WIDTH * 3 / 20;

export default class FourierDrawings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawing: [],
            animations: []
        };

        this.startFourier = this.startFourier.bind(this);
    }

    componentDidMount() {
    }

    drawRef = React.createRef();


    renderFourier() {
        const Fourier = [];
        for (let i = 0; i < this.state.animations.length; i++) {
            Fourier.push(this.state.animations[i]);
        }
        return Fourier;
    }

    render() {
        return (
            <div>
                <h1>Fourier Transform Drawings</h1>
                <button onClick={() => this.resetDrawing()}>Reset Sketch</button>
                <button onClick={() => this.startFourier()}>Start Fourier</button>
                <div>
                    <div>
                        {/*<h3>Draw Area</h3>*/}
                        {/*<h3>Fourier Area</h3>*/}
                    </div>
                    <DrawArea ref={this.drawRef}/>
                    <div>
                        <svg id="fourierArea" className="fourierArea">
                            <rect x={X_OFFSET} y={Y_OFFSET} width={WIDTH * 0.35} height="300" stroke="black"
                                  strokeWidth="1" fill="none"/>
                            {this.renderFourier()}
                        </svg>
                    </div>
                </div>

            </div>
        );
    }

    resetDrawing() {
        window.location.reload(true);
    }

    startFourier() {
        let drawing = this.getDrawing();
        let path = [];
        for (let i = 0; i < drawing.length; i++) {
            time = 0;
            let newLine = true;
            while (time <= 2 * Math.PI) {
                let svgRender = []
                let epiCyclesX = this.epiCycles(X_OFFSET, 50, 0, drawing[i].FX);
                let epiCyclesY = this.epiCycles(40, Y_OFFSET, Math.PI / 2, drawing[i].FY);
                let point = {x: epiCyclesX.x, y: epiCyclesY.y};
                path.unshift(point);
                const dt = Math.PI * 2 / drawing[i].FY.length;
                time += dt;
                svgRender.push(epiCyclesX.cycles);
                svgRender.push(epiCyclesY.cycles);
                if (time <= 2 * Math.PI) {
                    svgRender.push(<line x1={epiCyclesX.x} y1={epiCyclesX.y} x2={point.x} y2={point.y}
                                         stroke="black" strokeWidth="1"/>);
                    svgRender.push(<line x1={epiCyclesY.x} y1={epiCyclesY.y} x2={point.x} y2={point.y}
                                         stroke="black" strokeWidth="1"/>);
                }

                let line = "M " + path[0].x + " " + path[0].y;
                for (let k = 1; k < path.length - 1; k++) {
                    if (
                        Math.sqrt(
                            (path[k - 1].x - path[k].x) * (path[k - 1].x - path[k].x)
                            + (path[k - 1].y - path[k].y) * (path[k - 1].y - path[k].y))
                        < 50.0
                        &&
                        !newLine
                    ) {
                        line += " L " + path[k].x + " " + path[k].y;
                    } else {
                        line += " M " + path[k].x + " " + path[k].y;
                    }
                }
                svgRender.push(<path d={line} stroke="black" strokeWidth="1" fill="none"/>);
                newLine = false;

                setTimeout(() => {
                    this.setState({animations: svgRender});
                }, time * SPEED);
            }
        }
    }


    epiCycles(x, y, rotation, fourier) {
        let cycles = [];
        for (let i = 0; i < fourier.length; i++) {
            let prevX = x;
            let prevY = y;
            let freq = fourier[i].freq;
            let radius = fourier[i].amp;
            let phase = fourier[i].phase;
            x += radius * Math.cos(freq * time + phase + rotation);
            y += radius * Math.sin(freq * time + phase + rotation);
            if (i !== 0) {
                cycles.push(<circle cx={prevX} cy={prevY} r={radius} stroke="black" strokeWidth="1" fill="white"/>);
                cycles.push(<line x1={prevX} y1={prevY} x2={x} y2={y} stroke="black" strokeWidth="1"/>);
            }
        }
        return {x: x, y: y, cycles: cycles};
    }

    getDrawing() {
        let drawing = [];
        let x = [];
        let y = [];
        // console.log(this.drawRef.current.state)
        if (!this.drawRef.current.state.lines._tail) {
            return [];
        }
        const lines = this.drawRef.current.state.lines._tail.array;
        // console.log(lines)
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]._root) {
                let root = lines[i]._root.array
                for (let j = 0; j < root.length; j++) {
                    for (let k = 0; k < root[j].array.length; k++) {
                        x.push(root[j].array[k]._root.entries[0][1]);
                        y.push(root[j].array[k]._root.entries[1][1]);
                    }
                }
            }
            let points = lines[i]._tail.array;
            for (let j = 0; j < points.length; j++) {
                x.push(points[j]._root.entries[0][1]);
                y.push(points[j]._root.entries[1][1]);
                // console.log('x:' + points[j]._root.entries[0][1] + ', ' +  'y: ' + points[j]._root.entries[1][1]);
            }
            let fourierX = dft(x);
            let fourierY = dft(y);
            fourierX.sort((a, b) => b.amp - a.amp);
            fourierY.sort((a, b) => b.amp - a.amp);
            drawing.push({FX: fourierX, FY: fourierY});
        }
        // console.log(drawing);
        this.setState({drawing: drawing});
        return drawing;
    }
}