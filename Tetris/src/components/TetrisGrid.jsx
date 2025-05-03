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

const TetrisGrid = ({ shapeKey, posOfShape, setPosOfShape }) => {
    const [board, setBoard] = useState(() => createEmptyBoard());
    let shapesMatrix = shapes[shapeKey]

    const tryMove = (dx, dy) => {
        let newX = posOfShape.x + dx;
        let newY = posOfShape.y + dy;

        if (canPlace(board, shapesMatrix, newX, newY)) {
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
                console.log(tryMove(-1, 0))
            } else if (e.key === "ArrowRight") {
                tryMove(1, 0);
            } else if (e.key === "ArrowDown") {
                if (!tryMove(0, 1)) {
                    // So it failed to go down further. We must lock it onto the board.
                    setBoard(mergePiece(board, shapesMatrix, posOfShape.x, posOfShape.y));
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [posOfShape]);

    // We can build a new copy of the board in order to display it.
    const displayBoard = mergePiece(board, shapesMatrix, posOfShape.x, posOfShape.y);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-10 w-max shadow-2xl">
                    {displayBoard.flat().map((cell, index) => (
                        <div key={index} className={`w-8 h-8 border border-gray-700 ${cell == 0 ? `bg-transparent` : `bg-red-500`}`}></div>
                    ))}
                </div>
            </div>
        </>
    )
    
}

export default TetrisGrid;