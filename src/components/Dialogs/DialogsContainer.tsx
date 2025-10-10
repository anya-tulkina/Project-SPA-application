import {sendMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";


let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const DialogsContainer = compose(
    connect(mapStateToProps, {sendMessage}),
    // withAuthComponent // если нужно
)(Dialogs);

export default DialogsContainer;