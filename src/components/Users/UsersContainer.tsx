import React, {FC, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Users from './Users'
import {follow, unfollow, requestUsers} from '../../redux/users-reducer'
import Preloader from '../Common/Preloader/Preloader'
import {
    getCurrentPage,
    getFollowingIsProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from '../../redux/users-selectors'
import {AppDispatch, AppStateType} from "../../redux/redux-store";

const UsersAPIComponent: FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: AppStateType) => getUsers(state));
    const currentPage = useSelector((state: AppStateType) => getCurrentPage(state));
    const pageSize = useSelector((state: AppStateType) => getPageSize(state));
    const isFetching = useSelector((state: AppStateType) => getIsFetching(state));
    const totalUsersCount = useSelector((state: AppStateType) => getTotalUsersCount(state));
    const followingIsProgress = useSelector((state: AppStateType) => getFollowingIsProgress(state));

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, []);

    const onPageChanged = useCallback((numberPage: number) => {
        dispatch(requestUsers(numberPage, pageSize))
    }, [pageSize, dispatch]);

    const handleFollow = useCallback((userId: number) => {
        dispatch(follow(userId))
    }, [dispatch])

    const handleUnFollow = useCallback((userId: number) => {
        dispatch(unfollow(userId))
    }, [dispatch])

        return <>
            {isFetching ? <Preloader/> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   users={users}
                   unfollow={handleUnFollow}
                   follow={handleFollow}
                   followingIsProgress={followingIsProgress}
            />
        </>
}

export default UsersAPIComponent;










