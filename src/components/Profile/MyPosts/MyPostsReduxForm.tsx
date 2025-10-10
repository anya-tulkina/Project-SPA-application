import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControl/FormsControl";

const maxLength = maxLengthCreator(10);

type FormDataType = {
    newPostElement: string
}
const MyPostsForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostElement'}
                       validate={[required, maxLength]}
                       placeholder={'Enter new post'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const MyPostsReduxForm = reduxForm<FormDataType>({form: 'newPostForm'})(MyPostsForm);

export default MyPostsReduxForm;