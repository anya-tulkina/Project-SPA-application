import s from './ProfileInfo.module.css'
import React, {useState, useEffect} from "react";

const ProfileStatusWIthHook = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status || '');

    useEffect( () => {
        setStatus(props.status || '');
    }, [props.status || '']);

    let activeEditMode = () => {
        setEditMode(true);
    }

    let deActiveEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onStatusChange = (e) => {
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
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode} value={status || ''}/>
                </div>
            }
        </>
    )
}

export default ProfileStatusWIthHook;