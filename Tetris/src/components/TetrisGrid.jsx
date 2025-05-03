import { useEffect, useState } from 'react';
import { shapes, createEmptyBoard, rotateCW, canPlace, mergePiece } from '../models';

let shapeColours = {
    0: "bg-gradient-to-br from-gray-900 to-gray-800",
    1: "bg-red-500",
    2: "bg-blue-300",
    3: "bg-indigo-400",
    4: "bg-orange-400",
    5: "bg-green-300"
};

const TetrisGrid = ({ shapeKey, posOfShape, setPosOfShape, setShape, shapeMatrix, setShapeMatrix, nextShape }) => {
    const [board, setBoard] = useState(() => createEmptyBoard());

    const tryMove = (dx, dy) => {
        let newX = posOfShape.x + dx;
        let newY = posOfShape.y + dy;

        if (canPlace(board, shapeMatrix, newX, newY)) {
            // Meaning we can indeed move it here to this new position.
            setPosOfShape(prev => ({ x: newX, y: newY }));
            return true;
        }
        return false;
    }

    // When button to start game has been pressed.

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                tryMove(-1, 0);
            } else if (e.key === "ArrowRight") {
                tryMove(1, 0);
            } else if (e.key === "ArrowUp") {
                let rotatedShape = rotateCW(shapeMatrix);

                if (canPlace(board, rotatedShape, posOfShape.x, posOfShape.y)) {
                    console.log("___)))")
                    setShapeMatrix(rotatedShape);
                }
            } else if (e.key === "ArrowDown") {
                console.log("Girgan")
                if (!tryMove(0, 1)) {
                    // So it failed to go down further. We must lock it onto the board.
                    const shapeKeys = Object.keys(shapes);
                    setBoard(mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y));
                    
                    // We must now spawn a new shape. We must also reset the position.
                    console.log("BOOOOOM")
                    setPosOfShape({ x: 3, y: 0 });
                    console.log(nextShape)
                    setShape(nextShape);
                    
                    setShapeMatrix(shapes[nextShape]);
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [posOfShape, shapeMatrix]);

    // We can build a new copy of the board in order to display it.
    const displayBoard = mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-10 w-max shadow-2xl">
                    {displayBoard.flat().map((cell, index) => (
                        <div key={index} className={`w-8 h-8 border border-gray-700 ${cell == 0 ? `bg-transparent` : `${shapeColours[cell]}`}`}></div>
                    ))}
                </div>
            </div>
        </>
    )
    
}

export default TetrisGrid;