import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControl/FormsControl";

const maxLength = maxLengthCreator(10);

const MyPostsForm = (props) => {
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

const MyPostsReduxForm = reduxForm({form: 'newPostForm'})(MyPostsForm);

export default MyPostsReduxForm;