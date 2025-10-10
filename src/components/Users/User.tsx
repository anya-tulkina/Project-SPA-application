import React, {FC} from "react";
import s from './Users.module.css'
import photoUrl from "../../assets/images/photo.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type StateType = {
    user: UserType
    followingIsProgress: Array<number>
}
type DispatchType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnType = {}

type PropsType = StateType & DispatchType & OwnType

let User: FC<PropsType> = ({user, followingIsProgress, unfollow, follow}) => {

    const photoUserUrl = user.photos.small != null ? user.photos.small : photoUrl;
    const isFollowingInProgress = followingIsProgress.some(id => id === user.id);
    const handleUnFollowing = () => {
        unfollow(user.id)
    };
    const handleFollowing = () => {
        follow(user.id)
    };

    return <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={photoUserUrl} className={s.photoUsers}
                         alt='user'/>
                </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={isFollowingInProgress}
                                onClick={handleUnFollowing}>
                            UnFollow</button> :
                        <button disabled={isFollowingInProgress}
                                onClick={handleFollowing}>Follow</button>}

                </div>
            </span>
        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
                </span>
    </div>
}

export default User;