import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControl/FormsControl";

const maxLength = maxLengthCreator(30);

const AddNewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'}
                       validate={[required, maxLength]}
                       placeholder={'Enter New Message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddNewMessageFormRedux = reduxForm({form: 'dialogAddNewMessageForm'})(AddNewMessageForm)

export default AddNewMessageFormRedux;