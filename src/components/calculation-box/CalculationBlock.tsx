import React from 'react';
import './CalculationBlock.scss';

type PropsType = {
    id: string
}

type Types = {
    polygon: string,
    line: string
}

const types: Types = {
    polygon: "Polygon: ",
    line: "Line: "
}

export const CalculationBlock= ({id}: PropsType): JSX.Element => {
    return (
        <div className="calculation-box">
            {/* @ts-ignore */}
            <div className="property-type">{types[id]}</div>
            <div id={`calculated-area-${id}`} className="calculated-area"> </div>
        </div>
    );
}

export const CalculationBasicBlock = (): JSX.Element => {
    return (
        <div className="calculation-box">
            <div className="property-type">All zones:</div>
            <div id="calculated-area" className="calculated-area"> </div>
        </div>
    );
}