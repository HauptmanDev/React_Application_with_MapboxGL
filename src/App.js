import './App.scss';
import {AppHeader} from "./components/app-header/AppHeader";
import {AppMain} from "./components/app-main/AppMain";
import {useState} from "react";
import {AppDirMain} from "./components/app-main/AppDirMain";

const modeTypes = [
    {name: "Geocoder", value: "Geo", id: '1'},
    {name: "Directions", value: "Dir", id: '2'},
];

const App = () => {
    const [mode, setMode] = useState("Geo");
    const [mapStyle, setMapStyle] = useState('');

    const content = mode === "Geo" ?
        <AppMain mapStyle={mapStyle} setMapStyle={setMapStyle}/> :
        <AppDirMain mapStyle={mapStyle} setMapStyle={setMapStyle}/>;

    return (
        <div className="App">
            <AppHeader mode={mode} setMode={setMode} items={modeTypes}/>
            {content}
        </div>
    );
}

export default App;