import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'
import { getDogByName } from "../../redux/actions";

export default function SearchBar() {

    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handleDispatch = (value) => {
        dispatch(getDogByName(value));

    }

    const handleSearch = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        handleDispatch(value);
        inputRef.current.value = '';
    }

    return (
        <div className={style.searchBar}>
            <input type="text" placeholder="Search" className={style.input} ref={inputRef} />
            <button onClick={handleSearch} className={style.button}><i className="fa-solid fa-magnifying-glass-plus"></i></button>
        </div>
    );
}
