import './AppMain.scss';
import React from 'react';
import {useEffect, useRef, useState} from "react";
import {CoordinatesStyleWrapper} from "../coordinates-style-wrapper/CoordinatesStyleWrapper";
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// @ts-ignore
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import {optionsType, IInitCoordinates, IAppTsMainProps} from "./common-types/types";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';

const initCoordinates: IInitCoordinates = {
    initLng: +Number(27.55).toFixed(2),
    initLat: +Number(53.90).toFixed(2),
    initZoom: +Number(10).toFixed(2),
    initStyle: 'mapbox://styles/mapbox/satellite-streets-v11',
    // initStyle: 'mapbox://styles/mapbox/dark-v10',
};

export const AppTsDirMain = ({mapStyle}: IAppTsMainProps): JSX.Element => {

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState<number>(initCoordinates.initLng);
    const [lat, setLat] = useState<number>(initCoordinates.initLat);
    const [zoom, setZoom] = useState<number>(initCoordinates.initZoom);

    const [distance, setDistance] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

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
        controls: {instructions: false},
    });
    // Init
    useEffect(() => {
        const options: optionsType = {
            container: mapContainer.current,
            style: mapStyle || initCoordinates.initStyle,
            center: [initCoordinates.initLng, initCoordinates.initLat],
            zoom: initCoordinates.initZoom,
            antialias: true,
        }
        map.current = new mapboxgl.Map(options);
        map.current.addControl(fullscreenControl, "top-right");
        map.current.addControl(navigationControl, "top-right");
        map.current.addControl(mapboxDirections, "top-left");

        map.current.on('load', ( ) => {
            mapboxDirections.on('route', (event: any) => {
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
};
// @ts-ignore