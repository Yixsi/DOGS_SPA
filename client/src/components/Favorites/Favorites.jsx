import { useSelector } from "react-redux"
import style from './Favorites.module.css'
import Card from "../Card/Card"

export default function Favorites() {

    const { favorites } = useSelector(state => state)
    return (
        <> 
            {(favorites.length > 0) ?
                <div className={style.favorites}>{
                favorites.map(el => {
                    return (
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
                    )
                })}
                </div>
                : <p className={style.noFavs}>Oops! no favorites yet. Add your favorites dogs!</p>
            }
        </>
    )

}