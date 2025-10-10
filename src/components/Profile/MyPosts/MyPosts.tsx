import s from './MyPosts.module.css'
import Post from "./Post/Post";
import React from "react";
import MyPostsRedux from "./MyPostsReduxForm";

const MyPosts = React.memo((props) => {

    let onAddPost = (values) => {
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