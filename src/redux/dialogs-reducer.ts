import {InferActionsTypes} from "./redux-store";

type DialogsType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState =
    {
        dialogs: [
            {id: 1, name: 'Dima'},
            {id: 2, name: 'Valera'},
            {id: 3, name: 'Anna'}
        ] as Array<DialogsType>,
        messages: [
            {id: 1, message: 'hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'By'},
        ] as Array<MessageType>
    }

export type InitialDialogsStateType = typeof initialState;

const dialogsReducer = (state = initialState,
                        action: ActionsType): InitialDialogsStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: action.newMessageBody}],
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actionsDialogs>

export const actionsDialogs = {
    sendMessage: (newMessageBody: string) =>
        ({type: 'SEND_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;