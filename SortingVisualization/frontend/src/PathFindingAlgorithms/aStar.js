export function getA_StarAnimations(squares) {
    const animations = [];
    if (squares.length <= 1) return animations;
    pathHelper(squares, animations);
    return animations;
}

function pathHelper(squares, animations) {
    let start = squares.filter(function (ele) {
        if (ele.isA === 'start') {
            return ele;
        } else {
            return null;
        }
    })[0];
    let end = squares.filter(function (ele) {
        if (ele.isA === 'end') {
            return ele;
        } else {
            return null;
        }
    })[0];
    start.gScore = 0;
    start.fScore = heuristic(start, end);
    let openSet = [];
    openSet.push(start);
    let previous = start;
    while (openSet.length > 0) {
        let current = openSet[0];
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].fScore < current.fScore) {
                current = openSet[i];
            }
        }
        if (current.previous !== previous && current !== start) {
            findLastCommonPoint(current, previous, animations);
        }
        if (current !== start && current !== end) {
            current.isA = 'path';
            animations.push({action: 'newPath', square: current});
        }
        previous = current;
        if (current === end) {
            return;
        }
        openSet = arrayRemove(openSet, current);
        let neighbours = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let neighbour = squares.filter(function (ele) {
                    if (ele.x === current.x + i && ele.y === current.y + j
                        && (ele.isA === 'free' || ele.isA === 'end' || ele.isA === 'wall')
                    ) {
                        return ele;
                    } else {
                        return null;
                    }
                })[0];
                if (!neighbour) {
                    neighbour = {isA: 'offMap'};
                }
                neighbours.push(neighbour);
            }
        }
        if (neighbours[1].isA === 'wall' && neighbours[3].isA === 'wall') {
            neighbours[0].isA = 'wall';
        }
        if (neighbours[1].isA === 'wall' && neighbours[5].isA === 'wall') {
            neighbours[2].isA = 'wall';
        }
        if (neighbours[3].isA === 'wall' && neighbours[7].isA === 'wall') {
            neighbours[6].isA = 'wall';
        }
        if (neighbours[5].isA === 'wall' && neighbours[7].isA === 'wall') {
            neighbours[8].isA = 'wall';
        }

        let possibilities = [];
        for (let i = 0; i < neighbours.length; i++) {
            if (neighbours[i].isA !== "wall" && neighbours[i].isA !== "offMap") {
                possibilities.push(neighbours[i]);
            }
        }

        for (let i = 0; i < possibilities.length; i++) {
            let neighbour = possibilities[i];
            let tempScore = current.gScore + weight(current, neighbour, end);
            if (!neighbour.gScore || tempScore < neighbour.gScore) {
                neighbour.gScore = tempScore;
                neighbour.fScore = tempScore + heuristic(neighbour, end);
                neighbour.previous = current;
                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour);
                }
            }
        }
    }
    let failure = squares.filter(function (ele) {
        if (ele.isA === 'path') {
            return ele;
        } else {
            return null;
        }
    });
    for (let i = 0; i < failure.length; i++) {
        animations.push({action: 'failure', square: failure[i]});
    }
}

function heuristic(position, end) {
    let x1 = position.x;
    let y1 = position.y;
    let x2 = end.x;
    let y2 = end.y;
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    // return Math.abs((x2 - x1)) + Math.abs((y2 - y1));
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

function weight(current, neighbour, end) {
    let w;
    if (end.x === neighbour.x || end.y === neighbour.y) {
        w = 0.9;
    } else if (current.x === neighbour.x || current.y === neighbour.y) {
        w = 1;
    } else {
        w = 1;
    }
    return w;
}

function findLastCommonPoint(current, previous, animations) {
    let oldPath = [];
    let newPath = [];
    let old = previous;
    let newTop = current;
    while (previous) {
        oldPath.push(previous);
        previous = previous.previous
    }
    while (current) {
        newPath.push(current);
        current = current.previous
    }

    let commonElements = newPath.filter(value => oldPath.includes(value));
    while (!commonElements.includes(old)) {
        animations.push({action: 'visit', square: old});
        old = old.previous;
    }
    let rebuildPath = [];
    while (!commonElements.includes(newTop)) {
        rebuildPath.unshift(newTop);
        newTop = newTop.previous;
    }
    for (let i = 0; i < rebuildPath.length; i++) {
        animations.push({action: 'rebuild', square: rebuildPath[i]});
    }
}