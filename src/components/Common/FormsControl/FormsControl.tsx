import React, {FC} from "react";
import style from './FormsControl.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {ValidatorsType} from "../../utils/validators/validators";

type FormControlType = {
    meta: WrappedFieldMetaProps /*WrappedFieldMetaProps - type redux-form, all methods meta*/
    children: React.ReactNode
}
export const FormControl: FC<FormControlType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    /*WrappedFieldProps - type redux-form from input, meta*/
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>;
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>;
}

/*give keys from call*/
export function creatField<FormKeyType extends string>(name: FormKeyType,
                                                       validators: ValidatorsType[],
                                                       placeholder: string | undefined,
                                                       component: string | React.Component | React.FC,
                                                       props = {}, text = '') {
    return <div>
        <Field name={name}
               validate={validators}
               component={component}
               placeholder={placeholder}
               {...props}
        />{text}
    </div>
}