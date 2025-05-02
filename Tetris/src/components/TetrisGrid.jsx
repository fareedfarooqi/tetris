import { useEffect, useState } from 'react';
import { shapes, createEmptyBoard, rotateCW } from '../models';

const TetrisGrid = () => {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(createEmptyBoard());
    }, [])

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-10 bg-gray-500 w-max shadow-2xl">
                    {board.flat().map((cell, index) => (
                        <div key={index} className={`w-8 h-8 border border-gray-600 ${cell == 0 ? `bg-gray-300` : `bg-red-500`}`}>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
    
}

export default TetrisGrid;