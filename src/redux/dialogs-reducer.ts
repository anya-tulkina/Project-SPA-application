const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

let initialState =
    {
        dialogs: [
            {id: 1, name: 'Dima'},
            {id: 2, name: 'Valera'},
            {id: 3, name: 'Anna'}
        ],
        messages: [
            {id: 1, message: 'hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'By'},
        ]
    };

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: action.newMessageBody}],
            }
        default:
            return state;
    }
}

export const sendMessage = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});


export default dialogsReducer;