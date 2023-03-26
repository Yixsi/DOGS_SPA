import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { getDogs, filterByOrigin, filterByTemp, getDogByName } from '../../redux/actions';
import styles from './Home.module.css';

export default function Home() {
    const { filterDogs, dogs } = useSelector(state => state);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);
    const [dogsPage, setDogsPage] = useState(filterDogs.slice(start, end));

    const dispatch = useDispatch();

    const onSearch = name => {
        dispatch(getDogByName(name));
    };

    const handlePage = direction => {
        if (direction === 'prev' && start !== 0) {
            setStart(start - 8);
            setEnd(end - 8);
        } else if (direction === 'next' && end < filterDogs.length) {
            setStart(start + 8);
            setEnd(end + 8);
        }
    };

    const handleAll = () => {
        dispatch(getDogs());
    };

    useEffect(() => {
        setDogsPage(filterDogs.slice(start, end));
    }, [filterDogs, start, end]);

    const allPages = () => {
        const nPages = Math.ceil(filterDogs.length / 8);
        const currentPage = Math.floor(start / 8) + 1;
        let pages = [];

        for (let i = 1; i <= nPages; i++) {
            pages.push(
                <span
                    key={i}
                    onClick={() => {
                        setStart((i - 1) * 8);
                        setEnd(i * 8);
                        setDogsPage(filterDogs?.slice((i - 1) * 8, i * 8));
                    }}
                    className={currentPage === i ? styles.activePage : styles.inactivePage}
                >
                    {i}
                </span>
            );
        }
        return pages;
    }


    return (
        <>
            <div className={styles.rowOne}>
                <div className={styles.buttonGroup}>
                    <Link to="/favorites">
                        <button className={styles.buttons}>See favorites</button>
                    </Link>
                    <button className={styles.buttons}>Order</button>
                    <button className={styles.buttons}>Filter</button>
                    <button className={styles.buttons} onClick={handleAll}>
                        All
                    </button>
                </div>
                <div className={styles.searchWrapper}>
                    <SearchBar onSearch={onSearch} />
                    <Link to="/form">
                        <button className={styles.createBtn}>
                            Add new <i className="fa-solid fa-dog" style={{ color: '#fff' }} />
                        </button>
                    </Link>
                </div>
                <div>
                    <button onClick={() => handlePage('next')} className={styles.pagesButtons}>
                        <i className="fa-solid fa-circle-arrow-right" />
                    </button>
                    <button onClick={() => handlePage('prev')} className={styles.pagesButtons}>
                        <i className="fa-solid fa-circle-arrow-left" />
                    </button>
                </div>
            </div>
            <div className={styles.pages}>
                {allPages()}
            </div>
            {dogsPage && (
                <div className={styles.cards}>
                    {dogsPage.map(el => (
                        <Card 
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            weight={el.weight}
                            image={el.image}
                            idImage={el.idImage}
                            temper={el.temper}
                        />
                    ))}
                </div>
            )}
            <div className={styles.pages}>
                {allPages()}
                <hr style={{border: 'white'}}/>
            </div>
        </>
    );
}
