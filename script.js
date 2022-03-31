// FIELD DATA
const grid = document.getElementById('grid');
let gridDimension = 16;
createGrid(gridDimension);


// GRID CREATION
function createGrid(dimension) {
    for (let i = 0; i < gridDimension; i++) {
        for (let i = 0; i < gridDimension; i++) {
            const newDiv = document.createElement('div');
            grid.append(newDiv);
            newDiv.classList.add('grid-box');
            newDiv.style.width = `${100/gridDimension}%`;
            newDiv.style.height = `${100/gridDimension}%`;
        }
    }
}


// DIMENSION INPUT
const validDimension = /^[\d]+$/;
const dimensionInput = document.getElementById('grid-dimension');
dimensionInput.addEventListener("keyup", (e) => {
    let input = dimensionInput.value;
    if (!input) {
        dimensionInput.style.borderColor = "rgb(88, 88, 92)";
    } else if (input.match(validDimension)) {
        console.log('match');
        dimensionInput.style.borderColor = "rgb(0, 93, 23)";
    } else {
        console.log('no match');
        dimensionInput.style.borderColor = "rgb(126, 3, 3)";
    }
})