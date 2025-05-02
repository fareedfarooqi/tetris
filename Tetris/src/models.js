// This will indicate that a cell is empty.
const EMPTY = 0;

const shapes = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    O: [
        [0, 0, 0, 0],
        [0, 2, 2, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0]
    ],
    T: [
        [0, 0, 0, 0],
        [0, 3, 3, 3],
        [0, 0, 3, 0],
        [0, 0, 0, 0]
    ],
    L: [
        [0, 0, 0, 0],
        [0, 4, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0]
    ],
    Z: [
        [0, 0, 0, 0],
        [0, 0, 5, 5],
        [0, 5, 5, 0],
        [0, 0, 0, 0]
    ],
};

const createEmptyBoard = () => {
    let result = [];

    for (let y = 0; y < 20; y++) {
        let row = []
        for (let x = 0; x < 10; x++) {
            row.push(0);
        }
        result.push(row);
    }
    return result;
}

const createEmptyMatrix = (N) => {
    let result = [];

    // First loop is for rows.
    for (let i = 0; i < N; i++) {
        // This loop below is for columns.
        let row = [];
        for (let j = 0; j < N; j++) {
            row.push(0);
        }
        result.push(row);
    }
    return result;
};

const rotateCW = (shape) => {
    const N = shape.length; // This will always be 4.

    let newShapeMatrix = createEmptyMatrix(N);
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            // y is for the row and x is for the col.
            let newY = x;
            let newX = (N - 1) - y;
            newShapeMatrix[newY][newX] = shape[y][x];
        }
    }

    return newShapeMatrix;
}

export { shapes, createEmptyBoard, createEmptyMatrix, rotateCW };