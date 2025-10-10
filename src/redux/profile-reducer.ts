import {MeResultsCodes, profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

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
        case ADD_POST:
            let newState = {
                ...state,
                posts: [...state.posts, {id: 3, message: action.newPostElement, likesCount: 0}]
            }
            return newState;
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

type ActionsTypes = AddPostActionCreatorType | SetUserProfileType | SetStatusType | DeletePostType | SavePhotoSuccess;

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostElement: string
}
export const addPostActionCreator = (newPostElement: string): AddPostActionCreatorType =>
    ({type: ADD_POST, newPostElement})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

type SavePhotoSuccess = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccess => ({type: SAVE_PHOTO_SUCCESS, photos});

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunksTypes =>
    async (dispatch) => {
        let data = await profileApi.getProfile(userId);
        dispatch(setUserProfile(data.data));
    };

export const getStatus = (userId: number): ThunksTypes =>
    async (dispatch) => {
        try {
            let response = await profileApi.getStatus(userId);
            dispatch(setStatus(response.data));
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
                dispatch(setStatus(status));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const savePhoto = (file: string): ThunksTypes =>
    async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
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