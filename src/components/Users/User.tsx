import React from "react";
import s from './Users.module.css'
import photoUrl from "../../assets/images/photo.jpg";
import {NavLink} from "react-router-dom";

let User = ({user, followingIsProgress, unfollow, follow}) => {

    return <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : photoUrl} className={s.photoUsers}
                         alt='user'/>
                </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followingIsProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>
                            UnFollow</button> :
                        <button disabled={followingIsProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id);
                                }}>Follow</button>}

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