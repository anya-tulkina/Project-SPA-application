import s from './MyPosts.module.css'
import Post from "./Post/Post";
import React, {FC} from "react";
import MyPostsRedux from "./MyPostsReduxForm";
import {PostsType} from "../../../types/types";

type PropsTypes = {
    posts: PostsType[]
    addPost: (newPostElement: string) => void
}
const MyPosts: FC<PropsTypes>  = React.memo((props) => {

    let onAddPost = (values: {newPostElement: string}) => {
        props.addPost(values.newPostElement);
    };

    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likesCount} key={p.id} />);

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <MyPostsRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;