import s from './Friend.module.css';

const Friend = (props) => {

    return (
        <div className={s.user}>
            <div className={s.userItem}>
                <img src={props.img}/>
            </div>
            <div className={s.userName}>
                {props.name}
            </div>
        </div>
    )
}

export default Friend;