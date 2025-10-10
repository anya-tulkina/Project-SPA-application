import {usersApi, profileApi} from "../api/api";
import profile from "../components/Profile/Profile";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 10},
        {id: 2, message: 'Bye', likesCount: 5},
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newState = {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostElement, likesCount: 0}]
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostElement) => ({type: ADD_POST, newPostElement});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => (dispatch) => {
    usersApi.getProfile(userId).then(res => {
       dispatch(setUserProfile(res.data));
    })
};

export const getStatus = (userId) => (dispatch) => {
    profileApi.getStatus(userId).then(res => {
        dispatch(setStatus(res.data));
    })
};

export const updateStatus = (status) => (dispatch) => {
    profileApi.updateStatus(status).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    })
};

export default profileReducer;