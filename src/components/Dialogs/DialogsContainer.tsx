import {actionsDialogs} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const DialogsContainer = compose(
    connect(mapStateToProps, {sendMessage: actionsDialogs.sendMessage}),
    // withAuthComponent // если нужно
)(Dialogs);

export default DialogsContainer;