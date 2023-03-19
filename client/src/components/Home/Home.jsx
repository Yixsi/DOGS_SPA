import style from './Home.module.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { getDogs, filterByOrigin, filterByTemp, getDogByName } from '../../redux/actions';

import { Link } from 'react-router-dom'

export default function Home() {
    const { dogs } = useSelector(state => state);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);
    const [dogsPage, setDogsPage] = useState(dogs?.slice(start, end));
    
    const dispatch = useDispatch();

    const handlePage = (name) => {
        if (name === 'prev') {
            if (start !== 0) {
                setStart(start - 8);
                setEnd(end - 8);
                setDogsPage(dogs?.slice(start - 8, end - 8));
            } else {
                return;
            }
        } else if (name === 'next') {
            setStart(start + 8);
            setEnd(end + 8);
            setDogsPage(dogs?.slice(start + 8, end + 8));
        }
    };

    useEffect(() => {
        if (dogs.length === 0) {
            dispatch(getDogs());
        }
    }, [dispatch, dogs]);

    return (
        <>
            <div className={style.rowOne}>
                <span className={style.spanInfo}>Add your favorite dogs</span>
                <div className={style.buttonGroup}>
                    <Link to='/favorites'><button className={style.buttons}>See favorites</button></Link>
                    <button className={style.buttons}>Order</button>
                    <button className={style.buttons}>Filter</button>
                </div>
                <SearchBar/>
                <div>
                    <button onClick={() => handlePage('next')} className={style.pagesButtons}><i className="fa-solid fa-circle-arrow-right"></i></button>
                    <button onClick={() => handlePage('prev')} className={style.pagesButtons}><i className="fa-solid fa-circle-arrow-left"></i></button>
                </div>
            </div>
            <div className={style.cards}>
                {dogsPage.map((el, key) => (
                    <Card
                        key={key}
                        id={el.id}
                        name={el.name}
                        weight={el.weight}
                        image={el.image}
                    />
                ))}
            </div>
        </>
    );
}
