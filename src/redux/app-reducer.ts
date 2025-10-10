import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState,
                    action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

const actions = {
    initializedSuccess: () =>
        ({type: 'INITIALIZED_SUCCESS'} as const),
}

export const initialiseApp = (): ThunksTypes =>
    async (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess());
        })
    };

export default appReducer;