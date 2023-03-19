import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addFavorite, deleteFavorite } from '../../redux/actions';

export default function Card(props) {

   const favorites = useSelector(state => state.favorites);
   const cards = useSelector(state => state.characters);
   const [ isFavorite, setFavorite ] = useState(false);  
   const dispatch = useDispatch();

   const checkFavs = ()=>{
      let bool = false;
      if(favorites){
         for(let f of favorites){
            if (f.id === props.id) {
               bool = true;
            }
         }
      }
      setFavorite(bool)
   }
   useEffect(() => {
      checkFavs();
      return () =>{
         checkFavs();
      }
   }, [favorites, cards]
   );

   const handleFavorite = ()=>{
      if(isFavorite){
         setFavorite(false);
         dispatch(deleteFavorite(props.id));
      }else{
         setFavorite(true);
         dispatch(addFavorite(props));
      }
   }

   let favIcon = isFavorite ? "fa-solid fa-star" : "fa-regular fa-star";

   return (
      <div className={style.card}>
         <button onClick={handleFavorite} className={style.button}>
            <i className={favIcon} style={{color: '#ffbf00'}}></i>
         </button>
         <img  src={props.image} alt="" className={style.imgCard}/>
         <Link to={`/detail/${props.id}`} style={{textDecoration: 'none'}}>
            <span className={style.name}>{props.name}</span>
         </Link>
         <span className={style.data}>
            <span>{props.species}</span>
            <span>{props.gender}</span>
         </span>
      </div>
   );
}
