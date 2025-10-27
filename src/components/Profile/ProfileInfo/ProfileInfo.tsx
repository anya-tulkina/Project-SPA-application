import s from './ProfileInfo.module.css'
import Preloader from '../../Common/Preloader/Preloader';
import photoUrl from '../../../assets/images/photo.jpg';
import ProfileStatusWIthHook from './ProfileStatusWithHook';
import React, {ChangeEvent, FC, useState} from 'react';
import ProfileDataFormRedux from './ProfileDataForm';
import {ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => Promise<void>
    saveProfile: (profile: ProfileType) => Promise<void>
}

export type FormDataType = ProfileType | null

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
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
            <ProfileStatusWIthHook isOwner={isOwner} status={status} updateStatus={updateStatus}/>
            {editMode
                ? <ProfileDataFormRedux initialValues={profile} onSubmit={onSubmit}/>
                : <ProfileData isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }} profile={profile}/>
            }
        </div>
    )
}

type ProfileDataTypes = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: FC<ProfileDataTypes> = ({profile, isOwner, goToEditMode}) => {
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

type ContactType = {
    contactTitle: string
    contactValue: string
}
const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;