import './CalculationBlock.scss';

const types = {
    polygon: "Polygon: ",
    line: "Line: "
}

export const CalculationBlock = ({id}) => {

    return (
        <div className="calculation-box">
            <div className="property-type">{types[id]}</div>
            <div id={`calculated-area-${id}`} className="calculated-area"> </div>
        </div>
    );
}

export const CalculationBasicBlock = () => {

    return (
        <div className="calculation-box">
            <div className="property-type">All zones:</div>
            <div id="calculated-area" className="calculated-area"> </div>
        </div>
    );
}