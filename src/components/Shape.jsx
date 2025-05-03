import { shapes, shapeColours } from "../models";

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