import React, {FC} from "react";
import {connect} from "react-redux";
import {loginAuth} from "../../redux/auth-reducer"
import {Navigate} from "react-router-dom";
import {LoginReduxForm} from "./LoginForm";
import {AppStateType} from "../../redux/redux-store";

// Form`s all keys
export type LoginFormTypesKeys = keyof FormDataType;

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type MapStateType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchType = {
    loginAuth: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapDispatchType & MapStateType;

const Login: FC<PropsType> = ({loginAuth, isAuth, captchaUrl}) => {

    const onSubmit = (formData: FormDataType) => {
        loginAuth(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (isAuth) return <Navigate to={'/profile'}/>

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginAuth})(Login);