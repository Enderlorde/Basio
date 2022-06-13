import './Keyboard.css';

const Keyboard = ({children}) => {
    return (
        <ul className="calculator__keyboard keyboard" id="calculator_keyboard">
            { children }
        </ul>
    );
}

export default Keyboard;