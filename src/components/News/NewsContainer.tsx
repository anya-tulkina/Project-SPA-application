import React from "react";
import {connect} from "react-redux";
import News from "./News";
import {sendNewsCreator} from "../../redux/news-reducer";

let mapStateToProps = (state) => {
    return {
        news: state.newsPage.news
    }
}


export default connect(mapStateToProps, {sendNewsCreator})(News);