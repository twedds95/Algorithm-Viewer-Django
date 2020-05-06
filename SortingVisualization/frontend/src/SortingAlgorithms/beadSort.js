export function getBeadSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    beadSortHelper(array, animations);
    return animations;
}

function beadSortHelper(
    mainArray,
    animations,
) {
    let max = mainArray[0];
    let animateBeads = [];
    for (let i = 1; i < mainArray.length; i++) {
        if (mainArray[i] > max) {
            max = mainArray[i];
        }
    }
    let BEAD = [];
    for (let i = 0; i < mainArray.length; i++) {
        BEAD[i] = [];
        for (let j = 0; j < mainArray[i]; j++) {
            BEAD[i][j] = 1;
        }
        for (let j = mainArray[i]; j < max; j++) {
            BEAD[i][j] = 0;
        }
    }
    for (let j = 0; j < max - 1; j++) {
        for (let i = mainArray.length - 1; i >= 0; i--) {
            // if there's room, get beads from the closet left column with beads
            if (BEAD[i][j] === 0 && ((j > 0 && BEAD[i][j - 1] === 1) || j === 0)) {
                let x = i;
                while (x > 0 && BEAD[x][j] === 0) {
                    x--;
                }
                let y = j;
                while (y < max && BEAD[x][y] === 1) {
                    y++;
                }
                for (let k = j; k < y; k++) {
                    BEAD[i][k] = 1;
                    BEAD[x][k] = 0;
                }
                animateBeads.push({ind: i, h: y});
                if (x > 0 && BEAD[x - 1][j] === 0) {
                    animateBeads.push({ind: x, h: j});
                }
            }
        }
    }

    animateBeads.forEach(function (m) {
        animations.push([m.ind, m.ind]);
        animations.push([m.ind, m.ind]);
        animations.push([m.ind, m.h]);
    });
}