import {usersApi} from "../api/api";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

let USERS_NAV_BAR = 'friends_nav/USERS_NAV_BAR';

let initialState = {
    friends: []
};

export type InitialStateType = {
    friends: UserType[]
}

const sidebarReducer =
    (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetFriendsNavBarType;


type DispatchType = Dispatch<ActionsTypes>
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type SetFriendsNavBarType = {
    type: typeof USERS_NAV_BAR
    friends: Array<UserType>
}
export const setFriendsNavBar = (friends: Array<UserType>): SetFriendsNavBarType => {
    return {type: USERS_NAV_BAR, friends}
}

export const getFriends = (): ThunksTypes =>
    async (dispatch: DispatchType) => {
        const data = await usersApi.getFriends();
        dispatch(setFriendsNavBar(data.items))
}

export default sidebarReducer;