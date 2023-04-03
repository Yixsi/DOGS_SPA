import { Link } from 'react-router-dom';
import logo from '../../img/LogoNeon-removebg.png';
import dog from '../../img/Dog-Sitting-PNG-HD.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs} from '../../redux/actions';
import style from './Landing.module.css';
import wave from '../../img/Wave-10s-1366px.svg'
import dogItems from '../../img/dogItemsBGTrans.png'
import bottomLeftPic from '../../img/dogItems-removebg-preview.png'


export default function Landing(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
        
    }, [])
    return(
        <>
            <img src={wave} alt="wave" className={style.wave} />

            <div className={style.logoInfo}>
                <img src={logo} alt="logo" className={style.logoLanding}/>
                <h3 className={style.logoText}>Dirty Paws</h3>
            </div>
            <h1 className={style.landingTitle}>Get to know man's<br/><span className={style.middleTitle}>best friend</span></h1>
            <div className={style.textContainer}>
                <p className={style.welcomeTxt}>Are you a dog lover and want to know more about them? You’re in the right place! On <b><i>Dirty Paws</i></b>, you can get detailed information about different dog breeds and their temperaments. Discover which breed best fits your lifestyle. Explore our site now to learn more!</p>
                <Link to='/home' className={style.link}><button className={style.landingBtn}>Home</button></Link>
            </div>
            <div>
                <img src={dog} alt="dog" className={style.dog} />
            </div>
            <img src={dogItems} alt="" className={style.dogItems} />
            <img src={dogItems} alt="" className={style.dogItems3} />
            <img src={dogItems} alt="" className={style.dogItems4} />
            <img src={bottomLeftPic} alt="" className={style.dogItems5} />
        </>
    )
}