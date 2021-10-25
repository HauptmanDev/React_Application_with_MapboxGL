import './CoordinatesBlock.scss';

export const CoordinatesBlock = ({type, title, id, className, callback, buttonName, children}) => {

    const inputBlock = () => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                <input id={id} maxLength='5' step='0.5' type={'number'} className={`mapboxgl-${className}`}
                       onChange={callback}/>
            </div>
        )
    };

    const buttonBlock = () => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                <button id={id} className={`mapboxgl-coordinates-block-button`} onClick={callback}>{buttonName}</button>
            </div>
        )
    };

    const emptyBlock = () => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                {children}
            </div>
        )
    };

    const contentFunction = () => {
        if (!id && !type) {
            return emptyBlock();
        } else {
            return type && type === 'button' ? buttonBlock() : inputBlock();
        }
    }

    const content = contentFunction();

    return content;
}