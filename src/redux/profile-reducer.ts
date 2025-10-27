import {ResultsCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {InferActionsTypes, ThunksTypes} from "./redux-store";
import {profileApi} from "../api/profile-api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 10},
        {id: 2, message: 'Bye', likesCount: 5},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    aboutMe: ''
};

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


export const actions = {
     addPostActionCreator: (newPostElement: string)=> ({type: 'ADD_POST', newPostElement} as const),

     setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),

     setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),

     deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),

     savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileApi.getProfile(userId);
        dispatch(actions.setUserProfile(data.data));
    };

export const getStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        try {
            let response = await profileApi.getStatus(userId);
            dispatch(actions.setStatus(response.data));
        } catch (error) {
            console.log(error);
        }
    };

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        // try...catch обработчик ошибок, при этом обработчик window не срабатывает
        try {
            let data = await profileApi.updateStatus(status);
            if (data.resultCode === ResultsCodesEnum.Success) {
                dispatch(actions.setStatus(status));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        let data = await profileApi.savePhoto(file);
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    };

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
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

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunksTypes<ActionsTypes | FormAction>