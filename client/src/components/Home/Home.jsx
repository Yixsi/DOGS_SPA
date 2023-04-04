import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Buttons from './Buttons/Buttons';
import Pagination from './Pagination/Pagination';
import { getDogs, filter, order, getDogByName, getTempers, resetDogs } from '../../redux/actions';
import style from './Home.module.css';
import notFound from '../../img/notFound.png';
import logo from '../../img/favicon.png'
import dogIcon from '../../img/dog-icon-white.png'
import right from '../../img/right-arrow-blue.png'
import left from '../../img/left-arrow-blue.png'

export default function Home() {
    const { filterDogs, tempers } = useSelector(state => state);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);
    const [dogsPage, setDogsPage] = useState(filterDogs.slice(start, end));
    const [showTemperDropdown, setShowTemperDropdown] = useState(false);


    const dispatch = useDispatch();

    const onSearch = name => {
        dispatch(resetDogs())
        dispatch(getDogByName(name));
        setStart(0);
        setEnd(8);
        setDogsPage(filterDogs.slice(0, 8));

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


    // const allPages = () => {
    //     const nPages = Math.ceil(filterDogs.length / 8);
    //     const currentPage = Math.floor(start / 8) + 1;
    //     let pages = [];

    //     for (let i = 1; i <= nPages; i++) {
    //         pages.push(
    //             <span
    //                 key={i}
    //                 onClick={() => {
    //                     setStart((i - 1) * 8);
    //                     setEnd(i * 8);
    //                     setDogsPage(filterDogs?.slice((i - 1) * 8, i * 8));
    //                 }}
    //                 className={currentPage === i ? style.activePage : style.inactivePage}
    //             >
    //                 {i}
    //             </span>
    //         );
    //     }
    //     return pages;
    // }

    const nPages = Math.ceil(filterDogs.length / 8);
    const currentPage = Math.floor(start / 8) + 1;

    const handleSort = (e) => {
        const { id } = e.target;
        dispatch(order(id));
    };

    const handleFilter = (e) => {
        const { id } = e.target;
        dispatch(filter(id));
        setShowTemperDropdown(!showTemperDropdown);
        setStart(0);
        setEnd(8);
        setDogsPage(filterDogs.slice(0, 8));

    };

    const handleTemperClick = () => {
        setShowTemperDropdown(!showTemperDropdown); // toggle visibility of temper dropdown
    };

    useEffect(() => {
        dispatch(getTempers());
        setDogsPage(filterDogs.slice(start, end));
    }, [filterDogs, start, end]);



    return (
        <>
            <div className={style.rowOne}>
                <div className={style.logoBtns}>
                    <img src={logo} alt='logo' className={style.logoHome} />
                    <Buttons 
                            handleAll={handleAll}
                            handleSort={handleSort}
                            handleTemperClick={handleTemperClick}
                            handleFilter={handleFilter}
                            tempers={tempers}
                            showTemperDropdown={showTemperDropdown}
                    />
                </div>
                <div className={style.searchWrapper}>
                    <SearchBar onSearch={onSearch} />
                    <Link to="/form">
                        <button className={style.createBtn}>
                            Add <img src={dogIcon} alt='dog' />
                        </button>
                    </Link>
                </div>
            </div>
            { dogsPage.length > 0 && <div className={style.pages}>
                                    <button onClick={() => handlePage('prev')} className={style.arrowBtn}>
                                        <img src={left} alt='left' className={style.arrowInt} />
                                    </button>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={nPages}
                                        onChangePage={(pageNumber) => {
                                            setStart((pageNumber - 1) * 8);
                                            setEnd(pageNumber * 8);
                                            setDogsPage(filterDogs?.slice((pageNumber - 1) * 8, pageNumber * 8));
                                        }}
                                    />
                                    <button onClick={() => handlePage('next')} className={style.arrowBtn}>
                                        <img src={right} alt='right' className={style.arrowInt} />
                                    </button>
                                </div>
            }
            {dogsPage && (
                <div className={style.cards}>
                    {dogsPage.map(el => (
                        <Card
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            weight={el.weight}
                            image={el.image}
                            idImage={el.idImage}
                            temper={el.temper}
                            origin={el.origin}
                        />
                    ))}
                </div>
            )}
            {filterDogs.length === 0 && <div className={style.notFound}>
                <p>Oops no more results</p>
                <img src={notFound} alt='notFound' />
            </div>}
            { dogsPage.length > 0 && <div className={style.pages}>
                <button onClick={() => handlePage('prev')} className={style.arrowBtn}>
                    <img src={left} alt='left' className={style.arrowInt} />
                </button>
                <Pagination
                    currentPage={currentPage}
                    totalPages={nPages}
                    onChangePage={(pageNumber) => {
                        setStart((pageNumber - 1) * 8);
                        setEnd(pageNumber * 8);
                        setDogsPage(filterDogs?.slice((pageNumber - 1) * 8, pageNumber * 8));
                    }}
                />
                <button onClick={() => handlePage('next')} className={style.arrowBtn}>
                    <img src={right} alt='right' className={style.arrowInt} />
                </button>
            </div>}
            
        </>
    );
}
