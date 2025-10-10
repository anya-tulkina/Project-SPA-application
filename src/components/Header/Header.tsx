import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img
                src='https://media.istockphoto.com/id/914972678/ru/векторная/злой-лев-монохромный-логотип.jpg?s=612x612&w=0&k=20&c=rCq_URyUcet2jOLG3-v7Vrnijv0F-3JQ06-_dJyqxJI='/>
            <div className={s.loginAuth}>
                {props.isAuth ? <div>{props.login}  <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}><button>LOGIN</button></NavLink> }
            </div>
        </header>
    )
}

export default Header;