import GameOverModal from './GameOverModal';
import {  mergePiece, shapeColours } from '../models';

const TetrisGrid = ({ posOfShape, shapeMatrix, points, resetGame, board, gameOver, setGameOver, highScore }) => {
    // We can build a new copy of the board in order to display it.
    const displayBoard = mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y);

    return (
        <>
            {gameOver && <GameOverModal score={points} highScore={highScore} resetGame={resetGame} onClose={() => setGameOver(false)} />}
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