export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    if (startIdx >= endIdx) return;
    let pivot = splitForQuick(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivot - 1, animations);
    quickSortHelper(mainArray, pivot + 1, endIdx, animations);
}

function swap(mainArray, i, j) {
    let temp = mainArray[i];
    mainArray[i] = mainArray[j];
    mainArray[j] = temp
}

function splitForQuick(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    let k = mainArray[startIdx];
    let j = startIdx + 1;
    for (let i = startIdx + 1; i <= endIdx; i++) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (mainArray[i] < k) {
            animations.push([j, mainArray[i]]);
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i, mainArray[j]]);
            swap(mainArray, i, j);
            j++;
        }
        else {
            animations.push([i, mainArray[i]]);
        }
    }
    animations.push([j-1, startIdx]);
    animations.push([j-1, startIdx]);
    animations.push([j-1, mainArray[startIdx]]);
    animations.push([j-1, startIdx]);
    animations.push([j-1, startIdx]);
    animations.push([startIdx, mainArray[j-1]]);
    swap(mainArray, j - 1, startIdx);
    return j - 1;
}