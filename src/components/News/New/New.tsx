import React, {FC} from "react";
import style from "./New.module.css";

type PropsType = {
    news: string
}
const New: FC<PropsType> = ({news}) => {

    return (
        <div className={style.news}>
            <img src='https://www.film.ru/sites/default/files/people/1457282-1157722.jpg'/>
            {news}
        </div>
    )

}

export default New;