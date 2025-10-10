import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";
import {UserType} from "../types/types";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

//reselector создается только для сложных вычислительных операций и фильтраций, чтобы не происходил лишний рендер
export const getUsers = createSelector(getUsersSelector, (users: Array<UserType>) => {
    return users;
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingIsProgress = (state: AppStateType) => {
    return state.usersPage.followingIsProgress
}