import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import { reducer } from "../bll/reducer";

const reducers = combineReducers({info: reducer});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

// export type IAppStore = ReturnType<typeof reducers>;
// export type AppDispatch = typeof store.dispatch;

// // @ts-ignore
window.store = store;