import React from 'react';
import './CoordinatesBlock.scss';

type coordinatesBlockPropsType = {
    type?: string,
    title?: string,
    id?: string,
    className?: string,
    callback?: (e: any) => void,
    buttonName?: string,
    children?: JSX.Element
}

export const CoordinatesBlock = ({type = '', title, id = '', className = '', callback, buttonName='', children}: coordinatesBlockPropsType) => {

    const inputBlock = (): JSX.Element => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                {/* @ts-ignore*/}
                <input id={id} maxLength={'5'} step='0.5' type={'number'} className={`mapboxgl-${className}`}
                       onChange={callback}/>
            </div>
        )
    };

    const buttonBlock = (): JSX.Element => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                <button id={id} className={`mapboxgl-coordinates-block-button`} onClick={callback}>{buttonName}</button>
            </div>
        )
    };

    const emptyBlock = (): JSX.Element => {
        return (
            <div className="coordinates-block">
                <span>{title}</span>
                {children && children}
            </div>
        )
    };

    const contentFunction = (): JSX.Element => {
        if (!id && !type) {
            return emptyBlock();
        } else {
            return type && type === 'button' ? buttonBlock() : inputBlock();
        }
    }

    const content = contentFunction();

    return content;
}