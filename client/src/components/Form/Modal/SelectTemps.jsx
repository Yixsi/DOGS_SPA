
import { useState } from 'react';
import { useSelector } from 'react-redux';



const MultiSelectDropdown = ({getTemps, onClose}) => {
    const { tempers } = useSelector((state) => state);
    const [selected, setSelected] = useState([]);

    const handleClick = (e) => {
        const { id } = e.target;
        const isSelected = selected.includes(parseInt(id));
        if (!isSelected) {
            setSelected([...selected, parseInt(id)]);
        } else {
            setSelected(selected.filter(item => item !== parseInt(id)));
        }
    };

    const sendTemps = () => {
        getTemps(selected);
        onClose();
    }

    return (
        <>
            {tempers &&
                tempers.map((temp) => (
                    <div key={temp.id}>
                        <input
                            type="checkbox"
                            name={temp.name}
                            id={temp.id}
                            onClick={handleClick}
                        />
                        <label htmlFor={temp.name}>{temp.name}</label>
                    </div>
                ))}
            <div className="divBtn">
                <button onClick={sendTemps}>Add tempers</button>
                <button>Ignore</button>
            </div>
        </>
    );
};

export default MultiSelectDropdown;
