import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import NewsContainer from "./components/News/NewsContainer";
import React, {ComponentType, lazy} from "react";
import {initialiseApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {connect} from "react-redux";
import {compose} from "redux";
import {withSuspense} from "./components/hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";

//ленивая загрузка компонентов
const DialogsContainerLazy = lazy(() => import ("./components/Dialogs/DialogsContainer"));
const DialogsContainerWithHocLazy = withSuspense(DialogsContainerLazy);

type MapStateType = {
    initialized: boolean
}

type DispatchType = {
    initialiseApp: () => void;
}

type PropsType = MapStateType & DispatchType

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initialiseApp();
    }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">

                    <Routes>
                        {/*if path empty to redirect profile*/}
                        <Route path='/' element={<Navigate to='/profile'/>}/>

                        <Route path='/news' element={<NewsContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/dialogs' element={<DialogsContainerWithHocLazy/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>

                        {/* if path wrong to page 404*/}
                        <Route path='*' element={<div>404 not found</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {initialiseApp})
)
(App);