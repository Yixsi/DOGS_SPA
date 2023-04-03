import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Buttons.css';

const Buttons = ({ handleAll, handleSort, handleTemperClick, handleFilter, tempers, showTemperDropdown }) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const showMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleResize = () => {
        if (window.innerWidth <= 760) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Regular Buttons */}
            <div className="buttonGroup regular-buttons">
                <Link to="/favorites" className="buttons">
                    Favorites
                </Link>
                <div className="dropdown">
                    <span className="buttons">Order</span>
                    <div className="dropdownContent">
                        <p className="option" id='az' onClick={handleSort}>A - Z</p>
                        <p className="option" id='za' onClick={handleSort}>Z - A</p>
                        <p className="option" id='light' onClick={handleSort}>Lighter</p>
                        <p className="option" id='heavy' onClick={handleSort}>Heavier</p>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="buttons">Filter</span>
                    <div className="dropdownContent">
                        <p className="option" onMouseOver={handleTemperClick}>Temper</p>
                        {showTemperDropdown && (
                            <div className="dropdownInnerContent">
                                {tempers && tempers.map(temper =>
                                    (<p key={temper.id} id={temper.name} onClick={handleFilter} className="optionInner">{temper.name}</p>)
                                )}
                            </div>
                        )}
                        <p className="option" id='db' onClick={handleFilter}>Origin: DB</p>
                        <p className="option" id='api' onClick={handleFilter}>Origin: API</p>
                    </div>
                </div>
                <button className="buttons" onClick={handleAll}>All</button>
            </div>

            {/* Burger Menu */}
            <div className="buttonGroup burger-menu">
                <button className="buttons" onClick={showMenu}>
                    <i className="fa fa-bars"></i>
                </button>
                {menuOpen && (
                    <div className="burger-dropdown">
                        <Link to="/favorites" className="buttons">
                            Favorites
                        </Link>
                        <div className="dropdown">
                            <span className="buttons">Order</span>
                            <div className="dropdownContent">
                                <p className="option" id='az' onClick={handleSort}>A - Z</p>
                                <p className="option" id='za' onClick={handleSort}>Z - A</p>
                                <p className="option" id='light' onClick={handleSort}>Lighter</p>
                                <p className="option" id='heavy' onClick={handleSort}>Heavier</p>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span className="buttons">Filter</span>
                            <div className="dropdownContent">
                                <p className="option" onMouseOver={handleTemperClick}>Temper</p>
                                {showTemperDropdown && (
                                    <div className="dropdownInnerContent">
                                        {tempers && tempers.map(temper =>
                                            (<p key={temper.id} id={temper.name} onClick={handleFilter} className="optionInner">{temper.name}</p>)
                                            )}
                                        </div>
                                    )}
                                <p className="option" id='db' onClick={handleFilter}>Origin: DB</p>
                                <p className="option" id='api' onClick={handleFilter}>Origin: API</p>
                            </div>
                        </div>
                        <span className="buttons" onClick={handleAll}>All</span>
                    </div>
                    )}
                </div> 
        </>
    )
}

export default Buttons;

