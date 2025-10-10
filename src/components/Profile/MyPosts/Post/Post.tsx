import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://www.film.ru/sites/default/files/people/1457282-1157722.jpg'/>
            { props.message }
            <div>
            <span>like { props.likeCount }</span>
            </div>
        </div>
    )
}

export default Post;