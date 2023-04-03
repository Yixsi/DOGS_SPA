import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail, resetDetail } from "../../redux/actions";
import style from './Detail.module.css'

export default function Detail() {
    const { dogDetail } = useSelector(state => state);
    const { id } = useParams();
    const dispatch = useDispatch();

    const formatTemp = () => {
        let temps = '';
        for (let i = 0; i < dogDetail.tempers.length; i++) {
            temps += dogDetail.tempers[i].name
            if (i === dogDetail.tempers.length - 1) break;
            temps += ', ';
        }
        return temps;
    }

    useEffect(() => {
        dispatch(getDogDetail(id));
        return () => {
            dispatch(resetDetail()); // Reset dogDetail state to null
        };
    }, []);

    const checkId = () => typeof id !== 'number';

    return (
        <>
            <div className={style.modalElements}>
                <div className={style.text}>
                    <h2 className={style.name}>{dogDetail?.name}</h2>
                    <ul className={style.info}>
                        <li><b>Weight:</b> {dogDetail?.weight} Kg</li>
                        <li><b>Height:</b> {dogDetail?.height} cm</li>
                        {
                            typeof dogDetail.id !== 'number' && dogDetail.tempers ?
                                <li><b>Temper:</b> {formatTemp()}</li>
                                :
                                <li><b>Temper:</b> {dogDetail.temper}</li>
                        }
                    </ul>
                </div>
                <div>
                    {checkId() && dogDetail.image ?
                        <img src={dogDetail?.image} alt='' className={style.imgDetail} />
                        : <img src={`https://cdn2.thedogapi.com/images/${dogDetail?.idImage}.jpg`} alt='' className={style.imgDetail} />
                    }
                </div>
            </div>
        </>
    )
}