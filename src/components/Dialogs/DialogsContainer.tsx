import {actionsDialogs} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React, {ComponentType} from "react";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthComponent} from "../hoc/withAuthNavigator";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const DialogsContainer = compose<ComponentType>(
    connect(mapStateToProps, {sendMessage: actionsDialogs.sendMessage}),
    withAuthComponent // если нужно
)(Dialogs);

export default DialogsContainer;