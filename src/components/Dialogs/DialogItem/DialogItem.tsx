import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {FC} from "react";

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = ({id, name}) => {

    const path = `/dialogs/${id}`

    return <div className={`${s.dialog} ${s.active}`}>
        <NavLink className={({isActive}) => isActive ? s.active : ''} to={path}>{name}</NavLink>
    </div>
}

export default DialogItem;