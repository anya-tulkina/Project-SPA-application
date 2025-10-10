import React from "react";
import {connect} from "react-redux";
import {loginAuth} from "../../redux/auth-reducer"
import {Navigate} from "react-router-dom";
import {LoginReduxForm} from "./LoginForm";

const Login = ({loginAuth, isAuth, captchaUrl}) => {

    const onSubmit = (formData) => {
        loginAuth(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (isAuth) return <Navigate to={'/profile'}/>

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginAuth})(Login);