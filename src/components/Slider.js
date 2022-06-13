import './Slider.css';

const Slider = () => {
    return (
        <li>
            <div className="keyboard__item">
                <div className="keyboard__label">
                    <span>f</span>
                    <span>5/4(2)</span>
                </div>
                <button data-key="round" className="keyboard__btn btn btn_slider active">

                </button>
            </div>
        </li>
    );
}

export default Slider;