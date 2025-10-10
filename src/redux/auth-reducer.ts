import {authApi, MeResultsCodes, ResultsCodesCaptcha, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

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
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

type SetAuthUserDataActionPayloadType = {
    userId: number
    email: string
    login: string
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number, email: string,
                                login: string, isAuth: boolean): SetAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

type GetCaptchaUrlSuccessActionPayloadType = {
    captchaUrl: string
}
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: GetCaptchaUrlSuccessActionPayloadType
}

export const getCaptchaUrlSuccess = (captchaUrl: string):
    GetCaptchaUrlSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = (): ThunksTypes =>
    async (dispatch) => {
    let data = await authApi.me();
    if (data.resultCode === MeResultsCodes.Success) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const loginAuth = (email: string, password: string,
                          rememberMe: boolean, captcha: string) =>
    async (dispatch: any) => {
        let data = await authApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultsCodesCaptcha.CaptchaIsRequired) {
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
    dispatch(getCaptchaUrlSuccess(captchaUrl));

};

export const logout = (): ThunksTypes =>
    async (dispatch) => {
    let data = await authApi.logout();
    if (data.resultCode === MeResultsCodes.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;