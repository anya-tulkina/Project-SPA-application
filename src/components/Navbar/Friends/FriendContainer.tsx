import React from "react";
import {connect} from "react-redux";
import {getFriends, setFriendsNavBar} from "../../../redux/sidebar-reducer";
import Friends from "./Friends";

class FriendContainer extends React.Component {
    componentDidMount() {
        this.props.getFriends()
    }
    render() {
        return (
            <Friends friends={this.props.friends}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        friends: state.sideBar.friends
    }
}

export default connect(mapStateToProps, {getFriends})(FriendContainer);