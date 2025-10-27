import {ResultsCodesEnum} from "../api/api";
import {updateObjectInArray} from "../components/utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes, ThunksTypes} from "./redux-store";
import {usersApi} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array user id
    filter: {
        term: ''
    }
};

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
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        case 'GET_FILTER_USERS':
            return {
                ...state, filter: action.payload
            }
        default:
            return state;
    }
}


const actions = {
    followSuccess: (userId: number) =>
        ({type: 'FOLLOW', userId} as const),

    unfollowSuccess: (userId: number) =>
        ({type: 'UN_FOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) =>
        ({type: 'SET_CURRENT_PAGE', currentPage} as const),

    getFilterUsers: (term: string) =>
        ({type: 'GET_FILTER_USERS', payload: {term}} as const),

    setTotalUsersCount: (totalUsersCount: number) =>
        ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingUsers: (isFetching: boolean, userId: number) =>
        ({type: 'TOGGLE_IS_FOLLOWING', isFetching, userId} as const)

}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.getFilterUsers(filter.term));

        let data = await usersApi.requestUsers(currentPage, pageSize, filter.term);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }

export const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                         methodApi: any,
                                         actionCreate: (userId: number) => ActionsTypes,
                                         userId: number) => {

    dispatch(actions.toggleFollowingUsers(true, userId));
    let data = await methodApi(userId);
    if (data.resultCode === ResultsCodesEnum.Success) {
        dispatch(actionCreate(userId))
    }
    dispatch(actions.toggleFollowingUsers(false, userId));
}

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.follow, actions.followSuccess, userId);
    }

export const unfollow = (userId: number): ThunkType =>
    async (dispatch) => {
        followUnfollowFlow(dispatch, usersApi.unfollow, actions.unfollowSuccess, userId);
    }

export default usersReducer;


type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunksTypes<ActionsTypes>;
