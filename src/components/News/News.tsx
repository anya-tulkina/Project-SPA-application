import React from "react";
import {required} from "../utils/validators/validators";
import s from "../Profile/MyPosts/MyPosts.module.css";
import New from "./New/New";
import NewsFormRedux from "./NewsFormRedux";


const News = ({news, sendNewsCreator}) => {

    let addNew = (values) => {
        sendNewsCreator(values.addNews);
    }

    if (!news) {
        return <div>Loading news...</div>;
    }

    let newsElements = news.map(p => <New news={p.news} key={p.id}/>);

    return (
        <div>
            <h2>My News</h2>
            <div>
                <NewsFormRedux onSubmit={addNew}/>
            </div>
            <div>
                {newsElements}
            </div>
        </div>
    )
}

export default News;