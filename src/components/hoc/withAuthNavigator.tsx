import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type NavigatorComponentType = {
    isAuth: boolean
}

export const withAuthComponent = (Component: any) => {

    class NavigatorComponent extends React.Component<NavigatorComponentType> {
        render() {
            if (!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps)(NavigatorComponent);
}