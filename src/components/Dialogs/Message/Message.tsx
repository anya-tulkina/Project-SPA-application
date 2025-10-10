import s from './../Dialogs.module.css'
import {FC} from "react";

type PropsType ={
    message: string
}

const Message: FC<PropsType> = ({message}) => {
    return <div className={s.message}>
        {message}
    </div>
}

export default Message;