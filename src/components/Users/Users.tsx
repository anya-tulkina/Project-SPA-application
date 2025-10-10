import React, {FC} from 'react'
import Paginator from '../Common/Pagination/Pagination'
import User from './User'
import {UserType} from '../../types/types'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingIsProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({currentPage, onPageChanged,
             pageSize, totalUsersCount, users, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
                   totalItemsCount={totalUsersCount}/>

        {users.map(u => <User key={u.id} user={u} followingIsProgress={props.followingIsProgress}
                                    unfollow={props.unfollow}
                                    follow={props.follow}
        />)}
    </div>
}

export default Users