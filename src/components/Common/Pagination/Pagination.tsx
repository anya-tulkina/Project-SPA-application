import React, {FC, useState} from 'react';
import style from './Pagination.module.css'
import cl from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged,
                     portionSize = 10}) => {

    //Считаем сколько пользователей вкладок с юзерами на странице
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    // Создаем массив страниц юзеров
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorderPage = (portionNumber - 1) * portionSize + 1;
    let rightBorderPage = portionNumber * portionSize;

    return <div className={style.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>
        }
        {pages
            .filter(p => p >= leftBorderPage && p <= rightBorderPage)
            .map(p => {
                return <span
                    key={p.id}
                    className={cl({[style.selectedPage]: currentPage === p}, style.pageNumber)}/*присваеваем класс выбранной странице*/
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>
        }
    </div>
}

export default Paginator;