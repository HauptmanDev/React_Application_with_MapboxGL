import React from 'react';

type coordinatesStyleWrapperPropsType = {
    title: string
}

export const CoordinatesStyleWrapper: React.FC<coordinatesStyleWrapperPropsType> = ({title, children}) => {
    return (
        <div className="coordinates">
            <span className="title">{title}</span>
            {children}
        </div>
    )
}