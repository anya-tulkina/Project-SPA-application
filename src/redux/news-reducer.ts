const SEND_NEWS = 'SEND_NEWS';

let initialState = {
    news: [
        {id: 1, news: 'hi'},
        {id: 2, news: "I'm Anna"}
    ]
};

const newsReducer = (state = initialState, action) => {
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

export const sendNewsCreator = (news) => ({type: SEND_NEWS, news});


export default newsReducer;