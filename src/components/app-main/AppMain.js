import './AppMain.scss';
import {useEffect, useRef, useState} from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {CoordinatesStyleWrapper} from "../coordinates-style-wrapper/CoordinatesStyleWrapper";
import {CalculationBasicBlock, CalculationBlock} from "../calculation-box/CalculationBlock";
import {CoordinatesBlock} from "../coordinates-block/CoordinatesBlock";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';

const initCoordinates = {
    initLng: Number(27.55).toFixed(2),
    initLat: Number(53.90).toFixed(2),
    initZoom: Number(10).toFixed(2),
    initStyle: 'mapbox://styles/mapbox/dark-v10',
};

export const AppMain = ({mapStyle, setMapStyle}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initCoordinates.initLng);
    const [lat, setLat] = useState(initCoordinates.initLat);
    const [zoom, setZoom] = useState(initCoordinates.initZoom);

    const setNewCoordinates = (e) => {
        if (!map.current) return; // wait for map to initialize
        const input = e.target.id;
        const value = Number(e.target.value).toFixed(2);

        switch (input) {
            case 'lng':
                setLng(value);
                map.current.setCenter([value, lat]);
                break;
            case 'lat':
                setLat(value);
                map.current.setCenter([lng, value]);
                break;
            case 'zoom':
                setZoom(value);
                map.current.setZoom(value)
                break;
            default:
                return;
        }
    };

    const setNewTypeStyle = (e) => {
        const newTypeStyle = e.target.value;
        setMapStyle(newTypeStyle);
        map.current.setStyle(newTypeStyle);
    };

    const resetToDefaultValues = () => {
        if (!map.current) return; // wait for map to initialize

        map.current.resetNorth({duration: 2000});

        map.current.flyTo({
            center: [initCoordinates.initLng, initCoordinates.initLat],
            zoom: initCoordinates.initZoom,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        })

        setLng(initCoordinates.initLng);
        setLat(initCoordinates.initLat);
        setZoom(initCoordinates.initZoom)
    };

    const styleMapboxSelect = (
        <select value={mapStyle} className="mapboxgl-styles-list" name="styles" id="new-style"
                onChange={setNewTypeStyle}>
            <option value="mapbox://styles/mapbox/streets-v11">Streets-v11</option>
            <option value="mapbox://styles/mapbox/outdoors-v11">Outdoors-v11</option>
            <option value="mapbox://styles/mapbox/light-v10">light-v10</option>
            <option value="mapbox://styles/mapbox/dark-v10">Dark-v10</option>
            <option value="mapbox://styles/mapbox/satellite-v9">Satellite-v9</option>
            <option value="mapbox://styles/mapbox/satellite-streets-v11">Satellite-streets-v11</option>
            <option value="mapbox://styles/mapbox/navigation-day-v1">Navigation-day-v1</option>
            <option value="mapbox://styles/mapbox/navigation-night-v1">Navigation-night-v1
            </option>
        </select>);

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

    //MapboxDraw and updateArea
    const mapboxDraw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
            polygon: true,
            line_string: true,
            point: true,
            trash: true
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: 'draw_polygon'
    });
    const updateArea = (e) => {
        const data = mapboxDraw.getAll();
        const answer = document.getElementById('calculated-area');

        if (data.features.length > 0) {
            const area = turf.area(data);
            // Restrict the area to 2 decimal points.
            const rounded_area = (Math.round(area * 100) / 100).toFixed(2);
            answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;

        } else {
            answer.innerHTML = '';
            if (e.type !== 'draw.delete')
                alert('Click the map to draw a polygon.');
        }

        // if (data.features.length === 0) {
        //     const answerPolygon = document.getElementById('calculated-area-polygon');
        //     const answerLine = document.getElementById('calculated-area-line');
        //     answerPolygon.innerHTML = '';
        //     answerLine.innerHTML = '';
        //     if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
        //     return;
        // }
        //
        // if (data.features[0].geometry.type === 'LineString') {
        //     const answer = document.getElementById('calculated-area-line');
        //     const line = turf.lineString(data.features[0].geometry.coordinates);
        //     const length = turf.length(line, {units: 'kilometers'});
        //     answer.innerHTML = `<span class="value">${length}</span><span class="unit">km.</span>`;
        // } else {
        //     const answer = document.getElementById('calculated-area-polygon');
        //     const area = turf.area(data);
        //     // Restrict the area to 2 decimal points.
        //     const rounded_area = Math.round(area * 100) / 100;
        //     answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;
        // }
    };
    const selectPolygon = (e) => {
        const elementType = e.features[0]?.geometry?.type;
        const data = mapboxDraw.getAll();

        if (data.features.length === 0) return;

        if (!elementType) {
            const answerPolygon = document.getElementById('calculated-area-polygon');
            const answerLine = document.getElementById('calculated-area-line');
            answerPolygon.innerHTML = '';
            answerLine.innerHTML = '';
            // if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
        }

        if (elementType === "Polygon") {
            const answer = document.getElementById('calculated-area-polygon');
            const area = turf.area({features: e.features, type: "FeatureCollection"});
            const rounded_area = (Math.round(area * 100) / 100).toFixed(2);
            answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;
        }

        if (elementType === "LineString") {
            const answer = document.getElementById('calculated-area-line');
            const line = turf.lineString(e.features[0].geometry.coordinates);
            const length = (turf.length(line, {units: 'kilometers'})).toFixed(2);
            answer.innerHTML = `<span class="value">${length}</span><span class="unit">km.</span>`;
        }
    };

    // Init
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: initCoordinates.initStyle,
            center: [initCoordinates.initLng, initCoordinates.initLat],
            // center: [-122.619991, 45.536023], // Portland
            zoom: initCoordinates.initZoom,
            antialias: true,
            // attributionControl: false,
        });
        map.current.addControl(fullscreenControl, "top-right");
        map.current.addControl(mapboxDraw, 'top-right');
        map.current.addControl(navigationControl, "top-right");
        map.current.addControl(mapboxGeocoder, "top-left");

        map.current.on('draw.create', updateArea);
        map.current.on('draw.delete', updateArea);
        map.current.on('draw.update', updateArea);
        map.current.on('draw.selectionchange', selectPolygon);

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
        <main className="App-main">
            <article className="App-article">
                <section className="App-first-section">
                    <div className="mapboxgl-coordinates">
                        <CoordinatesStyleWrapper title={'Draw Zone'}>
                            <CalculationBasicBlock/>
                            <CalculationBlock id='polygon'/>
                            <CalculationBlock id='line'/>
                        </CoordinatesStyleWrapper>
                        <CoordinatesStyleWrapper title={'Enter new coordinates'}>
                            <CoordinatesBlock type={'input'} title={'Longitude:'} id={'lng'} className={'lng'}
                                              callback={setNewCoordinates}/>
                            <CoordinatesBlock type={'input'} title={'Latitude:'} id={'lat'} className={'lat'}
                                              callback={setNewCoordinates}/>
                            <CoordinatesBlock type={'input'} title={'Zoom:'} id={'zoom'} className={'zoom'}
                                              callback={setNewCoordinates}/>
                            <CoordinatesBlock type={'button'} title={'Reset to default values:'} id={'reset'}
                                              callback={resetToDefaultValues} buttonName={'Reset'}/>
                        </CoordinatesStyleWrapper>
                        <CoordinatesStyleWrapper title={'Choice new style'}>
                            <CoordinatesBlock title={'Style:'}>
                                {styleMapboxSelect}
                            </CoordinatesBlock>
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