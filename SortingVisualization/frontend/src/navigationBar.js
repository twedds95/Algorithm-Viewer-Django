import React from "react";
import {Link} from 'react-router-dom';
import './App.css';

export default class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Link to='/' className="Link"> Home </Link>
                <Link to='/sortingVisualization' className="Link"> Sorting Algorithms Visualization</Link>
                <Link to='/pathFindingVisualization' className="Link">Path Finding Visualization</Link>
                <Link to='/fourierTransformDrawings' className="Link">Fourier Transform Drawings</Link>
                <Link to='/generationSmartRockets' className="Link">Smart Rockets</Link>
            </div>
        );
    }
}