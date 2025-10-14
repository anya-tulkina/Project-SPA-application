import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes, ThunksTypes} from "./redux-store";

let initialState = {
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

const actions = {
    initializedSuccess: () =>
        ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initialiseApp = (): ThunkType =>
    async (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess());
        })
    };

export default appReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunksTypes<ActionsTypes>;