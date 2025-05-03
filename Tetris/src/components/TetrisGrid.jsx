import { useEffect, useState } from 'react';
import { shapes, createEmptyBoard, rotateCW, canPlace, mergePiece, lastRowIsFilled, shapeColours, clearLastRow } from '../models';

const TetrisGrid = ({ posOfShape, setPosOfShape, spawnNewShape, shapeMatrix, setShapeMatrix, setPoints, setLines }) => {
    const [board, setBoard] = useState(() => createEmptyBoard());
    
    // This effect hook is allowing me to do gravity simulations every 500ms.
    // I'm thinking to make the game more dynamic we dynamically adjust the
    // timeout as the user progresses to more points the timer shortens.
    useEffect(() => {
        const timerId = setTimeout(() => {
            // We are trying to move downward. Note we move down an entire block.
            if (tryMove(0, 1)) {
                return;
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [board, posOfShape])

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (!tryMove(0, 1)) {
                // So it failed to go down further. We must lock it onto the board.
                setBoard(mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y));
                console.log(board);
                // We must now spawn a new shape. We must also reset the position.
                setPosOfShape({ x: 3, y: 0 });
                spawnNewShape();
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [board, posOfShape])

    useEffect(() => {
        if (lastRowIsFilled(board)) {
            // Now we know that the row is filled so we can clear the last row.
            setBoard(clearLastRow(board));
            // We can now add 100 pts.
            setPoints(prev => prev + 100);
            setLines(prev => prev + 1);
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