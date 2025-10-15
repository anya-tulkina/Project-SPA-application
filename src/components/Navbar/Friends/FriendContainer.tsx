import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriends} from "../../../redux/sidebar-reducer";
import Friends from "./Friends";
import {AppDispatch, AppStateType} from "../../../redux/redux-store";

const FriendContainer: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const friends = useSelector((state: AppStateType) => state.sideBar.friends);

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    return <Friends friends={friends} />;
}

export default FriendContainer;