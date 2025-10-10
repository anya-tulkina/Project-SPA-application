import React, {FC} from "react";
import New from "./New/New";
import NewsFormRedux from "./NewsFormRedux";
import {NewsType} from "../../types/types";

type PropsType = {
    news: NewsType[]
    sendNewsCreator: (news: string) => void;
}
const News: FC<PropsType> = ({news, sendNewsCreator}) => {

    let addNew = (values: {addNews : string}) => {
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