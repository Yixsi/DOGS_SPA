import { useRef } from "react";
import style from './SearchBar.module.css';
import searchIcon from '../../img/search-java.png'

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
            <button onClick={handleSearch} className={style.buttonImg}><img src={searchIcon} alt='searchIcon'/></button>
        </div>
    );
}
