import { useEffect, useState } from 'react';
import { shapes, createEmptyBoard, rotateCW, canPlace, mergePiece, lastRowIsFilled, shapeColours, clearLastRow } from '../models';

const TetrisGrid = ({ shapeKey, posOfShape, setPosOfShape, spawnNewShape, setShape, shapeMatrix, setShapeMatrix, nextShape }) => {
    const [board, setBoard] = useState(() => createEmptyBoard());
    
    useEffect(() => {
        if (lastRowIsFilled(board)) {
            // Now we know that the row is filled so we can clear the last row.
            setBoard(clearLastRow(board));
        }
    }, [board]);
    
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
                    setShapeMatrix(rotatedShape);
                }
                
            } else if (e.key === "ArrowDown") {
                if (!tryMove(0, 1)) {
                    // So it failed to go down further. We must lock it onto the board.
                    setBoard(mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y));
                    console.log(board);
                    // We must now spawn a new shape. We must also reset the position.
                    setPosOfShape({ x: 3, y: 0 });
                    spawnNewShape();
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