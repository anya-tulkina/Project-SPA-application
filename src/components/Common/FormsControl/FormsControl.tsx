import React from "react";
import style from './FormsControl.module.css';
import {Field} from "redux-form";
import {required} from "../../utils/validators/validators";

export const FormControl = ({input, meta, child, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>;
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>;
}

export const creatField = (name, validators, placeholder, component, props={}, text='') => {
    return <div>
        <Field name={name}
               validate={validators}
               component={component}
               placeholder={placeholder}
               {...props}
        />{text}
    </div>
}