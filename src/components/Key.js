import './Key.css';

const Key = ({ className, value, func}) => {
    return (
        <div className="keyboard__item">
            <button data-key="memsubstract" className={"keyboard__btn btn " + className} onClick={func()}>
                {value}
            </button>
        </div>
    );
}

export default Key;