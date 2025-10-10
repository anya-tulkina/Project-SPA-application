import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import photoUrl from "../../../assets/images/photo.jpg"
import ProfileStatusWIthHook from "./ProfileStatusWithHook";
import React, {useState} from "react";
import ProfileDataFormRedux from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        )
    }

    return (
        <div>
            <div className={`${s.description} ${s.photos}`}>
                {!profile.photos.large ? <img src={photoUrl}/> : <img src={profile.photos.large}/>}
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>
            <ProfileStatusWIthHook status={status} updateStatus={updateStatus}/>
            {editMode
                ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }} profile={profile}/>
            }
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <button onClick={goToEditMode}>edit</button>}
        <div>
            <b>Full Name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>My skill: </b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me: </b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;