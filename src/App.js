import { useState } from "react";
import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import Key from "./components/Key";
import Switch from './components/Switch';
import Slider from './components/Slider';

const buttons = [
  {value: 'MR', className: 'btn_func btn_blue'},
  {value: 'M-', className: 'btn_func btn_blue'},
  {value: 'M+', className: 'btn_func btn_blue'},
  {value: 'AC', className: 'btn_func btn_red'},
  {value: 'C', className: 'btn_func btn_blue'},
  {value: '&radic;', className: 'btn_func btn_blue'},
  {value: '%', className: 'btn_func btn_blue'},
  {value: '7', className: 'btn_light'},
  {value: '8', className: 'btn_light'},
  {value: '9', className: 'btn_light'},
  {value: '/', className: 'btn_dark'},
  {value: '4', className: 'btn_light'},
  {value: '5', className: 'btn_light'},
  {value: '6', className: 'btn_light'},
  {value: 'x', className: 'btn_dark'},
  {value: '1', className: 'btn_light'},
  {value: '2', className: 'btn_light'},
  {value: '3', className: 'btn_light'},
  {value: '-', className: 'btn_dark'},
  {value: '0', className: 'btn_light'},
  {value: '.', className: 'btn_light'},
  {value: '=', className: 'btn_dark'},
  {value: '+', className: 'btn_dark'},
]

const App = () => {
  let [powerState, setPowerState] = useState(true);

  return (
    <Wrapper>
        <Display value="0" state={powerState}/>
        <Keyboard>
          <Slider />
          {buttons.map((button) => {
            return (
              <Key key={button.value} value={button.value} className={button.className} />
            );
          })}
        </Keyboard>
        <Switch state={powerState} func={() => setPowerState(!powerState)}/>
    </Wrapper>
  );
}

export default App;
