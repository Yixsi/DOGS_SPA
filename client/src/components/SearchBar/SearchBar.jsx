import { useRef } from "react";
import style from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {

    const inputRef = useRef(null);


    const handleSearch = () => {
        
        const value = inputRef.current.value;
        onSearch(value);
        inputRef.current.value = ''
    }

    return (
        <div className={style.searchBar}>
            <input type="text" placeholder="Search" className={style.input} ref={inputRef} />
            <button onClick={handleSearch} className={style.button}><i className="fa-solid fa-magnifying-glass-plus"></i></button>
        </div>
    );
}
