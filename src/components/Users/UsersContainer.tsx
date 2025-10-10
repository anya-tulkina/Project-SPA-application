import React from 'react'
import {connect} from 'react-redux'
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
import {UserType} from "../../types/types";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type StateType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingIsProgress: Array<number>
}
type DispatchType = {
    requestUsers: (currentPage: number,pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = StateType & DispatchType

class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage,pageSize)
    }

    onPageChanged = (numberPage: number) => {
        let {pageSize} = this.props
        this.props.requestUsers(numberPage, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingIsProgress={this.props.followingIsProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): StateType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingIsProgress: getFollowingIsProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, requestUsers})
)(UsersAPIComponent) as React.ComponentType<PropsType>;










