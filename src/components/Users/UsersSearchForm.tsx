import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";


type PropsType = {
    onFilterChanged: (newFilter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const submit = (values: FilterType, {setSubmitting}: {
        setSubmitting: (setSubmitting: boolean) => void
    }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{term: ''}}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type='text' name='term'/>
                    {/*<Field name="friends" as="select">*/}
                    {/*    <option value="null">All</option>*/}
                    {/*    <option value="true">Friends</option>*/}
                    {/*    <option value="false">Not friends</option>*/}
                    {/*</Field>*/}
                    <button type="submit" disabled={isSubmitting}>
                        find
                    </button>
                </Form>
            )}
        </Formik>
    )
}