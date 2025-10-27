import React from "react";
import s from './ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {creatField, Input, Textarea} from "../../Common/FormsControl/FormsControl";
import style from "../../Common/FormsControl/FormsControl.module.css";
import {FC} from "react";
import {ProfileType} from "../../../types/types";
import {FormDataType} from "./ProfileInfo";

type OwnProps = {
    profile: ProfileType
}
type PropsTypes = OwnProps & InjectedFormProps<FormDataType>

const ProfileDataForm: FC<PropsTypes> = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full Name:</b> {creatField('fullName', [], 'Full Name', Input)}
        </div>
        <div>
            <b>Looking for a job:</b>{creatField('lookingForAJob', [], '', Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My skill: </b> {creatField('lookingForAJobDescription', [], 'My skill', Textarea)}
        </div>
        <div>
            <b>About me: </b> {creatField('aboutMe', [], 'About me', Textarea)}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <div className={s.contact}>
                <b>{key}: {creatField('contacts.' + key, [], key, Input)}</b>
            </div>
        })}
        </div>
    </form>
};
const ProfileDataFormRedux =
    reduxForm<FormDataType>({form: 'edit-profile', destroyOnUnmount: false})(ProfileDataForm);

export default ProfileDataFormRedux;