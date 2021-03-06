import './App.scss';
import React from 'react';
import {useEffect, useState} from "react";
import {AppHeader} from "./components/app-header/AppHeader";
import {AppLoading} from "./components/app-loading/AppLoading";

import {AppExamples} from "./components/app-main/AppExamples";
import {AppTsMain} from "./components/app-main/AppTsMain";
import {AppTsDirMain} from "./components/app-main/AppTsDirMain";
import {AppTsObjectMain} from "./components/app-main/AppTsObjectMain";

import {useDispatch, useSelector} from "react-redux";
import {showMapTC} from "./bll/reducer";

export type modeType = {
    name: string,
    value: string,
    id: string
};

const modeTypes: Array<modeType> = [
    {name: "Geocoder", value: "Geo", id: '1'},
    {name: "Directions", value: "Dir", id: '2'},
    {name: "Object", value: "3D", id: '3'},
    {name: "Example", value: "Ex", id: '4'},
];

const AppTs = () => {
    const [mode, setMode] = useState<string>("Geo");
    const [mapStyle, setMapStyle] = useState<string>('');
    const [content, setContent] = useState<React.FC | any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('2');
    const [source, setSource] = useState<string | ''>('');

    // @ts-ignore
    const show: boolean = useSelector(state => state.info.isShow);
    const dispatch = useDispatch();

    const contentMount = (): React.ReactElement => {
        switch (mode) {
            case "Ex":
                return <AppExamples />;
            case "3D":
                return <AppTsObjectMain/>;
            case "Dir":
                return <AppTsDirMain mapStyle={mapStyle}/>;
            case "Geo":
                return <AppTsMain mapStyle={mapStyle} setMapStyle={setMapStyle}/>;
            default:
                return <AppTsMain mapStyle={mapStyle} setMapStyle={setMapStyle}/>;
        }
    };

    const changePage = (): object => {
        setIsLoading(true);

        setContent(contentMount());

        const timer = setTimeout((): void => setIsLoading(false), 2000);

        return (): void => clearTimeout(timer);
    };

    const showMap = (): void => {
        dispatch(showMapTC());
    };

    useEffect((): void => {
        changePage();
    }, []);

    useEffect((): void => {
        changePage();
    }, [mode]);

    return (
        <div className="App">
            <AppHeader setMode={(mode: string) => setMode(mode)} items={modeTypes}/>
            {isLoading && <AppLoading/>}
            {show && content}
            <button className='App-hidden-button' onClick={showMap}>{show ? 'Hide' : 'show'}</button>
        </div>
    );
}

export default AppTs;