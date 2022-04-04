/*
PIXEL ART CREATOR
by Peyton Bechard

Started: 31 Mar 2022
Last Updated: 4 Apr 2022
*/


/*
TO-DO:
    - add undo button
    - add save functionality
*/


/************************* FIELD DATA *************************/
// Toolbar Items
const penButton = document.getElementById('pen-color');
const penColorChooser = document.getElementById('pen-color-chooser');
const fillButton = document.getElementById('fill-color');
const fillColorChooser = document.getElementById('fill-color-chooser');
const eraserButton = document.getElementById('eraser');
eraserButton.style.backgroundColor = 'rgb(215, 218, 221)';


// Grid
const grid = document.getElementById('grid');
const allGridBoxes = grid.querySelectorAll('div');

// Options Menu Items
const clearCurrentButton = document.getElementById('clear-button');
const toggleGrid = document.getElementById('toggle-grid-button')
const validDimension = /^[\d]+$/;
const gridLabel = document.getElementById('current-grid');
const dimensionInput = document.getElementById('grid-dimension');
const setButton = document.getElementById('set-grid-button');
const resetAllButton = document.getElementById('reset-all-button');
const saveButton = document.getElementById('save-button');




/************************* INITIAL STATES *************************/
// Color States
let gridDimension = 16;
let penColor = '#000000';
let tempPenColor = '#000000';
let fillColor = '#ffffff';
let tempFillColor = '#ffffff';
let eraser = 'transparent';

// Grid Set-Up
let gridOn = true;
toggleGrid.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
let mouseDown = false;
let currentGridDimension = 16;
let tempGridDimension = 16;
let rightClicked = false;

// Init Functions
createGrid(gridDimension);


/************************* GRID GENERATOR *************************/
function createGrid(dimension) {
    currentGridBoxes = grid.querySelectorAll('div');
    currentGridBoxes.forEach( (div) => div.remove() );
    dimensionInput.value = '';
    dimensionInput.style.borderColor = 'rgb(88, 88, 92)';
    setButton.setAttribute('disabled', 'true');

    for (let i = 0; i < dimension; i++) {
        for (let i = 0; i < dimension; i++) {
            const newDiv = document.createElement('div');
            grid.append(newDiv);
            newDiv.classList.add('grid-box');
            newDiv.style.width = `${100/dimension}%`;
            newDiv.style.height = `${100/dimension}%`;
            newDiv.style.borderColor = 'black';
            newDiv.style.backgroundColor = 'white';
            newDiv.setAttribute('oncontextmenu', 'return rightClick(this);')

            let tempColor = newDiv.style.backgroundColor;
            
            newDiv.addEventListener('mousedown', () => mouseDown = true);
            newDiv.addEventListener('mouseup', () => mouseDown = false);

            newDiv.addEventListener('click', (e) => {
                newDiv.style.backgroundColor = penColor;
                tempColor = newDiv.style.backgroundColor;
            });
            
            newDiv.addEventListener('mouseenter', (e) => {
                tempColor = newDiv.style.backgroundColor;
                if (mouseDown === false) {
                    tempColor = newDiv.style.backgroundColor;
                    newDiv.style.backgroundColor = 'rgba(104, 104, 104, 0.493)';
                } else {
                    newDiv.style.backgroundColor = penColor;
                    tempColor = newDiv.style.backgroundColor;
                }

            });
            newDiv.addEventListener('mouseleave', (e) => {
                if (rightClicked !== true) {
                    if (mouseDown === false) {
                        newDiv.style.backgroundColor = tempColor;
                    } else {
                        newDiv.style.backgroundColor = penColor;
                    }
                }
                rightClicked = false;
            });
        }
    }
    gridOn = true;
    toggleGrid.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
};

function rightClick(div) {
    div.style.backgroundColor = fillColor;
    rightClicked = true;    
    return false;
}


/************************* TOOLBAR EVENTS *************************/
penColorChooser.addEventListener('change', (e) => {
    tempPenColor = e.target.value;
    penButton.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
});

fillColorChooser.addEventListener('change', (e) => {
    tempFillColor = e.target.value;
    fillButton.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
});

penButton.addEventListener('click', () => changePenColor(tempPenColor));

function changePenColor(color) {
    if (eraserButton.style.backgroundColor == 'rgba(221, 221, 125, 0.8)') {
        eraserButton.style.backgroundColor = 'rgb(215, 218, 221)';
    }
    if (penButton.style.backgroundColor == 'rgba(221, 221, 125, 0.8)') {
        penButton.style.backgroundColor = 'rgb(215, 218, 221)';
    }
    penColor = color;
};

eraserButton.addEventListener('click', (e) =>  {
    if (eraserButton.style.backgroundColor == 'rgba(221, 221, 125, 0.8)') {
        eraserButton.style.backgroundColor = 'rgb(215, 218, 221)';
        penColor = tempPenColor;
        if (eraserButton.style.backgroundColor == 'rgba(221, 221, 125, 0.8)') {
            eraserButton.style.backgroundColor = 'rgb(215, 218, 221)';
        }
    } else {
        eraserButton.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
        penColor = 'rgb(198, 204, 211)';
    };
});

fillButton.addEventListener('click', (e) => {
    fillColor = tempFillColor;
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => {
        div.style.backgroundColor = fillColor;
    });
    fillButton.style.backgroundColor = 'rgb(215, 218, 221)';
});



/************************* OPTIONS MENU EVENTS *************************/
toggleGrid.addEventListener('click', (e) => {
    if (gridOn) {
        gridOn = false;
        toggleGrid.style.backgroundColor = 'rgb(215, 218, 221)';
    } else {
        gridOn = true;
        toggleGrid.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
    }
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => {
        if (div.style.borderColor === 'black') {
            div.style.borderColor = 'transparent';
        } else {
            div.style.borderColor = 'black';
        }
    });
});

clearCurrentButton.addEventListener('click', (e) => {
    let allGridBoxes = grid.querySelectorAll('div');
    allGridBoxes.forEach( (div) => div.style.backgroundColor = '#ffffff' )
});

dimensionInput.addEventListener('keyup', (e) => {
    let input = dimensionInput.value;
    if (!input) {
        dimensionInput.style.borderColor = 'rgb(88, 88, 92)';
        setButton.setAttribute('disabled', 'true');
        gridLabel.textContent = `${currentGridDimension}x${currentGridDimension}`;
    } else if (input.match(validDimension) && 1 <= parseInt(input) && parseInt(input) <= 48) {
        dimensionInput.style.borderColor = 'rgb(0, 136, 34)';
        setButton.removeAttribute('disabled');
        gridLabel.textContent = `${input}x${input}`;
        tempGridDimension = input;
    } else {
        dimensionInput.style.borderColor = 'rgb(168, 0, 0)';
        setButton.setAttribute('disabled', 'true');
        gridLabel.textContent = `${currentGridDimension}x${currentGridDimension}`;
    }
});

setButton.addEventListener('click', () => {
    gridDimension = dimensionInput.value;
    intDimension = parseInt(gridDimension);
    createGrid(intDimension);
    currentGridDimension = tempGridDimension;
});

resetAllButton.addEventListener('click', (e) => {
    createGrid(16);
    gridOn = true;
    toggleGrid.style.backgroundColor = 'rgba(221, 221, 125, 0.8)';
    gridLabel.textContent = '16x16';
    currentGridDimension = 16;
    tempGridDimension = 16;
});

saveButton.addEventListener('click', () => alert("Feature currently unavailable. Please check again soon!") );