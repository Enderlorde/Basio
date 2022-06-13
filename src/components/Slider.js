import './Slider.css';

const Slider = ({state,func}) => {
    return (
        <li>
            <div className="keyboard__item">
                <div className="keyboard__label">
                    <span>f</span>
                    <span>5/4(2)</span>
                </div>
                <button data-key="round" onClick={() => func()} className={`keyboard__btn btn btn_slider ${state?'active':'inactive'}`}>

                </button>
            </div>
        </li>
    );
}

export default Slider;