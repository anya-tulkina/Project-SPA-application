import {MeResultsCodes, usersApi} from "../api/api";
import {updateObjectInArray} from "../components/utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const FOLLOW = 'users/FOLLOW';
const UN_FOLLOW = 'users/UN_FOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'users/TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: [] as Array<number> // array user id
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
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

type ActionsTypes = FollowSuccessType | UnfollowSuccess | SetUsersType | SetCurrentPageType |
    SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingUsersType

type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType =>
    ({type: FOLLOW, userId});

type UnfollowSuccess = {
    type: typeof UN_FOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccess =>
    ({type: UN_FOLLOW, userId});

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType =>
    ({type: SET_CURRENT_PAGE, currentPage});

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType =>
    ({type: TOGGLE_IS_FETCHING, isFetching});

type ToggleFollowingUsersType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFetching: boolean
    userId: number
}
export const toggleFollowingUsers = (isFetching: boolean, userId: number): ToggleFollowingUsersType =>
    ({type: TOGGLE_IS_FOLLOWING, isFetching, userId});


type DispatchType = Dispatch<ActionsTypes>
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunksTypes =>
    async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersApi.requestUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
}

export const followUnfollowFlow =
    async (dispatch: DispatchType,
           methodApi: any,
           actionCreate: (userId: number) => FollowSuccessType | UnfollowSuccess, userId: number) => {

        dispatch(toggleFollowingUsers(true, userId));
        let response = await methodApi(userId);
        if (response.resultCode === MeResultsCodes.Success) {
            dispatch(actionCreate(userId))
        }
        dispatch(toggleFollowingUsers(false, userId));
    }

export const follow = (userId: number): ThunksTypes =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.follow, followSuccess, userId);
    }

export const unfollow = (userId: number): ThunksTypes =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.unfollow, unfollowSuccess, userId);
    }

export default usersReducer;