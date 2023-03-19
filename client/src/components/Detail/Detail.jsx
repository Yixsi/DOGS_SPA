import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from "../../redux/actions";
import style from './Detail.module.css'

export default function Detail() {
    const { dogDetail } = useSelector(state => state);
    const { id } = useParams();
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getDogDetail(id));

    }, []);
    const checkId = () => typeof Number(id) !== 'number';

    return (
        <div className={style.modalContainer}>
            <div className={style.modalElements}>
                <div className={style.text}>
                    <h2 className={style.name}>{dogDetail?.name}</h2>
                    <ul className={style.info}>
                        <li><b>Weight:</b> {dogDetail?.weight} Kg</li>
                        <li><b>Height:</b> {dogDetail?.height} cm</li>
                        <li><b>Temperament:</b> {dogDetail?.temper}</li>
                    </ul>
                </div>
                {checkId()? 
                    <img src={dogDetail.image} alt='' className={style.imgDetail} />
                    : <img src={`https://cdn2.thedogapi.com/images/${dogDetail.image}.jpg`} alt='' className={style.imgDetail} />
                }
                
                
            </div>
        </div>
    )
}