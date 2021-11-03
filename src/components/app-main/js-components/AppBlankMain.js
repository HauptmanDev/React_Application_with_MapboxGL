// import './AppMain.scss';
// import {useEffect, useRef, useState} from "react";
// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import * as turf from '@turf/turf'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import {CoordinatesStyleWrapper} from "../coordinates-style-wrapper/CoordinatesStyleWrapper";
// import {CalculationBasicBlock, CalculationBlock} from "../calculation-box/CalculationBlock";
// import {CoordinatesBlock} from "../coordinates-block/CoordinatesBlock";
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
//
// mapboxgl.accessToken = 'pk.eyJ1IjoiaGF1cHRtYW5kZXYiLCJhIjoiY2t1bWszNnM2MWU1aDJwbzZqc3BkeGhweSJ9.a4FkHvvjek1E88SKJ0OAqw';
//
// const initCoordinates = {
//     initLng: Number(27.55).toFixed(2),
//     initLat: Number(53.90).toFixed(2),
//     initZoom: Number(10).toFixed(2),
//     initStyle: 'mapbox://styles/mapbox/dark-v10',
// };
//
// export const AppMain = ({mode}) => {
//
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [typeStyle, setTypeStyle] = useState('');
//     const [lng, setLng] = useState(initCoordinates.initLng);
//     const [lat, setLat] = useState(initCoordinates.initLat);
//     const [zoom, setZoom] = useState(initCoordinates.initZoom);
//
//     const setNewCoordinates = (e) => {
//         if (!map.current) return; // wait for map to initialize
//         const input = e.target.id;
//         const value = Number(e.target.value).toFixed(2);
//
//         switch (input) {
//             case 'lng':
//                 setLng(value);
//                 map.current.setCenter([value, lat]);
//                 break;
//             case 'lat':
//                 setLat(value);
//                 map.current.setCenter([lng, value]);
//                 break;
//             case 'zoom':
//                 setZoom(value);
//                 map.current.setZoom(value)
//                 break;
//             default:
//                 return;
//         }
//     };
//
//     const setNewTypeStyle = (e) => {
//         const newTypeStyle = e.target.value;
//         setTypeStyle(newTypeStyle);
//         map.current.setStyle(newTypeStyle);
//     };
//
//     const resetToDefaultValues = () => {
//         if (!map.current) return; // wait for map to initialize
//
//         map.current.resetNorth({duration: 2000});
//
//         map.current.flyTo({
//             center: [initCoordinates.initLng, initCoordinates.initLat],
//             zoom: initCoordinates.initZoom,
//             essential: true // this animation is considered essential with respect to prefers-reduced-motion
//         })
//
//         setLng(initCoordinates.initLng);
//         setLat(initCoordinates.initLat);
//         setZoom(initCoordinates.initZoom)
//     };
//
//     const styleMapboxSelect = (
//         <select value={typeStyle} className="mapboxgl-styles-list" name="styles" id="new-style"
//                 onChange={setNewTypeStyle}>
//             <option value="mapbox://styles/mapbox/streets-v11">Streets-v11</option>
//             <option value="mapbox://styles/mapbox/outdoors-v11">Outdoors-v11</option>
//             <option value="mapbox://styles/mapbox/light-v10">light-v10</option>
//             <option value="mapbox://styles/mapbox/dark-v10">Dark-v10</option>
//             <option value="mapbox://styles/mapbox/satellite-v9">Satellite-v9</option>
//             <option value="mapbox://styles/mapbox/satellite-streets-v11">Satellite-streets-v11</option>
//             <option value="mapbox://styles/mapbox/navigation-day-v1">Navigation-day-v1</option>
//             <option value="mapbox://styles/mapbox/navigation-night-v1">Navigation-night-v1
//             </option>
//         </select>);
//
//     // FullscreenControl
//     const fullscreenControl = new mapboxgl.FullscreenControl();
//
//     // NavigationControl
//     const navigationControl = new mapboxgl.NavigationControl({
//         showCompass: true,
//         showZoom: true,
//     })
//
//     // MapboxDirections
//     const mapboxDirections = new MapboxDirections({
//         accessToken: mapboxgl.accessToken,
//         unit: 'metric',
//     });
//
//     // MapboxGeocoder
//     const mapboxGeocoder = new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//     })
//
//     //MapboxDraw and updateArea
//     const mapboxDraw = new MapboxDraw({
//         displayControlsDefault: false,
//         // Select which mapbox-gl-draw control buttons to add to the map.
//         controls: {
//             polygon: true,
//             line_string: true,
//             point: true,
//             trash: true
//         },
//         // Set mapbox-gl-draw to draw by default.
//         // The user does not have to click the polygon control button first.
//         defaultMode: 'draw_polygon'
//     });
//     const updateArea = (e) => {
//         const data = mapboxDraw.getAll();
//         const answer = document.getElementById('calculated-area');
//
//         if (data.features.length > 0) {
//             const area = turf.area(data);
//             // Restrict the area to 2 decimal points.
//             const rounded_area = (Math.round(area * 100) / 100).toFixed(2);
//             answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;
//
//         } else {
//             answer.innerHTML = '';
//             if (e.type !== 'draw.delete')
//                 alert('Click the map to draw a polygon.');
//         }
//
//         // if (data.features.length === 0) {
//         //     const answerPolygon = document.getElementById('calculated-area-polygon');
//         //     const answerLine = document.getElementById('calculated-area-line');
//         //     answerPolygon.innerHTML = '';
//         //     answerLine.innerHTML = '';
//         //     if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
//         //     return;
//         // }
//         //
//         // if (data.features[0].geometry.type === 'LineString') {
//         //     const answer = document.getElementById('calculated-area-line');
//         //     const line = turf.lineString(data.features[0].geometry.coordinates);
//         //     const length = turf.length(line, {units: 'kilometers'});
//         //     answer.innerHTML = `<span class="value">${length}</span><span class="unit">km.</span>`;
//         // } else {
//         //     const answer = document.getElementById('calculated-area-polygon');
//         //     const area = turf.area(data);
//         //     // Restrict the area to 2 decimal points.
//         //     const rounded_area = Math.round(area * 100) / 100;
//         //     answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;
//         // }
//     };
//     const selectPolygon = (e) => {
//         const elementType = e.features[0]?.geometry?.type;
//         const data = mapboxDraw.getAll();
//
//         if (data.features.length === 0) return;
//
//         if (!elementType) {
//             const answerPolygon = document.getElementById('calculated-area-polygon');
//             const answerLine = document.getElementById('calculated-area-line');
//             answerPolygon.innerHTML = '';
//             answerLine.innerHTML = '';
//             // if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
//         }
//
//         if (elementType === "Polygon") {
//             const answer = document.getElementById('calculated-area-polygon');
//             const area = turf.area({features: e.features, type: "FeatureCollection"});
//             const rounded_area = (Math.round(area * 100) / 100).toFixed(2);
//             answer.innerHTML = `<span class="value">${rounded_area}</span><span class="unit">sq.m.</span>`;
//         }
//
//         if (elementType === "LineString") {
//             const answer = document.getElementById('calculated-area-line');
//             const line = turf.lineString(e.features[0].geometry.coordinates);
//             const length = (turf.length(line, {units: 'kilometers'})).toFixed(2);
//             answer.innerHTML = `<span class="value">${length}</span><span class="unit">km.</span>`;
//         }
//     };
//
//     //
//     let removeCallback;
//
//     // Init
//     useEffect(() => {
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: initCoordinates.initStyle,
//             center: [initCoordinates.initLng, initCoordinates.initLat],
//             // center: [-122.619991, 45.536023], // Portland
//             zoom: initCoordinates.initZoom,
//             antialias: true,
//             // attributionControl: false,
//         });
//         map.current.addControl(fullscreenControl, "top-right");
//         map.current.addControl(mapboxDraw, 'top-right');
//         map.current.addControl(navigationControl, "top-right");
//         map.current.addControl(mapboxGeocoder, "top-left");
//         map.current.addControl(mapboxDirections, "top-left");
//
//         map.current.on('draw.create', updateArea);
//         map.current.on('draw.delete', updateArea);
//         map.current.on('draw.update', updateArea);
//         map.current.on('draw.selectionchange', selectPolygon);
//
//     }, []);
//
//     // Move
//     useEffect(() => {
//         if (!map.current) return; // wait for map to initialize
//         map.current.on('move', () => {
//             setLng(map.current.getCenter().lng.toFixed(2));
//             setLat(map.current.getCenter().lat.toFixed(2));
//             setZoom(map.current.getZoom().toFixed(2));
//         });
//     }, []);
//
//     // Mode
//     useEffect(()=> {
//         if (!map.current) return; // initialize map only once
//
//         // const addedGeoLog = map.current.hasControl(mapboxGeocoder);
//         // const addedDirLog = map.current.hasControl(mapboxDirections);
//
//         let modeName = mode;
//         const geoBlock = document.querySelector('.mapboxgl-ctrl-top-left .mapboxgl-ctrl-geocoder'); //document.querySelector('element.class:first-child')
//         const dirBlock = document.querySelector('.mapboxgl-ctrl-top-left .mapboxgl-ctrl-directions');
//
//         // const geoDisplayValue = window.getComputedStyle(geoBlock).display;
//         // const dirDisplayValue = window.getComputedStyle(dirBlock).display;
//
//         switch (modeName) {
//             case "Geo":
//                 dirBlock.style.display = 'none';
//                 geoBlock.style.display = 'flex';
//                 // isHasDir && map.current.removeControl(mapboxDirections);
//                 // setIsHasDir(false)
//                 //
//                 // blockTopLeft.style.left = ''; //style
//                 // map.current.addControl(mapboxGeocoder, "top-left");
//                 // const addedGeo = map.current.hasControl(mapboxGeocoder);
//                 // setIsHasGeo(addedGeo);
//
//                 break;
//             case "Dir":
//                 geoBlock.style.display = 'none';
//                 dirBlock.style.display = 'flex';
//
//                 // isHasGeo && map.current.removeControl(mapboxGeocoder);
//                 // setIsHasGeo(false);
//                 //
//                 // blockTopLeft.style.left = 0; //style
//                 // map.current?.addControl(mapboxDirections, "top-left");
//                 // const addedDir = map.current.hasControl(mapboxDirections);
//                 // setIsHasDir(addedDir);
//                 break;
//             default:
//                 break;
//         }
//
//     }, [mode])
//
//     //Rocket
//     // useEffect(() => {
//     // const loadMap = map.current;
//     // loadMap.on('load', async () => {
//     //     // Get the initial location of the International Space Station (ISS).
//     //     const geojson = await getLocation();
//     //     // Add the ISS location as a source.
//     //     loadMap.addSource('iss', {
//     //         type: 'geojson',
//     //         data: geojson
//     //     });
//     //     // Add the rocket symbol layer to the map.
//     //     loadMap.addLayer({
//     //         'id': 'iss',
//     //         'type': 'symbol',
//     //         'source': 'iss',
//     //         'layout': {
//     //         // This icon is a part of the Mapbox Streets style.
//     //         // To view all images available in a Mapbox style, open
//     //         // the style in Mapbox Studio and click the "Images" tab.
//     //         // To add a new image to the style at runtime see
//     //         // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
//     //             'icon-image': 'rocket-15'
//     //         }
//     //     });
//     //
//     //     // Update the source from the API every 2 seconds.
//     //     const updateSource = setInterval(async () => {
//     //         const geojson = await getLocation(updateSource);
//     //         loadMap.getSource('iss').setData(geojson);
//     //     }, 3000);
//     //
//     //     async function getLocation(updateSource) {
//     //     // Make a GET request to the API and return the location of the ISS.
//     //         try {
//     //             const response = await fetch(
//     //                 'https://api.wheretheiss.at/v1/satellites/25544',
//     //                 {method: 'GET'}
//     //             );
//     //             const {latitude, longitude} = await response.json();
//     //             // Fly the map to the location.
//     //             loadMap.flyTo({
//     //                 center: [longitude, latitude],
//     //                 speed: 0.5
//     //             });
//     //             // Return the location of the ISS as GeoJSON.
//     //             return {
//     //                 'type': 'FeatureCollection',
//     //                 'features': [
//     //                     {
//     //                         'type': 'Feature',
//     //                         'geometry': {
//     //                             'type': 'Point',
//     //                             'coordinates': [longitude, latitude]
//     //                         }
//     //                     }
//     //                 ]
//     //             };
//     //         } catch (err) {
//     //             // If the updateSource interval is defined, clear the interval to stop updating the source.
//     //             if (updateSource) clearInterval(updateSource);
//     //             throw new Error(err);
//     //         }
//     //     }
//     // });
//     // });
//
//     //Image
//     // useEffect(()=> {
//     //     map.current.on('load', () => {
//     //         map.current.addSource('minsk', {
//     //             'type': 'raster',
//     //             'url': 'mapbox://examples.32xkp0wd'
//     //         });
//     //
//     //         map.current.addLayer({
//     //             'id': 'portland',
//     //             'source': 'minsk',
//     //             'type': 'raster'
//     //         });
//     //     });
//     // }, [])
//
//     return (
//         <main className="App-main">
//             <article className="App-article">
//                 <section className="App-first-section">
//                     <div className="mapboxgl-coordinates">
//                         <CoordinatesStyleWrapper title={'Draw Zone'}>
//                             <CalculationBasicBlock/>
//                             <CalculationBlock id='polygon'/>
//                             <CalculationBlock id='line'/>
//                         </CoordinatesStyleWrapper>
//                         <CoordinatesStyleWrapper title={'Enter new coordinates'}>
//                             <CoordinatesBlock type={'input'} title={'Longitude:'} id={'lng'} className={'lng'}
//                                               callback={setNewCoordinates}/>
//                             <CoordinatesBlock type={'input'} title={'Latitude:'} id={'lat'} className={'lat'}
//                                               callback={setNewCoordinates}/>
//                             <CoordinatesBlock type={'input'} title={'Zoom:'} id={'zoom'} className={'zoom'}
//                                               callback={setNewCoordinates}/>
//                             <CoordinatesBlock type={'button'} title={'Reset to default values:'} id={'reset'}
//                                               callback={resetToDefaultValues} buttonName={'Reset'}/>
//                         </CoordinatesStyleWrapper>
//                         <CoordinatesStyleWrapper title={'Choice new style'}>
//                             <CoordinatesBlock title={'Style:'}>
//                                 {styleMapboxSelect}
//                             </CoordinatesBlock>
//                         </CoordinatesStyleWrapper>
//                     </div>
//                 </section>
//                 <section className="App-second-section">
//                     <div ref={mapContainer} className="map-container"/>
//                     <div className="sidebar">
//                         <span>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</span>
//                     </div>
//                 </section>
//             </article>
//         </main>
//     );
// }