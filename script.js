// GRID CREATION
const grid = document.getElementById('grid');
let gridDimension = 16;
createGrid(gridDimension);

function createGrid(dimension) {
    let sideLength = `${100/dimension}%`;
    for (let i = 0; i < gridDimension; i++) {
        for (let i = 0; i < gridDimension; i++) {
            const newDiv = document.createElement('div');
            grid.append(newDiv);
            newDiv.classList.add('grid-box');
        }
    }
}
