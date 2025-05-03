import { shapes } from "../models";
import Shape from "./Shape";

const StatusBox = ({ points, lines, shapeKey }) => {

    return (
        <>
            <div className="bg-slate-600 rounded-lg w-40 p-4 flex flex-col space-y-4 h-3/5">
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
        </>
    )
}

export default StatusBox;