import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = ({id, name}) => {

    let path = '/dialogs/' + id;

    return <div className={`${s.dialog} ${s.active}`}>
        <NavLink className={navData => navData.isActive ? s.active : s.dialogsItems} to={path}>{name}</NavLink>
    </div>
}

export default DialogItem;