import style from'./Modal.module.css';
import SelectTemps from './SelectTemps'
const Modal = ({ isOpen, onClose, getTemps }) => {
    return (
        <>
            {isOpen && (
                <div className={style.modal}>
                    <div className={style.modalContainer}>
                      <span className={style.tempSpan}>Select 1 or more temperament</span>
                        <button className={style.modalClose} onClick={onClose}>
                            ×
                        </button>
                        <div className={style.modalContent}>
                            <SelectTemps getTemps={getTemps} onClose={onClose}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;