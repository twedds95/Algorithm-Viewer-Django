import React from 'react';
import './App.css';
import NavBar from "./navigationBar";
import Home from "./home";
import SortingVisualizer from "./Animations/sortingAnimations";
import PathFindingVisualizer from "./Animations/pathFindingAnimations";
import FourierDrawings from "./FourierTransforms/fourierTransformDrawings";
import {Route} from "react-router-dom";
import SmartRockets from "./RocketGenerations/SmartRockets";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/sortingVisualization" component={SortingVisualizer}/>
            <Route exact path="/pathFindingVisualization" component={PathFindingVisualizer}/>
            <Route exact path="/fourierTransformDrawings" component={FourierDrawings}/>
            <Route exact path="/generationSmartRockets" component={SmartRockets}/>
        </div>
    );
}

export default App;
