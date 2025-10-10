import React from "react";
import {Field, reduxForm} from "redux-form";
import {creatField, Input} from "../Common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../utils/validators/validators";
import style from "./../Common/FormsControl/FormsControl.module.css";

const maxLength = maxLengthCreator(20);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit}>
            {creatField('email', [required, maxLength], 'Email', Input)}
            {creatField('password', [required, maxLength], 'Password', Input, {type: 'password'})}
            {creatField(null, [], 'Password', Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl  && creatField('captcha', [required], 'Symbols far a photo', Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);