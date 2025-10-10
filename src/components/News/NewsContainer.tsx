import React from "react";
import {connect} from "react-redux";
import News from "./News";
import {sendNewsCreator} from "../../redux/news-reducer";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news
    }
}


export default connect(mapStateToProps, {sendNewsCreator})(News);