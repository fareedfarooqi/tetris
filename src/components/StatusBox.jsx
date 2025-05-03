import { IoMdRefresh } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { rotateCW, canPlace } from "../models";
import Shape from "./Shape";

const StatusBox = ({ points, lines, shapeKey, resetGame, tryMove, shapeMatrix, setShapeMatrix, board, setBoard, posOfShape, setPosOfShape, spawnNewShape }) => {

    const arrowDownAction = () => {
        if (!tryMove(0, 1)) {
            // So it failed to go down further. We must lock it onto the board.
            setBoard(mergePiece(board, shapeMatrix, posOfShape.x, posOfShape.y));
            // We must now spawn a new shape. We must also reset the position.
            setPosOfShape({ x: 3, y: 0 });
            spawnNewShape();
        }
    }

    const rotateAction = () => {
        let rotatedShape = rotateCW(shapeMatrix);

        if (canPlace(board, rotatedShape, posOfShape.x, posOfShape.y)) {
            setShapeMatrix(rotatedShape);
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-center space-x-2 sm:mb-5 order-1 sm:order-3 mt-5">
                    <button onClick={() => rotateAction()} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md shadow-md transition duration-100 cursor-pointer hover:scale-110">
                        <IoMdRefresh />
                    </button>

                    <button onClick={() => tryMove(-1, 0)} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md shadow-md transition duration-100 cursor-pointer hover:scale-110">
                        <IoIosArrowBack />
                    </button>

                    <button onClick={() => arrowDownAction()} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md shadow-md transition duration-100 cursor-pointer hover:scale-110">
                        <IoIosArrowDown />
                    </button>

                    <button onClick={() => tryMove(1, 0)} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md shadow-md transition duration-100 cursor-pointer hover:scale-110">
                        <IoIosArrowForward />
                    </button>

                </div>

                <div className="bg-slate-600 rounded-lg w-40 p-4 flex flex-col space-y-4 h-3/5 order-2">
                    <div className="text-center text-lg font-semibold text-cyan-300 uppercase tracking-wide">Game Stats</div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-md text-slate-300">Points</span>
                            <span className="text-md font-bold text-white">{points}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-md text-slate-300">Lines</span>
                            <span className="text-md font-bold text-white">{lines}</span>
                        </div>
                    </div>

                    <div className="border-t border-slate-600"></div>
                    
                    <div className="flex flex-col items-center space-y-1">
                        <span className="text-md text-slate-300">Next Shape</span>
                        {shapeKey && <Shape shapeKey={shapeKey} />}
                    </div>
                </div>

                <button onClick={resetGame} className="mt-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition duration-100 cursor-pointer order-3">
                    Play Again
                </button>
            </div>
        </>
    )
}

export default StatusBox;