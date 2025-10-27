import Profile from "./Profile";
import React, {FC, memo, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {
    getAuth,
    getAuthUserId,
    getAuthUserProfile,
    getProfilePageStatus
} from "../../redux/profile-selectors";
import {AppDispatch} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type OwnProps = {}

const ProfileContainer: FC<OwnProps> = memo(() => {

    const dispatch: AppDispatch = useDispatch();
    const params = useParams<{ userId?: string }>();
    const authorisedUserId = useSelector(getAuthUserId);
    const profile = useSelector(getAuthUserProfile);
    const status = useSelector(getProfilePageStatus);
    const isAuth = useSelector(getAuth);

    const isOwner = !params.userId;

    //обработчик ошибок
    const catchUnhandledRejection = useCallback((e: PromiseRejectionEvent) => {
        console.log('error:',  e.reason);
        alert('error occurred.');
    }, [])

   const reFreshProfile = useCallback(() => {

        let userId: number | null = null;
        if (params.userId) {
            userId = Number(params.userId);
        } else {
            userId = authorisedUserId
        }

        if (userId && !isNaN(userId)) {
            dispatch(getUserProfile(userId));
            dispatch(getStatus(userId));
        } else {
            console.warn('Invalid userId:', userId);
        }
    }, [dispatch, params.userId, authorisedUserId])

    useEffect(() => {
        reFreshProfile()
        window.addEventListener('unhandledrejection', catchUnhandledRejection)

        return () => {
            window.removeEventListener('unhandledrejection', catchUnhandledRejection);
        }
    }, []);

    useEffect(() => {
        reFreshProfile();
    }, [params.userId]);

    const handleUpdateStatus = useCallback((status: string) => {
        dispatch(updateStatus(status))
    }, [dispatch, status])

    const setSaveProfile = useCallback(async (profile: ProfileType) => {
        return await dispatch(saveProfile(profile))
    }, [dispatch])

    const setSavePhoto = useCallback( async (photo: File) => {
       return await dispatch(savePhoto(photo))
    }, [dispatch])

    if (!isAuth) return <Navigate to='/login' replace/>

        return (
            <Profile
                     profile={profile}
                     status={status}
                     updateStatus={handleUpdateStatus}
                     isOwner={isOwner}
                     savePhoto={setSavePhoto}
                     saveProfile={setSaveProfile}
            />
        )
})

export default ProfileContainer;