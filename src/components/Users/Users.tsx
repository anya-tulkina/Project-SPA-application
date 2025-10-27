import React, {FC} from 'react'
import Paginator from '../Common/Pagination/Pagination'
import User from './User'
import {UserType} from '../../types/types'
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (numberPage: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onFilterChanged: (newFilter: FilterType) => void
}

let Users: FC<PropsType> = ({
                                currentPage, onPageChanged,
                                pageSize, totalUsersCount, users, onFilterChanged, ...props
                            }) => {

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
                   totalItemsCount={totalUsersCount}/>

        {users.map(u => <User key={u.id} user={u} followingIsProgress={props.followingInProgress}
                              unfollow={props.unfollow}
                              follow={props.follow}
        />)}
    </div>
}

export default Users