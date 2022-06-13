import { useState } from 'react';
import './Switch.css';

const Switch = ({state, func}) => {
    return (
        <div className="calculator__switch switch" >
            <div className="switch__wrapper">
                <div className={`switch__slider slider ${state?'active':'inactive'}`} onClick={() => func()} >
                    
                </div>
            </div>
        </div>
    );
}

export default Switch;