import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './SelectTemps.module.css'

const SelectTemps = ({ getTemps }) => {
    const { tempers } = useSelector(state => state);
    const [selected, setSelected] = useState([]);
    const [names, setNames] = useState([]);

    const handleSelect = (e) => {
        const { selectedOptions } = e.target;
        const selectedIDs = Array.from(selectedOptions, option => parseInt(option.value));
        setSelected(selectedIDs);
        const namesSelected = Array.from(selectedOptions, option => option.textContent);
        setNames(namesSelected);
    };

    console.log(selected)
    useEffect(() => {
        if (selected.length > 0) {
            getTemps(selected);
        }
    }, [selected]);

    return (
        <>
            <select multiple onChange={handleSelect} value={selected}>
                {tempers.map((temper) => (
                    <option key={temper.id} value={temper.id}>
                        {temper.name}
                    </option>
                ))}
            </select>
            <div className={style.selectedNames}>
                Selected: {names.map(name => <span key={name} className={style.spanName}>{name} </span>)}
            </div>
        </>
    );
};

export default SelectTemps;
