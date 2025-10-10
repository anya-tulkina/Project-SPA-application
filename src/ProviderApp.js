import {BrowserRouter} from "react-router-dom";
import React from "react";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import App from "./App";

const ProjectReactJs = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
}

export default ProjectReactJs;