export const getAuthUserProfile = (state) => {
    return state.profilePage.profile
}
export const getAuth = (state) => {
    return state.auth.isAuth
}
export const getProfilePageStatus = (state) => {
    return state.profilePage.status
}
export const getAuthUserId = (state) => {
    return state.auth.userId
}