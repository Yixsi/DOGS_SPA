import { useState } from "react";
import { Link } from "react-router-dom";
import validation from "./validation";
import style from './Form.module.css'

export default function Form() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })

        setErrors(validation({
            ...user,
            [name]: value
        }))
    }

    return (
        <div className={style.form}>
            <div className={style.container}>
                <span className={style.formTitle}>Add Dog</span>
                <form onSubmit={handleSubmit} className={style.form} autoComplete="off">
                    <label htmlFor="name" className={style.label}>Breed name</label>
                    <input type="text" name="name" value={user.name} onChange={handleInputChange} className={style.input} />
                    {errors.name ? <span className={style.formSp}>{errors.name}</span> : <span className={style.alter}></span>}

                    <label htmlFor="minHeight" className={style.label}>Min height</label>
                    <input type="text" name="minHeight" value={user.minHeight} onChange={handleInputChange} className={style.input} />
                    {errors.minHeight ? <p className={style.formSp}>{errors.minHeight}</p> : <p className={style.alter}></p>}

                    <label htmlFor="min-height" className={style.label}>Max height</label>
                    <input type="text" name="maxHeight" value={user.maxHeight} onChange={handleInputChange} className={style.input} />
                    {errors.maxHeight ? <p className={style.formSp}>{errors.maxHeight}</p> : <p className={style.alter}></p>}

                    <label htmlFor="temper" className={style.label}>Temperament</label>
                    <select type="text" name="temper" value={user.maxHeight} onChange={handleInputChange} className={style.input}> </select>
                    {errors.maxHeight ? <p className={style.formSp}>{errors.maxHeight}</p> : <p className={style.alter}></p>}

                    <button type="submit" className={style.buttonDog}>Get started</button>
                </form>
            </div>

            <Link to={'/home'}>
                {/* <img src={logoHome} alt="home" className={style.homeImg} /> */}
            </Link>
        </div>
    )
}