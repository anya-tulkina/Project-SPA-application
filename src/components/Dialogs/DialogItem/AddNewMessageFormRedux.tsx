import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControl/FormsControl";

const maxLength = maxLengthCreator(30)

type FormDataType = {
    newMessageBody: string
}

const AddNewMessageForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
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

export default reduxForm<FormDataType>({form: 'dialogAddNewMessageForm'})(AddNewMessageForm);