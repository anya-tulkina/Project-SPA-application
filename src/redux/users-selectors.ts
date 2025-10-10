import {createSelector} from "selector";

const getUsersSelector = (state) => {
    return state.usersPage.users
}

//reselector создается только для сложных вычислительных операций и фильтраций, чтобы не происходил лишний рендер
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users;
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}
export const getFollowingIsProgress = (state) => {
    return state.usersPage.followingIsProgress
}