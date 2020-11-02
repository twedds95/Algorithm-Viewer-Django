export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    sortHelper(array, animations);
    return animations;
}

function sortHelper(
    mainArray,
    animations,
) {
    for (let i = 1; i < mainArray.length; i++) {
        let key = mainArray[i];
        let j = i - 1;
        while (j >= 0 && key < mainArray[j]) {
            animations.push({action: 'compare', indOne: j, indTwo: i});
            animations.push({action: 'normal', indOne: j, indTwo: i});
            animations.push({action: 'newHeight', indOne: j + 1, heightOne: mainArray[j]});
            mainArray[j + 1] = mainArray[j];
            j--;
        }

        animations.push({
            action: 'newHeight',
            indOne: j + 1,
            heightOne: key
        });
        mainArray[j + 1] = key;
    }

}