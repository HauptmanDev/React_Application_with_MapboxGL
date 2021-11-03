import '../AppMain.scss';
import {useEffect, useRef, useState} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import {CoordinatesStyleWrapper} from "../../coordinates-style-wrapper/CoordinatesStyleWrapper";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';

const initCoordinates = {
    initLng: Number(27.55).toFixed(2),
    initLat: Number(53.90).toFixed(2),
    initZoom: Number(10).toFixed(2),
    initStyle: 'mapbox://styles/mapbox/light-v10',
};

export const AppObjectMain = ({setIsLoading}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initCoordinates.initLng);
    const [lat, setLat] = useState(initCoordinates.initLat);
    const [zoom, setZoom] = useState(initCoordinates.initZoom);

    // FullscreenControl
    const fullscreenControl = new mapboxgl.FullscreenControl();

    // NavigationControl
    const navigationControl = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
    });

    // MapboxGeocoder
    const mapboxGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
    });

    // Init
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: initCoordinates.initStyle,
            center: [initCoordinates.initLng, initCoordinates.initLat],
            zoom: initCoordinates.initZoom,
            pitch: 45,
            // bearing: -17.6,
            antialias: true
        });

        map.current.addControl(fullscreenControl, "top-right");
        map.current.addControl(navigationControl, "top-right");
        map.current.addControl(mapboxGeocoder, "top-left");

        map.current.on('load', () => {
            // Insert the layer beneath any symbol layer.
            const layers = map.current.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;

            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.current.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',

                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });
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
        <main className="App-obj-main">
            <article className="App-article">
                <section className="App-first-section">

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