import logo from '../../assets/icons/logo.svg';
import './AppHeader.scss';
import React from 'react'
import {FunctionalSwitchableMode} from "../functional-mode/FunctionalMode"; // eslint-disable-line import/no-webpack-loader-syntax

type appHeaderPropsType = {
    setMode: (arg: string) => void,
    items: Array<any>
}

export const AppHeader: React.FC<appHeaderPropsType> = ({setMode, items}) => {
    const linkStyleObj: React.CSSProperties = {textDecoration: 'none'};
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                React Application with&nbsp;
                <a style={linkStyleObj} target="_blank"
                   href="https://docs.mapbox.com/mapbox-gl-js/api/map/#map#resetnorthpitch">Mapbox GL JS</a>
            </p>
            <FunctionalSwitchableMode name={'Mode'} callback={setMode} items={items}/>
        </header>
    );
}