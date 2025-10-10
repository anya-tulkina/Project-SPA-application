import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {creatField, Textarea} from "../Common/FormsControl/FormsControl";
import {required} from "../utils/validators/validators";

type FormDataType = {
    addNews: string
}
const NewsForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {creatField('addNews', [required], 'Add News', Textarea)}
            </div>
            <div>
                <button>Add News</button>
            </div>
        </form>
    )
}

const NewsFormRedux = reduxForm<FormDataType>({form: 'news'})(NewsForm);

export default NewsFormRedux;