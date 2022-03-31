/*
PIXEL ART CREATOR
by Peyton Bechard

Started: 31 Mar 2022
Last Updated: 31 Mar 2022
*/


/*
TO-DO:
    - fix hover animation bug
    - fix click/drag bug (stops working after multiple pen/bg changes)
    - add save functionality
*/


/************************* FIELD DATA *************************/
// Toolbar Items
const penButton = document.getElementById('pen-color');
const penColorChooser = document.getElementById('pen-color-chooser');
const fillButton = document.getElementById('fill-color');
const fillColorChooser = document.getElementById('fill-color-chooser');
const eraserButton = document.getElementById('eraser');

// Grid
const grid = document.getElementById('grid');

// Options Menu Items
const clearCurrentButton = document.getElementById('clear-button');
const toggleGrid = document.getElementById('toggle-grid-button')
const validDimension = /^[\d]+$/;
const dimensionInput = document.getElementById('grid-dimension');
const setButton = document.getElementById('set-grid-button');
const resetAllButton = document.getElementById('reset-all-button');



/************************* INITIAL STATES *************************/
// Color States
let gridDimension = 16;
let penColor = "#000000";
let tempPenColor = "#000000"
let fillColor = "#999999";
let tempFillColor = "#999999"
let eraser = "transparent"

// Grid Set-Up
createGrid(gridDimension);



/************************* GRID GENERATOR *************************/
function createGrid(dimension) {
    currentGridBoxes = grid.querySelectorAll('div');
    currentGridBoxes.forEach( (div) => div.remove() );
    dimensionInput.value = '';
    dimensionInput.style.borderColor = "rgb(88, 88, 92)";
    setButton.setAttribute('disabled', 'true');

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



/************************* GRID EVENTS *************************/
let mouseDown = false;
let allGridBoxes = grid.querySelectorAll('div');
let tempColor = "";

// allGridBoxes.forEach( (div) => div.addEventListener ('mouseenter', (e) => {
//     console.log('enter box');
//     tempColor = e.target.style.backgroundColor;
//     e.target.style.backgroundColor = '#444444';
// }));

// allGridBoxes.forEach( (div) => div.addEventListener ('mouseleave', (e) => {
//     console.log('leave box');
//     e.target.style.backgroundColor = tempColor;
// }));

grid.addEventListener('mousedown', (e) => mouseDown = true);
grid.addEventListener('mouseup', () => mouseDown = false);
grid.addEventListener('click', (e) => e.target.style.backgroundColor = penColor);
allGridBoxes.forEach( (div) => {
    div.addEventListener('mouseenter', (e) => {
        if (mouseDown === true) {
            e.target.style.backgroundColor = penColor;
        }
    })
});





/************************* TOOLBAR EVENTS *************************/
penColorChooser.addEventListener('change', (e) => tempPenColor = e.target.value );
fillColorChooser.addEventListener('change', (e) => tempFillColor = e.target.value );

penButton.addEventListener('click', (e) => penColor = tempPenColor);
eraserButton.addEventListener('click', (e) =>  penColor = "transparent");
fillButton.addEventListener('click', (e) => {
    fillColor = tempFillColor;
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => div.style.backgroundColor = fillColor );
});



/************************* OPTIONS MENU EVENTS *************************/
toggleGrid.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => {
        if (div.style.borderColor === "black") {
            div.style.borderColor = "transparent";
        } else {
            div.style.borderColor = "black";
        }
    });
});

clearCurrentButton.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => { div.style.backgroundColor = "#ffffff" })
});

dimensionInput.addEventListener("keyup", (e) => {
    let input = dimensionInput.value;
    if (!input) {
        dimensionInput.style.borderColor = "rgb(88, 88, 92)";
        setButton.setAttribute('disabled', 'true');
    } else if (input.match(validDimension) && 1 < parseInt(input) && parseInt(input) < 101) {
        dimensionInput.style.borderColor = "rgb(0, 136, 34)";
        setButton.removeAttribute('disabled');
    } else {
        dimensionInput.style.borderColor = "rgb(168, 0, 0)";
        setButton.setAttribute('disabled', 'true');
    }
});

setButton.addEventListener('click', () => {
    gridDimension = dimensionInput.value;
    intDimension = parseInt(gridDimension);
    createGrid(intDimension);
});

resetAllButton.addEventListener('click', (e) => createGrid(16) );