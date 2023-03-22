import style from './Home.module.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDogs, filterByOrigin, filterByTemp, getDogByName, resetDogs } from '../../redux/actions';


export default function Home() {
    const { filterDogs, dogs } = useSelector(state => state);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);
    const [ dogsPage, setDogsPage] = useState(filterDogs?.slice(start, end));

    const { pathname } = useLocation();
    
    const dispatch = useDispatch();


    const onSearch = (name) => {

        const dogsByName = filterDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        
        dogsByName? setDogsPage(dogsByName) : dispatch(getDogByName(name)) && (setDogsPage(filterDogs));
    }

    const handlePage = (name) => {
        if (name === 'prev') {
            if (start !== 0) {
                setStart(start - 8);
                setEnd(end - 8);
                setDogsPage(filterDogs?.slice(start - 8, end - 8));
            } else {
                return;
            }
        } else if (name === 'next') {
            if (dogsPage?.length > 8){
                setStart(start + 8);
                setEnd(end + 8);
                setDogsPage(filterDogs?.slice(start + 8, end + 8));
            }
        }
    };

    const handleDispatch = () => setDogsPage(filterDogs?.slice(start, end));


    useEffect(() => {
        if(filterDogs.length === 0) dispatch(getDogs());

    //    resetDogs();

    }, [dogsPage]);

    return (
        <>
            <div className={style.rowOne}>
                <div className={style.buttonGroup}>
                    <Link to='/favorites'><button className={style.buttons}>See favorites</button></Link>
                    <button className={style.buttons}>Order</button>
                    <button className={style.buttons}>Filter</button>
                    <button className={style.buttons} onClick={handleDispatch}>All</button>
                </div>
                <SearchBar onSearch={onSearch}/>
                <div>
                    <button onClick={() => handlePage('next')} className={style.pagesButtons}><i className="fa-solid fa-circle-arrow-right"></i></button>
                    <button onClick={() => handlePage('prev')} className={style.pagesButtons}><i className="fa-solid fa-circle-arrow-left"></i></button>
                </div>
            </div>
            {
                dogsPage && <div className={style.cards}>
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
            }
           
        </>
    );
}
