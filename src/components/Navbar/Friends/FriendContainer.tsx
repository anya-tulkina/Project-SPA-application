import React from "react";
import {connect} from "react-redux";
import {getFriends} from "../../../redux/sidebar-reducer";
import Friends from "./Friends";
import {AppStateType} from "../../../redux/redux-store";
import {UserType} from "../../../types/types";
import {compose} from "redux";

type MapDispatchToPropsType = {
    getFriends: () => void
}
type MapStateToPropsType = {
    friends: UserType[]
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class FriendContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getFriends()
    }
    render() {
        return (
            <Friends friends={this.props.friends}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends: state.sideBar.friends
    }
}

export default compose(
    connect(mapStateToProps, {getFriends})
)(FriendContainer) as React.ComponentType<PropsType>;