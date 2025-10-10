import {ResultsCodesEnum, ResultsCodesCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

let initialState =
    {
        userId: null as number | null,
        email: null as string | null,
        login: null as string | null,
        isAuth: false,
        captchaUrl: null as string | null
    };


export type InitialStateType = typeof initialState


const authReducer = (state = initialState,
                     action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

const actions = {
    setAuthUserData: (userId: number, email: string,
                      login: string, isAuth: boolean) =>
        ({type: 'SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),
}

export const getAuthUserData = (): ThunksTypes =>
    async (dispatch) => {
        let data = await authApi.me();
        if (data.resultCode === ResultsCodesEnum.Success) {
            let {id, email, login} = data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    };

export const loginAuth = (email: string, password: string,
                          rememberMe: boolean, captcha: string) =>
    async (dispatch: any) => {
        let data = await authApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultsCodesCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages : 'Common Error';
            dispatch(stopSubmit('login', {_error: message}))
        }
    };

export const getCaptchaUrl = (): ThunksTypes =>
    async (dispatch) => {
        let data = await securityApi.getCaptcha();
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));

    };

export const logout = (): ThunksTypes =>
    async (dispatch) => {
        let data = await authApi.logout();
        if (data.resultCode === ResultsCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    };

export default authReducer;