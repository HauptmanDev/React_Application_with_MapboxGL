export type optionsType = {
    container: any,
    style: string,
    center: Array<number>,
    zoom: number,
    pitch?: number,
    bearing?: number,
    antialias?: boolean
}

export interface IAppTsMainProps {
    mapStyle?: string,
    setMapStyle?: (i: string) => void,
}

export interface IInitCoordinates {
    initLng: number,
    initLat: number,
    initZoom: number,
    initStyle: string,
}