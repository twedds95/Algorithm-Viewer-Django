import React from "react";
import './App.css';
import { Nav, Navbar } from 'react-bootstrap/';

export default class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar expand="lg" fluid={true}>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/sortingVisualization'>Sorting Algorithms Visualization</Nav.Link>
                            <Nav.Link href='/pathFindingVisualization'>Path Finding Visualization</Nav.Link>
                            <Nav.Link href='/fourierTransformDrawings'>Fourier Transform Drawings</Nav.Link>
                            <Nav.Link href='/generationSmartRockets'>Smart Rockets</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
        );
    }
}

