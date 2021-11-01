import './App.scss';
import {useEffect, useState} from "react";
import {AppHeader} from "./components/app-header/AppHeader";
import {AppLoading} from "./components/app-loading/AppLoading";

import {AppMain} from "./components/app-main/AppMain";
import {AppDirMain} from "./components/app-main/AppDirMain";
import {AppObjectMain} from "./components/app-main/AppObjectMain";

import {useDispatch, useSelector} from "react-redux";
import {showMapTC} from "./bll/reducer";

const modeTypes = [
    {name: "Geocoder", value: "Geo", id: '1'},
    {name: "Directions", value: "Dir", id: '2'},
    {name: "Objects", value: "3D", id: '3'},
];

const App = () => {
    const [mode, setMode] = useState("Geo");
    const [mapStyle, setMapStyle] = useState('');
    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const show = useSelector(state => state.info.isShow)
    const dispatch = useDispatch();

    const contentMount = () => {
        switch (mode) {
            case "3D":
                return <AppObjectMain/>;
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
    }

    useEffect(() => {
        changePage();
    }, [ ]);

    useEffect(() => {
        changePage();
    }, [mode]);

    return (
    <div className="App">
        <AppHeader mode={mode} setMode={setMode} items={modeTypes}/>
        {isLoading && <AppLoading/>}
        {show && content}
        <button onClick={showMap}>{show ? 'Hide' : 'show'}</button>
    </div>
    );
}

export default App;