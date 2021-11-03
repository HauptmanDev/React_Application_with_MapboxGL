import '../AppMain.scss';
import {useEffect, useRef, useState} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import {CoordinatesStyleWrapper} from "../../coordinates-style-wrapper/CoordinatesStyleWrapper";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';

const initCoordinates = {
    initLng: Number(27.55).toFixed(2),
    initLat: Number(53.90).toFixed(2),
    initZoom: Number(10).toFixed(2),
    initStyle: 'mapbox://styles/mapbox/satellite-streets-v11',
    // initStyle: 'mapbox://styles/mapbox/dark-v10',
};

export const AppDirMain = ({mapStyle, setIsLoading}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initCoordinates.initLng);
    const [lat, setLat] = useState(initCoordinates.initLat);
    const [zoom, setZoom] = useState(initCoordinates.initZoom);

    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);

    // FullscreenControl
    const fullscreenControl = new mapboxgl.FullscreenControl();

    // NavigationControl
    const navigationControl = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
    })

    // MapboxDirections
    const mapboxDirections = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        steps: false,
        language: 'ru',
        geometries: 'polyline',
        controls: {instructions: false}
    });

    // Init
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle || initCoordinates.initStyle,
            center: [initCoordinates.initLng, initCoordinates.initLat],
            // center: [-122.619991, 45.536023], // Portland
            zoom: initCoordinates.initZoom,
            antialias: true,
            // attributionControl: false,
        });
        map.current.addControl(fullscreenControl, "top-right");
        map.current.addControl(navigationControl, "top-right");
        map.current.addControl(mapboxDirections, "top-left");

        map.current.on('load', ( ) => {
            mapboxDirections.on('route', (event) => {
                const info = event.route[0];
                setDistance(Math.ceil(info.distance / 1000));
                setTime(Math.ceil(info.duration / 3600));
            });
        })

    }, []);

    // Move
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(2));
            setLat(map.current.getCenter().lat.toFixed(2));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    return (
        <main className="App-dir-main">
            <article className="App-article">
                <section className="App-first-section">
                    <div className="mapboxgl-coordinates">
                        <CoordinatesStyleWrapper title={'Indicators'}>
                            <div className="coordinates-block">
                                <span>{distance} km</span>
                                <span>{time} h</span>
                            </div>
                        </CoordinatesStyleWrapper>
                    </div>
                </section>
                <section className="App-second-section">
                    <div ref={mapContainer} className="map-container"/>
                    <div className="sidebar">
                        <span>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</span>
                    </div>
                </section>
            </article>
        </main>
    );
}