import React from "react";
import './App.css';
import {Link} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap/';

export default class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar expand="lg" fluid={true}>
                    <Navbar.Collapse>
                        <Nav>
                            <Link to='/'>Home</Link>
                            <Link to='/sortingVisualization'>Sorting Algorithms Visualization</Link>
                            <Link to='/pathFindingVisualization'>Path Finding Visualization</Link>
                            <Link to='/fourierTransformDrawings'>Fourier Transform Drawings</Link>
                            <Link to='/generationSmartRockets'>Smart Rockets</Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
        );
    }
}

