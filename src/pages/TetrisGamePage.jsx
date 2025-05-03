import { useEffect, useState } from "react";
import TetrisGrid from "../components/TetrisGrid";
import StatusBox from "../components/StatusBox";
import { shapes, createEmptyBoard, rotateCW, canPlace, mergePiece, lastRowIsFilled, clearLastRow, towerFilled } from '../models';

const TetrisGamePage = () => {
    const [board, setBoard] = useState(createEmptyBoard());
    const [points, setPoints] = useState(0);
    const [lines, setLines] = useState(0);
    const [shape, setShape] = useState(null);
    const [shapeMatrix, setShapeMatrix] = useState(null);
    const [posOfShape, setPosOfShape] = useState({ x: 3, y: 0 }); // Basically allows our shape to be in the middle of top row.
    const [nextShape, setNextShape] = useState(null);
    const [highScore, setHighScore] = useState(Number(localStorage.getItem("highScore")) || 0);
    const [gameOver, setGameOver] = useState(false);
    // This effect hook is checking to see if the game should be over.

    const resetGame = () => {
        setBoard(createEmptyBoard());
        setPosOfShape({ x: 3, y: 0 });
        setPoints(0);
        setLines(0);
        setGameOver(false);
    }

    const spawnNewShape = () => {
        setShape(nextShape);
        setShapeMatrix(shapes[nextShape]);
        
        const shapeKeys = Object.keys(shapes);
        // We need a randomiser to randomly select a shape. Note that Math.random() gives a random value
        // between 0 and 1. We then multiply that value by the length of the dictionary of our shapes and floor it.
        const shapeIndexNext = Math.floor(Math.random() * Object.keys(shapes).length);
        const randomShapeKeyNext = shapeKeys[shapeIndexNext];
        setNextShape(randomShapeKeyNext);
    };
    
    // Upon mounting I wanna set the shape the game begins with.
    // We will then subsequently update the shape after it is 'used' elsewhere in the code.
    useEffect(() => {
        const shapeKeys = Object.keys(shapes);
        // We need a randomiser to randomly select a shape. Note that Math.random() gives a random value
        // between 0 and 1. We then multiply that value by the length of the dictionary of our shapes and floor it.
        const shapeIndexCur = Math.floor(Math.random() * Object.keys(shapes).length);
        const randomShapeKeyCur = shapeKeys[shapeIndexCur];
        setShapeMatrix(shapes[randomShapeKeyCur]);
        setShape(randomShapeKeyCur);

        const nextShapeIndex = Math.floor(Math.random() * Object.keys(shapes).length);
        const nextRandomShapeKey = shapeKeys[nextShapeIndex];
        setNextShape(nextRandomShapeKey);
    }, []);
    
    useEffect(() => {
        if (!shapeMatrix || gameOver) {
            return;
        }
        
        if (towerFilled(board)) {
            if (points > highScore) {
                localStorage.setItem("highScore", points);
                setHighScore(points);
            }
            setGameOver(true);
        }
    }, [board])

    // This effect hook is allowing me to do gravity simulations every 500ms.
    // I'm thinking to make the game more dynamic we dynamically adjust the
    // timeout as the user progresses to more points the timer shortens.
    useEffect(() => {
        if (!shapeMatrix || gameOver) {
            return;
        }

        const timerId = setTimeout(() => {
            // We are trying to move downward. Note we move down an entire block.
            if (tryMove(0, 1)) {
                return;
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [board, posOfShape])

    useEffect(() => {
        if (!shapeMatrix || gameOver) {
            return;
        }

        const timerId = setTimeout(() => {
            if (!tryMove(0, 1)) {
                // So it failed to go down further. We must lock it onto the board.
                setBoard(mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y));
                // We must now spawn a new shape. We must also reset the position.
                setPosOfShape({ x: 3, y: 0 });
                spawnNewShape();
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [board, posOfShape])

    useEffect(() => {
        if (!shapeMatrix || gameOver) {
            return;
        }

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
        if (!shapeMatrix || gameOver) {
            return;
        }

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
                    // We must now spawn a new shape. We must also reset the position.
                    setPosOfShape({ x: 3, y: 0 });
                    spawnNewShape();
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [posOfShape, shapeMatrix]);


    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="min-h-screen flex justify-center items-center flex-col space-y-[3rem]">
                    <div className="flex justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">Welcome to Tetris</div>
                    
                    <p className="max-w-md text-center text-lg italic text-gray-300 px-4 flex flex-wrap justify-center items-center gap-2">
                        Ready to drop your first piece? Use&nbsp;
                        <span className="inline-flex items-center bg-gray-700 text-xs font-mono px-2 py-1 rounded">←</span>
                        <span className="inline-flex items-center bg-gray-700 text-xs font-mono px-2 py-1 rounded">→</span>
                        to move,&nbsp;
                        <span className="inline-flex items-center bg-gray-700 text-xs font-mono px-2 py-1 rounded">↓</span>
                        to drop, and&nbsp;
                        <span className="inline-flex items-center bg-gray-700 text-xs font-mono px-2 py-1 rounded">↑</span>
                        to rotate. Or tap the controls below—let’s play!
                    </p>

                    <div className="flex gap-5">
                        {shape && <TetrisGrid posOfShape={posOfShape} shapeMatrix={shapeMatrix} points={points} resetGame={resetGame} board={board} gameOver={gameOver} setGameOver={setGameOver} highScore={highScore} />}
                        {shape && <StatusBox points={points} lines={lines} shapeKey={nextShape} resetGame={resetGame} tryMove={tryMove} shapeMatrix={shapeMatrix} setShapeMatrix={setShapeMatrix} board={board} setBoard={setBoard} posOfShape={posOfShape} setPosOfShape={setPosOfShape} spawnNewShape={spawnNewShape} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TetrisGamePage;