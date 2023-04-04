import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import validation from "./validation";
import style from './Form.module.css';
import { postDog } from '../../redux/actions'
import SelectTemps from "./Select/SelectTemps";

export default function Form() {
    const { success, error } = useSelector(state => state);
    
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        lifeSpan: '',
        temper: [],
        image: ''
    })

    const [errors, setErrors] = useState({}); 
    
    const getTemps = (array) => {
        setInput({ ...input, temper: array });
        setErrors(validation({
            ...input, temper: array
        }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Object.entries(errors).length){ //If not errors, dispatch
            dispatch(postDog(input));
            setInput({
                name: '',
                height: '',
                weight: '',
                lifeSpan: '',
                temper: [],
                image: ''
            })
        }else{
            alert('Empty or invalid data'); //Alert user
        }
        
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        });

        setErrors(validation({
            ...input,
            [name]: value
        }));
    }

    return (
        <div className={style.formWrapper}>
            <span className={style.formTitle}>Add Dog</span>
            {
                error && alert(error)
            }
            {
                success && alert(success)
            }
            <form onSubmit={handleSubmit} className={style.form} autoComplete="off">
                
                <div className={style.wrapper}>
                    <div className={style.inputs}>
                        <label htmlFor="name" className={style.label}>Breed name</label>
                        <input type="text" name="name" value={input.name} onChange={handleInputChange} className={style.input} />
                        {errors.name ? <span className={style.formSp}>{errors.name}</span> : <span className={style.alter}></span>}
                    </div>

                    <div className={style.inputs}>
                        <label htmlFor="temper" className={style.label}>Life span in years</label>
                        <input type="text" name="lifeSpan" value={input.lifeSpan} onChange={handleInputChange} className={style.input} placeholder="Ex.: 5 - 7" />
                        {errors.lifeSpan ? <p className={style.formSp}>{errors.lifeSpan}</p> : <p className={style.alter}></p>}
                    </div>

                    <div className={style.inputs}>
                        <label htmlFor="temper" className={style.label}>URL Image</label>
                        <input type="text" name="image" value={input.image} onChange={handleInputChange} className={style.input}/>
                        {errors.image ? <p className={style.formSp}>{errors.image}</p> : <p className={style.alter}></p>}
                    </div>
                </div>
                <div className={style.wrapper}>
                    <div className={style.inputs}>
                        <label htmlFor="height" className={style.label}>Height range in cm</label>
                        <input type="text" name="height" value={input.height} onChange={handleInputChange} className={style.input} placeholder="Ex.: 30 - 60" />
                        {errors.height ? <p className={style.formSp}>{errors.height}</p> : <p className={style.alter}></p>}
                    </div>

                    <div className={style.inputs}>
                        <label htmlFor="weight" className={style.label}>Weight range in Kg</label>
                        <input type="text" name="weight" value={input.weight} onChange={handleInputChange} className={style.input} placeholder="Ex.: 3 - 8" />
                        {errors.weight ? <p className={style.formSp}>{errors.weight}</p> : <p className={style.alter}></p>}
                    </div>

                    <div className={style.inputs}>
                        <label htmlFor="temper" className={style.label}>Temper: select 1 up to 7 tempers. </label>
                        <SelectTemps getTemps={getTemps}/>
                        {errors.temper ? <p className={style.formSp}>{errors.temper}</p> : <p className={style.alter}></p>}
                    </div>
                    
                </div>
                <div className={style.formBtns}>
                    <button type="submit"  className={style.buttonDog} onClick={() => handleSubmit}>Create dog</button>
                    <Link to='/home'><button className={style.backBtn}>Back</button></Link>
                </div>
            </form>
        </div>
    )
}
