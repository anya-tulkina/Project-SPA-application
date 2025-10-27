import React, {ComponentType, FC} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


export const withAuthComponent = <P extends object>(Component: ComponentType<P>): FC<P> => {

    const NavigatorComponent: FC<P> = (props) => {

        const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

        if (!isAuth) return <Navigate to='/login' replace/>
        return <Component {...props}/>
    }

    return NavigatorComponent;
}