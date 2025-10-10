import {MeResultsCodes, usersApi} from "../api/api";
import {updateObjectInArray} from "../components/utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UN_FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING':
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

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    followSuccess: (userId: number) =>
        ({type: 'FOLLOW', userId} as const),

    unfollowSuccess: (userId: number) =>
        ({type: 'UN_FOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) =>
        ({type: 'SET_CURRENT_PAGE', currentPage} as const),

    setTotalUsersCount: (totalUsersCount: number) =>
        ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingUsers: (isFetching: boolean, userId: number) =>
        ({type: 'TOGGLE_IS_FOLLOWING', isFetching, userId} as const)

}
type DispatchType = Dispatch<ActionsTypes>
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunksTypes =>
    async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await usersApi.requestUsers(currentPage, pageSize);
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
}

export const followUnfollowFlow =
    async (dispatch: DispatchType,
           methodApi: any,
           actionCreate: (userId: number) => ActionsTypes, userId: number) => {

        dispatch(actions.toggleFollowingUsers(true, userId));
        let response = await methodApi(userId);
        if (response.resultCode === MeResultsCodes.Success) {
            dispatch(actionCreate(userId))
        }
        dispatch(actions.toggleFollowingUsers(false, userId));
    }

export const follow = (userId: number): ThunksTypes =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.follow, actions.followSuccess, userId);
    }

export const unfollow = (userId: number): ThunksTypes =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.unfollow, actions.unfollowSuccess, userId);
    }

export default usersReducer;