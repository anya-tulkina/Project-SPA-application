import React from "react";
import s from './Users.module.css'
import photoUrl from "../../assets/images/photo.jpg";
import {NavLink} from "react-router-dom";
import Paginator from "../Common/Pagination/Pagination";
import User from "./User";

let Users = (props) => {

    return <div>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} pageSize={props.pageSize}
                   totalItemsCount={props.totalUsersCount}/>

        {props.users.map(u => <User key={u.id} user={u} followingIsProgress={props.followingIsProgress}
                                    unfollow={props.unfollow}
                                    follow={props.follow}
        />)}
    </div>
}

export default Users;