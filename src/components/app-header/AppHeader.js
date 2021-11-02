import logo from '../../logo.svg';
import './AppHeader.scss';
import {FunctionalSwitchableMode} from "../functional-mode/FunctionalMode"; // eslint-disable-line import/no-webpack-loader-syntax

export const AppHeader = ({setMode, items}) => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                React Application with&nbsp;
                <a style={{textDecoration: 'none'}} target="_blank"
                   href="https://docs.mapbox.com/mapbox-gl-js/api/map/#map#resetnorthpitch">Mapbox GL JS</a>
            </p>
            <FunctionalSwitchableMode name={'Mode'} callback={setMode} items={items}/>
        </header>
    );
}