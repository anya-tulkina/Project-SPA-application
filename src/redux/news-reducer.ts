import {NewsType} from "../types/types";

const SEND_NEWS = 'news/SEND_NEWS';

let initialState = {
    news: [
        {id: 1, news: 'hi'},
        {id: 2, news: "I'm Anna"}
    ] as Array<NewsType>
};
export type initialStateType = typeof initialState;

const newsReducer = (state = initialState,
                     action: ActionsType): initialStateType => {
    switch (action.type) {
        case SEND_NEWS:
            return {
                ...state,
                news: [...state.news, {id: 3, news: action.news}],
            }
        default:
            return state;
    }
}

type ActionsType = SendNewsCreatorType;

type SendNewsCreatorType = {
    type: typeof SEND_NEWS
    news: string
}
export const sendNewsCreator = (news: string): SendNewsCreatorType =>
    ({type: SEND_NEWS, news});


export default newsReducer;