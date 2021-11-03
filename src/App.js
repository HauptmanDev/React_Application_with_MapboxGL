import './App.scss';
import {useEffect, useState} from "react";
import {AppHeader} from "./components/app-header/AppHeader";
import {AppLoading} from "./components/app-loading/AppLoading";

import {AppMain} from "./components/app-main/AppMain";
import {AppDirMain} from "./components/app-main/AppDirMain";
import {AppObjectMain} from "./components/app-main/js-components/AppObjectMain";

import {useDispatch, useSelector} from "react-redux";
import {showMapTC} from "./bll/reducer";

const token = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';

const modeTypes = [
    {name: "Geocoder", value: "Geo", id: '1'},
    {name: "Directions", value: "Dir", id: '2'},
    {name: "Object", value: "3D", id: '3'},
];

const App = () => {
    const [mode, setMode] = useState("Geo");
    const [mapStyle, setMapStyle] = useState('');
    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const show = useSelector(state => state.info.isShow)
    const dispatch = useDispatch();

    const loadingContent = isLoading && <AppLoading/>;

    const contentMount = () => {
        switch (mode) {
            case "3D":
                return <AppObjectMain token={token}/>;
            case "Dir":
                return <AppDirMain mapStyle={mapStyle}/>;
            case "Geo":
                return <AppMain mapStyle={mapStyle} setMapStyle={setMapStyle}/>;
            default:
                return <AppMain mapStyle={mapStyle} setMapStyle={setMapStyle}/>;
        }
    };

    const changePage = () => {
        setIsLoading(true);

        setContent(contentMount());

        const timer = setTimeout(() => setIsLoading(false), 2000);

        return () => clearTimeout(timer);
    };

    const showMap = () => {
        dispatch(showMapTC());
    };

    useEffect(() => {
        changePage();
    }, [ ]);

    useEffect(() => {
        changePage();
    }, [mode]);

    return (
    <div className="App">
        <AppHeader setMode={setMode} items={modeTypes}/>
        {loadingContent}
        {show && content}
        <button className='App-hidden-button' onClick={showMap}>{show ? 'Hide' : 'show'}</button>
    </div>
    );
}

export default App;