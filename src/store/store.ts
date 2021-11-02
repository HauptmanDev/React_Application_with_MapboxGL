import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import { reducer } from "../bll/reducer";

export type AppStoreType = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const reducers = combineReducers({info: reducer});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;