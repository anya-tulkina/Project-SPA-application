import {usersApi} from "../api/api";
import {updateObjectInArray} from "../components/utils/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UN_FOLLOW = 'users/UN_FOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'users/TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // users: state.users.map(u => {
                //         if (u.id === action.userId) {
                //             return {...u, followed: true};
                //         }
                //         return u;
                //     }
                // )
            }
        case UN_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingIsProgress: action.isFetching ?
                    [...state.followingIsProgress, action.userId] :
                    state.followingIsProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UN_FOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingUsers = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING, isFetching, userId});

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersApi.requestUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(toggleIsFetching(false));
}

export const followUnfollowFlow = async (dispatch, methodApi, actionCreate, userId) => {

    dispatch(toggleFollowingUsers(true, userId));
    let response = await methodApi(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreate(userId))
    }
    dispatch(toggleFollowingUsers(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersApi.follow, followSuccess, userId);
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, usersApi.unfollow, unfollowSuccess, userId);
}

export default usersReducer;