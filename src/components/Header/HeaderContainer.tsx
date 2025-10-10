import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}
class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);