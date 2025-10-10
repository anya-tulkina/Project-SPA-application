import React from "react";
import {reduxForm} from "redux-form";
import {creatField, Textarea} from "../Common/FormsControl/FormsControl";
import {required} from "../utils/validators/validators";

const NewsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {creatField('addNews', [required], 'Add News', Textarea)}
            </div>
            <div>
                <button>Add News</button>
            </div>
        </form>
    )
}

const NewsFormRedux = reduxForm({form: 'news'})(NewsForm);

export default NewsFormRedux;