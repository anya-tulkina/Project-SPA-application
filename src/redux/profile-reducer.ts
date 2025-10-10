import {MeResultsCodes, profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 10},
        {id: 2, message: 'Bye', likesCount: 5},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    aboutMe: ''
};
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState,
                        action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST':
            let newState = {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostElement, likesCount: 0}]
            }
            return newState;
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
     addPostActionCreator: (newPostElement: string)=> ({type: 'ADD_POST', newPostElement} as const),

     setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),

     setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),

     deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),

     savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunksTypes =>
    async (dispatch) => {
        let data = await profileApi.getProfile(userId);
        dispatch(actions.setUserProfile(data.data));
    };

export const getStatus = (userId: number): ThunksTypes =>
    async (dispatch) => {
        try {
            let response = await profileApi.getStatus(userId);
            dispatch(actions.setStatus(response.data));
        } catch (error) {
            console.log(error);
        }
    };

export const updateStatus = (status: string): ThunksTypes =>
    async (dispatch) => {
        // try...catch обработчик ошибок, при этом обработчик window не срабатывает
        try {
            let data = await profileApi.updateStatus(status);
            if (data.resultCode === MeResultsCodes.Success) {
                dispatch(actions.setStatus(status));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const savePhoto = (file: string): ThunksTypes =>
    async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
        }
    };

export const saveProfile = (profile: ProfileType) =>
    async (dispatch: any, getState: any) => {
        let userId = getState().auth.userId;
        let response = await profileApi.saveProfile(profile);

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0]);
        }
    };

export default profileReducer;