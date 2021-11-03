import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import AppTs from "./AppTs";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<App/>*/}
          <AppTs/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
