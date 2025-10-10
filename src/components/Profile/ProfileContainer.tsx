import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {Params, useParams} from "react-router-dom";
import {compose} from "redux";
import {
    getAuth,
    getAuthUserId,
    getAuthUserProfile,
    getProfilePageStatus
} from "../../redux/profile-selectors";
import {withAuthComponent} from "../hoc/withAuthNavigator";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type RouterType = {
    params: Params<string>
}
type StatePropsType = {
    authorisedUserId: number | null
    profile: ProfileType | null
    status: string
    isAuth: boolean
}
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<void>
    savePhoto : (photo: File) => Promise<void>
}
type OwnProps = {}
type PropsType = StatePropsType & DispatchPropsType & OwnProps & RouterType;

const withTypedRouter = <P extends object>(WrappedComponent: React.ComponentType<P & RouterType>) => {
    return (props: P) => {
        const params = useParams();
        return <WrappedComponent {...props} params={params} />;
    };
};

class ProfileContainer extends React.Component<PropsType> {

    // обработчик ошибки
    catchUnhandledRejection = () => {
        alert('error occurred.');
    }

    reFreshProfile() {
        let userId: string | number | null = this.props.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId;
        }

        if (userId && !isNaN(Number(userId))) {
            this.props.getUserProfile(Number(userId));
            this.props.getStatus(Number(userId));
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

    componentDidUpdate(prevProps: PropsType) {
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

let mapStateToProps = (state: AppStateType): StatePropsType => ({
    profile: getAuthUserProfile(state),
    isAuth: getAuth(state),
    status: getProfilePageStatus(state),
    authorisedUserId: getAuthUserId(state)
})

export default compose(
    withTypedRouter,
    withAuthComponent,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})
)
(ProfileContainer);