import s from './Friend.module.css';
import Friend from "./Friend";

const Friends = (props) => {

    let friendsElements = props.friends.map(f => <Friend name={f.name} img={f.photos.small} key={f.id}/>);

    return (
        <div className={s.user}>
            <div className={s.friendsItem}>
                {friendsElements}
            </div>
            <Friend />
        </div>
    )
}

export default Friends;