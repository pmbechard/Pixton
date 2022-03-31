// FIELD DATA
const grid = document.getElementById('grid');
let gridDimension = 16;
createGrid(gridDimension);


// GRID CREATION
function createGrid(dimension) {
    currentGridBoxes = grid.querySelectorAll('div');
    currentGridBoxes.forEach( (div) => div.remove() );

    for (let i = 0; i < dimension; i++) {
        for (let i = 0; i < dimension; i++) {
            const newDiv = document.createElement('div');
            grid.append(newDiv);
            newDiv.classList.add('grid-box');
            newDiv.style.width = `${100/dimension}%`;
            newDiv.style.height = `${100/dimension}%`;
        }
    }
};


// DIMENSION INPUT
const validDimension = /^[\d]+$/;
const dimensionInput = document.getElementById('grid-dimension');
const setButton = document.getElementById('set-grid-button');
setButton.setAttribute('disabled', 'true');

dimensionInput.addEventListener("keyup", (e) => {
    let input = dimensionInput.value;
    if (!input) {
        dimensionInput.style.borderColor = "rgb(88, 88, 92)";
        setButton.setAttribute('disabled', 'true');
    } else if (input.match(validDimension)) {
        dimensionInput.style.borderColor = "rgb(0, 93, 23)";
        setButton.removeAttribute('disabled');
    } else {
        dimensionInput.style.borderColor = "rgb(126, 3, 3)";
        setButton.setAttribute('disabled', 'true');
    }
});


// OPTIONS MENU
const clearCurrentButton = document.getElementById('clear-button');
clearCurrentButton.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => { div.style.color = "lightgray" })
});


setButton.addEventListener('click', () => {
    gridDimension = dimensionInput.value;
    intDimension = parseInt(gridDimension);
    createGrid(intDimension);
});


