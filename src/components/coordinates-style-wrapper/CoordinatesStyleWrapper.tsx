import React from 'react';

type coordinatesStyleWrapperPropsType = {
    title: string,
    children?: JSX.Element[] | JSX.Element,
}

export const CoordinatesStyleWrapper = ({title, children}: coordinatesStyleWrapperPropsType): JSX.Element => {
    return (
        <div className="coordinates">
            <span className="title">{title}</span>
            {children}
        </div>
    )
}