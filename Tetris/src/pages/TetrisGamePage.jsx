import { useEffect, useState } from "react";
import TetrisGrid from "../components/TetrisGrid";
import StatusBox from "../components/StatusBox";
import { shapes, createEmptyBoard, rotateCW } from '../models';

const TetrisGamePage = () => {
    const [points, setPoints] = useState(0);
    const [lines, setLines] = useState(0);
    const [shape, setShape] = useState(null);

    // Upon mounting I wanna set the shape the game begins with.
    // We will then subsequently update the shape after it is 'used' elsewhere in the code.
    useEffect(() => {
        const shapeKeys = Object.keys(shapes);
        // We need a randomiser to randomly select a shape. Note that Math.random() gives a random value
        // between 0 and 1. We then multiply that value by the length of the dictionary of our shapes and floor it.
        const shapeIndex = Math.floor(Math.random() * Object.keys(shapes).length);
        const randomShapeKey = shapeKeys[shapeIndex];

        setShape(randomShapeKey);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="min-h-screen flex justify-center items-center flex-col space-y-[3rem]">
                    <div className="flex justify-center text-5xl uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">Welcome to Tetris</div>

                    <div className="flex gap-5">
                        <TetrisGrid />
                        <StatusBox points={points} lines={lines} shape={shape} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TetrisGamePage;