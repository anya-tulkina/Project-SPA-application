import s from './Post.module.css'
import {FC} from "react";

type PropsType = {
    message: string
    likeCount: number
}
const Post: FC<PropsType> = (props) => {
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