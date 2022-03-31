// FIELD DATA
const grid = document.getElementById('grid');
let gridDimension = 16;

const clearCurrentButton = document.getElementById('clear-button');
const toggleGrid = document.getElementById('toggle-grid-button')
const validDimension = /^[\d]+$/;
const dimensionInput = document.getElementById('grid-dimension');
const setButton = document.getElementById('set-grid-button');
const resetAllButton = document.getElementById('reset-all-button');


// INITIAL STATES
createGrid(gridDimension);
setButton.setAttribute('disabled', 'true');


// GRID GENERATOR
function createGrid(dimension) {
    currentGridBoxes = grid.querySelectorAll('div');
    currentGridBoxes.forEach( (div) => div.remove() );
    dimensionInput.value = '';

    for (let i = 0; i < dimension; i++) {
        for (let i = 0; i < dimension; i++) {
            const newDiv = document.createElement('div');
            grid.append(newDiv);
            newDiv.classList.add('grid-box');
            newDiv.style.width = `${100/dimension}%`;
            newDiv.style.height = `${100/dimension}%`;
            newDiv.style.borderColor = "black";
        }
    }
};


// OPTIONS MENU EVENTS

toggleGrid.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => {
        console.log(div.style.borderColor);
        if (div.style.borderColor === "black") {
            div.style.borderColor = "transparent";
        } else {
            div.style.borderColor = "black";
        }
    });
});

clearCurrentButton.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => { div.style.color = "lightgray" })
});

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

setButton.addEventListener('click', () => {
    gridDimension = dimensionInput.value;
    intDimension = parseInt(gridDimension);
    createGrid(intDimension);
});

resetAllButton.addEventListener('click', (e) => createGrid(16) );