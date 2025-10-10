import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { reducer as formReducer } from 'redux-form';
import newsReducer from "./news-reducer";
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    newsPage: newsReducer,
    sideBar: sidebarReducer,
    form: formReducer,
    app: appReducer
});

const store = configureStore({
    reducer: rootReducer,
    // Thunk уже включен по умолчанию в Redux Toolkit
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Если нужны специальные настройки:
            serializableCheck: {
                ignoredActions: ['your/action/type'], // Игнорируемые actions
                ignoredPaths: ['form'] // Игнорируемые пути в state
            }
        })
    // Можно добавить кастомные middleware, если нужно
    // .concat(yourCustomMiddleware)
});

type PropertiesTypes<T> = T extends {[key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

type RootStateType = typeof rootReducer;
export type AppStateType = ReturnType<RootStateType>;

// @ts-ignore
window.__store__ = store;

export default store;