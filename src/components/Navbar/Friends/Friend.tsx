import s from './Friend.module.css';
import {FC} from "react";

type PropsType = {
    img: string
    name: string
}
const Friend: FC<PropsType> = ({name, img}) => {

    return (
        <div className={s.user}>
            <div className={s.userItem}>
                <img src={img}/>
            </div>
            <div className={s.userName}>
                {name}
            </div>
        </div>
    )
}

export default Friend;