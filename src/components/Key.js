import './Key.css';

const Key = ({ className, value, onClick }) => {
    return (
        <div className="keyboard__item">
            <button data-key="memsubstract" className={"keyboard__btn btn " + className} onClick={onClick}>
                {value}
            </button>
        </div>
    );
}

export default Key;