import './AppLoading.scss'
import React from "react";
import ReactLoading from "react-loading";

export const AppLoading: React.FC = () => (
    <div className='App-loading'>
        <ReactLoading type={'spin'} color={"#fff"} delay={1000}/>
    </div>
);