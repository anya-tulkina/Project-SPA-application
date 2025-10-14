import {NewsType} from "../types/types";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    news: [
        {id: 1, news: 'hi'},
        {id: 2, news: "I'm Anna"}
    ] as Array<NewsType>
};

const newsReducer = (state = initialState,
                     action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SEND_NEWS':
            return {
                ...state,
                news: [...state.news, {id: 3, news: action.news}],
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actionsNews>;

export const actionsNews = {
   sendNewsCreator: (news: string) =>
        ({type: 'SEND_NEWS', news} as const)
}

export default newsReducer;

type initialStateType = typeof initialState;