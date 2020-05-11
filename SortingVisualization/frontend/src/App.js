import React from 'react';
import './App.css';
import NavBar from "./navigationBar";
import Home from "./home";
import SortingVisualizer from "./Animations/sortingAnimations";
import PathFindingVisualizer from "./Animations/pathFindingAnimations";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/sortingVisualization" component={SortingVisualizer} />
      <Route exact path="/pathFindingVisualization" component={PathFindingVisualizer} />
    </div>
  );
}

export default App;
