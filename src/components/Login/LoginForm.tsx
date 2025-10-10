import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {creatField, Input} from "../Common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../utils/validators/validators";
import style from "./../Common/FormsControl/FormsControl.module.css";
import {FormDataType, LoginFormTypesKeys} from "./Login";

const maxLength = maxLengthCreator(20);

type OwnType = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<FormDataType> & OwnType> = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit}>
            {/*call creatField, give argument for Generic*/}
            {creatField<LoginFormTypesKeys>('email', [required, maxLength], undefined, Input)}
            {creatField<LoginFormTypesKeys>('password', [required, maxLength], 'Password', Input, {type: 'password'})}
            {creatField<LoginFormTypesKeys>('rememberMe', [], '', Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl  && creatField<LoginFormTypesKeys>('captcha', [required], 'Symbols far a photo', Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


export const LoginReduxForm = reduxForm<FormDataType, OwnType>({form: 'login'})(LoginForm);