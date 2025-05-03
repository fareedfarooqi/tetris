import { IoMdClose } from 'react-icons/io';

const GameOverModal = ({ score, highScore, resetGame, onClose }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative bg-black/80 border border-white/10 backdrop-blur-xl rounded-xl shadow-2xl w-[90%] max-w-md p-8 text-center animate-fade-in space-y-6 text-white">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400 transition duration-100 cursor-pointer">
                        <IoMdClose size={20} />
                    </button>

                    <div className="text-2xl font-bold">
                        Game Over
                    </div>

                    <p className="text-sm italic text-gray-300">Great effort! Every block counts - can you beat your high score?</p>

                    <div className="space-y-2 font-semibold">
                        <p>Your Score: <span className="text-yellow-300">{score}</span></p>
                        <p>High Score: <span className="text-green-400">{highScore}</span></p>
                    </div>

                    <div className="flex justify-center gap-4 pt-2">
                        <button onClick={resetGame} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition duration-100 cursor-pointer">
                            Play Again
                        </button>
                        <button onClick={onClose} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition duration-100 hover:scale-105 cursor-pointer">
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default GameOverModal;