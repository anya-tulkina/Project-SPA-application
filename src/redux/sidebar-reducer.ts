import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersApi} from "../api/users-api";

let initialState = {
    friends: []
};

export type InitialStateType = {
    friends: UserType[]
}

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

type ActionsTypes = InferActionsTypes<typeof actions>;


type DispatchType = Dispatch<ActionsTypes>
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const actions = {
    setFriendsNavBar: (friends: Array<UserType>) => ({type: 'USERS_NAV_BAR', friends} as const)
}

export const getFriends = (): ThunksTypes =>
    async (dispatch: DispatchType) => {
        const data = await usersApi.getFriends();
        dispatch(actions.setFriendsNavBar(data.items))
    }

export default sidebarReducer;