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

// The reason for the offset is because we need to be able to MOVE it not just place a piece.
const canPlace = (board, shape, offsetX, offsetY) => {
    // We need to loop through the shape itself and see if there is a free EMPTY
    // cell in the board grid where we can place the shape cell in.
    const boardWidth = board[0].length;
    const boardHeight = board.length;

    // Here 'y' represents rows and 'x' represents columns.
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[0].length; x++) {
            let newX = offsetX + x; // New 'column' coordinate. 
            let newY = offsetY + y; // New 'row' coordinate.
            
            if (shape[y][x] == EMPTY) {
                continue;
            }
            
            // Boundary checks.
            if (newX < 0 || newX > boardWidth || newY < 0 || newY > boardHeight) {
                console.log("1")
                return false;
            }

            // This cell is already occupied.
            if (board[newY][newX] != EMPTY) {
                console.log(`${newY}${newX} --> ${board[newY][newX]}`)
                console.log("2")

                return false;
            }

            /*if (board[newY][newX] == EMPTY && shape[y][x] != EMPTY) {
                // Board cell is empty meaning we can place VALID shape piece here.
                // By valid I mean that the shape's matrix cell is not empty.
                board[newY][newX] = shape[y][x];
            }*/
        }
    }
    return true;
}

const mergePiece = (board, shape, offsetX, offsetY) => {
    // We need to make a deep copy of our board. Remember that React can only essentially see deep changes.
    let newBoard = board.map(row => [...row]);
    const boardWidth = board[0].length;
    const boardHeight = board.length;

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[0].length; x++) {
            if (shape[y][x] === EMPTY) {
                continue;
            }
            let newX = offsetX + x;
            let newY = offsetY + y;
            console.log(`It is ${newX} = ${offsetX} + ${x}  --  ${newY} --> ${newBoard[newY][newX]}`)
            newBoard[newY][newX] = shape[y][x];
        }
    }
    return newBoard;
}

export { shapes, createEmptyBoard, createEmptyMatrix, rotateCW, canPlace, mergePiece };