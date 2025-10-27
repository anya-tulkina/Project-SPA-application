import React, {FC, memo, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Users from './Users'
import {follow, unfollow, requestUsers, FilterType} from '../../redux/users-reducer'
import Preloader from '../Common/Preloader/Preloader'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter
} from '../../redux/users-selectors'
import {AppDispatch} from "../../redux/redux-store";

const UsersAPIComponent: FC = memo(()=> {

    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(getUsers);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize)
    const isFetching = useSelector(getIsFetching)
    const totalUsersCount = useSelector(getTotalUsersCount);
    const followingInProgress = useSelector(getFollowingInProgress);
    const userFilter = useSelector(getUsersFilter);

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, userFilter))
    }, [dispatch, currentPage, pageSize]);

    const onPageChanged = useCallback((numberPage: number) => {
        dispatch(requestUsers(numberPage, pageSize, userFilter))
    }, [pageSize, dispatch]);

    const onFilterChanged = useCallback((newFilter: FilterType) => {
        dispatch(requestUsers(1, pageSize, newFilter))
    }, [pageSize, dispatch]);

    const handleFollow = useCallback((userId: number) => {
        dispatch(follow(userId))
    }, [dispatch])

    const handleUnfollow = useCallback((userId: number) => {
        dispatch(unfollow(userId))
    }, [dispatch])

        return <>
            {isFetching ? <Preloader/> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   onFilterChanged={onFilterChanged}
                   users={users}
                   unfollow={handleUnfollow}
                   follow={handleFollow}
                   followingInProgress={followingInProgress}
            />
        </>
})

export default UsersAPIComponent;







