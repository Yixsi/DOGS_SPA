import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addFavorite, deleteFavorite } from '../../redux/actions';
import starLine from '../../img/Star_line.png';
import startFull from '../../img/star-fav.png'

export default function Card(props) {

   const { favorites } = useSelector(state => state);
   const { filterDogs } = useSelector(state => state);
   const [isFavorite, setFavorite] = useState(false);

   const dispatch = useDispatch();

   const checkFavs = () => {
      let bool = false;
      if (favorites) {
         for (let f of favorites) {
            if (f.id === props.id) {
               bool = true;
            }
         }
      }
      setFavorite(bool)
   }
   useEffect(() => {
      checkFavs();
      return () => {
         checkFavs();
      }
   }, [favorites, filterDogs]
   );


   const handleFavorite = () => {
      if (isFavorite) {
         setFavorite(false);
         dispatch(deleteFavorite(props.id));
      } else {
         setFavorite(true);

         dispatch(addFavorite(props));
      }
   }

   const formatTemp = () => {
      let temps = '';
      for (let i = 0; i < props.temper.length; i++) {
         temps += props.temper[i].name
         if (i === props.temper.length - 1) break;
         temps += ', ';
      }
      return temps;
   }

   return (
      <div className={style.card}>
         
         <button onClick={handleFavorite} className={style.button}>
            {
               isFavorite? 
                  <img src={startFull} alt='fav' />
                  :
                  <img src={starLine} alt='fav' className={style.starLine}/>
            }
         </button>
         {
            typeof props.id === 'number' && props.idImage ?
               <img src={`https://cdn2.thedogapi.com/images/${props.idImage}.jpg`} alt="" className={style.imgCard} />
               :
               <img src={props.image} alt="" className={style.imgCard} />
         }
         <Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}>
            <span className={style.name}>{props.name}</span>
         </Link>
         <div className={style.dogData}>
            <span>{props.weight} Kg</span>
            {
               typeof props.id !== 'number' && props.temper ?
                  <div className={style.temperDog}>Temper: {formatTemp()}</div>
                  :
                  <div className={style.temperDog}>Temper: {props.temper}</div>
            }
         </div>

      </div>
   );
}
