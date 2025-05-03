// This will indicate that a cell is empty.
const EMPTY = 0;

let shapeColours = {
    0: "bg-gradient-to-br from-gray-900 to-gray-800",
    1: "bg-red-500",
    2: "bg-blue-300",
    3: "bg-indigo-400",
    4: "bg-orange-400",
    5: "bg-green-300"
};

const shapes = {
    I: [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    O: [
        [0, 2, 2, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    T: [
        [0, 3, 3, 3],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    L: [
        [0, 4, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    Z: [
        [0, 0, 5, 5],
        [0, 5, 5, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
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

            if (newX < 0 || newX > boardWidth - 1 || newY < 0 || newY > boardHeight - 1) {
                //console.log("111111")
                //console.log(`${newX} > ${boardWidth} AND ${newY} > ${boardHeight}`)

                return false;
            }

            // This cell is already occupied.
            if (board[newY][newX] != EMPTY) {
                //console.log(`${newY}${newX} --> ${board[newY][newX]}`)
                //console.log("2222222")

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
            //console.log(`It is ${newX} = ${offsetX} + ${x}  --  ${newY} --> ${newBoard[newY][newX]}`)
            newBoard[newY][newX] = shape[y][x];
        }
    }
    return newBoard;
}

const lastRowIsFilled = (board) => {
    const boardHeight = board.length;
    const boardWidth = board[0].length;

    // We don't need a double for-loop to verify due to the fact the last row will always exist.
    // So we can just check the last row and see if it is fully blocked. If it is we can clean that row.
    // We add points for clearing the row.
    console.log("==========");
    console.log(boardWidth)
    for (let i = 0; i < boardWidth; i++) {
        if (board[boardHeight - 1][i] == EMPTY) {
            // This implies that a cell is EMPTY i.e., no shape is in this cell's position. Thus we know
            // that the user cannot gain any points as the last row is not clear.
            return false;
        }
    }
    return true;
}

const clearLastRow = (oldBoard) => {
    const boardHeight = oldBoard.length;
    const boardWidth = oldBoard[0].length;
    // Otherwise we know last row is filled so we can clear it out.
    let newBoard = createEmptyBoard()

    for (let y = 0; y < boardHeight - 1; y++) {
        for (let x = 0; x < boardWidth; x++) {
            newBoard[y + 1][x] = oldBoard[y][x];
        }
    }

    return newBoard;
}

export { shapes, createEmptyBoard, createEmptyMatrix, rotateCW, canPlace, mergePiece, lastRowIsFilled, shapeColours, clearLastRow };