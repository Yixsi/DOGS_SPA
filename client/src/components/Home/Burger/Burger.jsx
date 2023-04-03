import { useState } from 'react';
import style from './Burger.module.css';

const Burger = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <div className={style.burger} onClick={toggleMenu}>
                <span className={`${style.bar} ${isMenuOpen && style.changeBar1}`} />
                <span className={`${style.bar} ${isMenuOpen && style.changeBar2}`} />
                <span className={`${style.bar} ${isMenuOpen && style.changeBar3}`} />
            </div>
            {isMenuOpen && <div className={style.menu}>{children}</div>}
        </>
    );
};

export default Burger;