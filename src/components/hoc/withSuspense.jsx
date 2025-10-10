import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthComponent = (Component) => {

    class NavigatorComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps)(NavigatorComponent);
}