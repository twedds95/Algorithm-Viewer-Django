export function getselectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(
    mainArray,
    animations,
) {
    for (let i = mainArray.length - 1; i >= 0; i--) {
        let maxIndex = i;
        for (let j = i; j >= 0; j--) {
            animations.push({action: 'compare', indOne: j, indTwo: maxIndex});
            animations.push({action: 'normal', indOne: j, indTwo: maxIndex});
            if (mainArray[j] > mainArray[maxIndex]) {
                maxIndex = j;
            }
        }
        animations.push({
            action: 'swap',
            indOne: i,
            indTwo: maxIndex,
            heightOne: mainArray[maxIndex],
            heightTwo: mainArray[i]
        });
        let temp = mainArray[i];
        mainArray[i] = mainArray[maxIndex];
        mainArray[maxIndex] = temp;
    }

}