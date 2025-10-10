import {usersApi} from "../api/api";

let USERS_NAV_BAR = 'USERS_NAV_BAR';

let initialState = {
    friends: []
};


const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_NAV_BAR:
            return {
                ...state,
                friends: action.friends
            }
        default:
            return state;
    }
}

export const setFriendsNavBar = (friends) => {
    return {type: USERS_NAV_BAR, friends}
}

export const getFriends = () => {
    return (dispatch) => {
        usersApi.getFriends()
            .then(res => dispatch(setFriendsNavBar(res.items)))
    }
}
export default sidebarReducer;