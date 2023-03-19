import style from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"
// import logo from './Images/Rick-And-Morty-Logo.png'

export default function NavBar() {
    const { pathname } = useLocation();
    return (
        <div className = {pathname === '/home' ? style.charNav : style.nav}>
            <div className={style.navItems}>
                {/* <img src={logo} alt="" className={style.img} /> */}
                <ul className={style.navList}>
                    <li>
                        <NavLink to={'/home'} className={pathname === '/home' ? 'nav-item active' : 'nav-item'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/form'} className={pathname === '/form' ? 'nav-item active' : 'nav-item'}>Add Dog</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}