import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {
    getAuth,
    getAuthUserId,
    getAuthUserProfile,
    getProfilePageStatus
} from "../../redux/profile-selectors";
import {withAuthComponent} from "../hoc/withAuthNavigator";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

class ProfileContainer extends React.Component {

    // обработчик ошибки
    catchUnhandledRejection = () => {
        alert('error occurred.');
    }

    reFreshProfile() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId;
        }

        if (userId && !isNaN(Number(userId))) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        } else {
            console.warn('Invalid userId:', userId);
            // Можно добавить редирект на логин или показать сообщение
        }
    }

    componentDidMount() {
        this.reFreshProfile();
        // обработчик ошибки
        window.addEventListener('unhandledrejection', this.catchUnhandledRejection)
    }

    componentWillUnmount() {
        // удаление обработчика ошибки
        window.removeEventListener('unhandledrejection', this.catchUnhandledRejection);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.reFreshProfile();
        }
    }

    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = state => ({
    profile: getAuthUserProfile(state),
    isAuth: getAuth(state),
    status: getProfilePageStatus(state),
    authorisedUserId: getAuthUserId(state)
})

export default compose(
    withRouter,
    withAuthComponent,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})
)
(ProfileContainer);