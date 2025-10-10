import s from './Friend.module.css';
import Friend from "./Friend";
import {FC} from "react";
import {UserType} from "../../../types/types";

type PropsType = {
    friends: UserType[]
}
const Friends: FC<PropsType> = (props) => {

    let friendsElements = props.friends.map(f => <Friend name={f.name} img={f.photos.small} key={f.id}/>);

    return (
        <div className={s.user}>
            <div className={s.friendsItem}>
                {friendsElements}
            </div>
        </div>
    )
}

export default Friends;