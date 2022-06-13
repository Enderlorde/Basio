import "./Display.css"

const Display = ({value, state}) => {
    return (
        <div className="display">
            <div className="display__wrapper wrapper">
                <div className="wrapper__item_top">
                    <h2>BASIO memory-8C</h2>
                    electronic calculator
                </div>

                <div className={`wrapper__item_bottom ${state?'active':'inactive'}`}>
                    {value}
                </div>
            </div>
        </div>
    )
}

export default Display;