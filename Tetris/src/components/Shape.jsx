import { shapes } from "../models";

let shapeColours = {
    0: "bg-gradient-to-br from-gray-900 to-gray-800",
    1: "bg-red-500",
    2: "bg-blue-300",
    3: "bg-indigo-400",
    4: "bg-orange-400",
    5: "bg-green-300"
};


const Shape = ({ shapeKey }) => {
    let shapesMatrix = shapes[shapeKey];
    
    return (
        <>
            <div className="grid grid-cols-4">
                {shapesMatrix.flat().map((cell, index) => {
                    const colourClass = shapeColours[cell];

                    return (
                        <div key={index} className={`w-8 h-8 border border-gray-700 ${colourClass}`}></div>
                    );
                })}
            </div>
        </>
    )
}

export default Shape;