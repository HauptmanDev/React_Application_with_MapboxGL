import {ThunkAction, ThunkDispatch} from "redux-thunk";

export const SHOW_MAP = "SHOW_MAP";

interface ISomeAction {
    type: typeof SHOW_MAP;
}
export interface IState {
    isShow: boolean
}

type Return = void;
type State = any;
type ExtraArgument = {};

export const initialState: IState = {
    isShow: true,
};

export const reducer = (state = initialState, action: ISomeAction) => {
    switch (action.type) {
        case SHOW_MAP:
            return {
                ...state, isShow: !state.isShow
            }
        default: {
            return state;
        }
    }
};

// Action Creator
export const showMapAC = ():ISomeAction => {
    return {
        type: SHOW_MAP
    }
}

// Thunk Creator
export const showMapTC = (): ThunkAction<Return, State, ExtraArgument, any> =>
    async (dispatch: ThunkDispatch<State, ExtraArgument, any>) => {
    dispatch(showMapAC())
    // setTimeout(() => dispatch(showMapAC()), 2000);
}