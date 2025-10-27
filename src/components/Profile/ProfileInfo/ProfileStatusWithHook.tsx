import React, {useState, useEffect, FC, ChangeEvent} from "react";


type PropsType = {
    status: string | undefined
    updateStatus: (newStatus: string) => void
    isOwner: boolean
}

const ProfileStatusWIthHook: FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status || '');

    useEffect( () => {
        setStatus(props.status || '');
    }, [props.status]);

    const activeEditMode = () => {
        if(props.isOwner) setEditMode(true);
    }

    const deActiveEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <>
            {!editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activeEditMode}>{props.status || '--------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode} value={status}/>
                </div>
            }
        </>
    )
}

export default ProfileStatusWIthHook;