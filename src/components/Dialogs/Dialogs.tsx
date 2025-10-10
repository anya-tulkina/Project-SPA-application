import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React, {FC} from "react";
import AddNewMessageForm from "./DialogItem/AddNewMessageFormRedux";
import {InitialDialogsStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialDialogsStateType
    sendMessage: (newMessageBody: string) => void
}
type FormDataType = {
    newMessageBody: string
}

const Dialogs: FC<PropsType> = ({dialogsPage, sendMessage}) => {

    const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />);
    const messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);

    const addNewMessage = (values: FormDataType) => {
        sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                <div>{messagesElements} </div>
                <AddNewMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;