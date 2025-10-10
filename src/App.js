import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes, useParams} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import NewsContainer from "./components/News/NewsContainer";
import React, {lazy, Suspense} from "react";
import {initialiseApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {connect} from "react-redux";
import {compose} from "redux";
import {withSuspense} from "./components/hoc/withSuspense";


const DialogsContainer = lazy(() => import ("./components/Dialogs/DialogsContainer"));

export const withRouter = WrappedComponent => props => {
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

class App extends React.Component {
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
                        <Route path='/'
                               element={<Navigate to='/profile'/>}/>

                        <Route path='/news'
                               element={<NewsContainer/>}/>

                        <Route path='/login'
                               element={<Login/>}/>

                        <Route path='/dialogs'
                               element={
                                   <Suspense fallback={<Preloader/>}>
                                       <DialogsContainer/>
                                   </Suspense>
                               }/>

                        <Route path='/users'
                               element={<UsersContainer/>}/>

                        <Route path="/profile/" element={<ProfileContainer/>}>
                            <Route path=":userId" element={<ProfileContainer/>}/>
                        </Route>

                        {/* if path wrong to page 404*/}
                        <Route path='*'
                               element={<div>404 not found</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    connect(mapStateToProps, {initialiseApp})
)
(App);