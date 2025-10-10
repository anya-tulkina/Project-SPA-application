import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost : (newPostElement: string) => {
            dispatch(addPostActionCreator(newPostElement));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;