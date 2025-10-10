import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi', likesCount: 10},
                {id: 2, message: 'Bye', likesCount: 5},
            ],
            newPostText: ' ',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Valera'},
                {id: 3, name: 'Anna'}
            ],
            messages: [
                {id: 1, message: 'hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'By'},
            ],
            newMessageBody: ' ',
        },
        // sideBar: {
        //     friends: [
        //         {
        //             id: 1,
        //             name: 'Dima',
        //             img: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-2.jpg'
        //         },
        //         {
        //             id: 2,
        //             name: 'Valera',
        //             img: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-2.jpg'
        //         },
        //         {
        //             id: 3,
        //             name: 'Anna',
        //             img: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-2.jpg'
        //         },
        //     ]
        // }
    },
    _callSubscriber() {
        console.log('hey')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch (action) {// type: 'ADD-POST'
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state);
    }
};
// window.store = store;
export default store;

