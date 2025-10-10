import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {FC} from "react";
import {ProfileType} from "../../types/types";

type PropsType = {
    saveProfile: (profile: ProfileType) => Promise<void>
    savePhoto : (photo: File) => Promise<void>
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}
const Profile:FC<PropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner}
                         profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;