import s from './Navbar.module.css';
import FriendContainer from "./Friends/FriendContainer";
import {NavLink} from "react-router-dom";

const Navbar = () => {

    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/profile'>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/dialogs'>Message</NavLink>
            </div>
            <div className={s.item}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/users'>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/news'>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/music'>Music</NavLink>
            </div>
            <div className={`${s.item} ${s.setting}`}>
                <NavLink className={navData => navData.isActive ? s.active : s.item} to='/setting'>Setting</NavLink>
            </div>
            <div className={`${s.item} ${s.friends}`}>
                <a>Friends</a>
            </div>
            <div className={s.friendsItem}>
                <FriendContainer />
            </div>
        </nav>
    )
}

export default Navbar;