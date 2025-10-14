import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes, ThunksTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersApi} from "../api/users-api";

let initialState = {
    friends: [] as UserType[]
};

const sidebarReducer =
    (state = initialState, action: ActionsTypes): InitialStateType => {
        switch (action.type) {
            case 'USERS_NAV_BAR':
                return {
                    ...state,
                    friends: action.friends
                }
            default:
                return state;
        }
    }

const actions = {
    setFriendsNavBar: (friends: Array<UserType>) =>
        ({type: 'USERS_NAV_BAR', friends} as const)
}

export const getFriends = (): ThunkType =>
    async (dispatch) => {
        const data = await usersApi.getFriends();
        dispatch(actions.setFriendsNavBar(data.items))
    }

export default sidebarReducer;


type InitialStateType = typeof initialState;
type ThunkType = ThunksTypes<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;