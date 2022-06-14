import { useState } from "react";
import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import Key from "./components/Key";
import Switch from './components/Switch';
import Slider from './components/Slider';

const App = ({screenSize}) => {
  let [powerState, setPowerState] = useState(false);
  let [roundState, setRoundState] = useState(false);
  let [buffer, setBuffer] = useState('0');
  let [result, setResult] = useState(0); 
  let [operation, setOperation] = useState('');
  let [memory, setMemory] = useState(0);
  let [output, setoutput] = useState(0);

  const buttons = [
    {value: 'MR', className: 'btn_func btn_blue', func: () => readFromMemory()},
    {value: 'M-', className: 'btn_func btn_blue', func: () => substractFromMemory()},
    {value: 'M+', className: 'btn_func btn_blue', func: () => addToMemory()},
    {value: 'AC', className: 'btn_func btn_red', func: () => reset()},
    {value: 'C', className: 'btn_func btn_blue', func: () => cancel()},
    {value: '&radic;', className: 'btn_func btn_blue', func: () => getRoot()},
    {value: '%', className: 'btn_func btn_blue', func: () => getPercent()},
    {value: '7', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '8', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '9', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '/', className: 'btn_dark', func: () => operatorInputHandler('divide')},
    {value: '4', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '5', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '6', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: 'x', className: 'btn_dark', func: () => operatorInputHandler('multiply')},
    {value: '1', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '2', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '3', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '-', className: 'btn_dark', func: () => operatorInputHandler('difference')},
    {value: '0', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '.', className: 'btn_light', func: () => addPoint()},
    {value: '=', className: 'btn_dark', func: () => getResult()},
    {value: '+', className: 'btn_dark', func: () => operatorInputHandler('summary')},
  ]
  
  console.log(`-----------------------RERENDER------------`);
  console.log(`buffer: ${buffer}`);
  console.log(`operation: ${operation}`);
  console.log(`memory: ${memory}`);
  console.log(`result: ${result}`);

  Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];
  
    var z = '',
      sign = this < 0 ? '-' : '',
      str = data[0].replace('.', ''),
      mag = Number(data[1]) + 1;
  
    if (mag < 0) {
      z = sign + '0.';
      while (mag++) z += '0';
      return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
  }

  Number.prototype.round = function(places) {
        return Number(Math.round(this.noExponents() + "e+" + places)  + "e-" + places).noExponents();
  }
  
  const runOperation = (operator) => {
    switch (operator){
        case 'difference':
            return Number(result) - Number(buffer);
            break;

        case 'summary':
            return Number(result) + Number(buffer);
            break;   

        case 'divide':
            return Number(result) / Number(buffer);              
            break; 

        case 'multiply':
            return Number(result) * Number(buffer);
            break;         
    }
  }

  const addToMemory = () => {
    if(!powerState) return;

    setMemory(memory + +buffer);
  }

  const substractFromMemory = () => {
    if(!powerState) return;

    setMemory(memory - +buffer); 
  }

  const readFromMemory = () => {
    if(!powerState) return;

    setBuffer(memory);
  }


  const getPercent = () => {
    switch (operation){
        case 'summary':
            setBuffer(result + (result / 100 * buffer));
            setOperation = '';
            break; 

        case 'multiply':
            setBuffer(result / 100 * buffer);
            operation = '';
            break;

        case '':
            break;
    }
  } 


  const getRoot = () => {
    if  (operation !== '') {
      setBuffer(getRound(Math.sqrt(runOperation(operation))));
    }else{
      setBuffer(getRound(Math.sqrt(buffer)));
    }
    setOperation('');
  }

  const reset = () => {
    if(!powerState) return;

      setResult(0);
      setOperation('');
      setBuffer('0');
      setMemory(0);
  }

  const getRound = (number) => {
    number = Number(number);
    if (roundState){
        return number.round(2);
    }else{
        let trunc = Math.trunc(number);
        let places = screenSize - String(trunc).length - 2;
        return number.round(places);
    }
  } 

/*   const useResult = (operation) => {
      let result;
      setBuffer(buffer);
      switch (operation){
          case 'root':
              result = this.useRound(getRoot());
              break;
          case 'percent':
              result = this.useRound(getPercent());
              break;
          case 'result':
              result = this.useRound(getResult());
              break;
      }
      setBuffer(String(result));
  }  */

/*   const runOperator = (operation) => {
      const onlyZero = new RegExp(/^0*$/);
      if (onlyZero.test(buffer) && operation === 'difference')
          buffer = '-';
      else{
          setBuffer(parseFloat(buffer));
          setOperation(operation);
          buffer = '0';
          
          screenText = this.useRound(getRes());
      }
  }  */

  const addPoint = () => {
   const alreadyHavePoint = new RegExp(/^.*\..*/, 'g' );
     
    if(!alreadyHavePoint.test(buffer))
      setBuffer(buffer + '.');
  } 

  const getResult = () => {
    if(!powerState) return;

    if  (operation !== '') {
      let rawResult = getRound(runOperation(operation));
      if (isNaN(rawResult))
        setBuffer('Error');
      else
        setBuffer(rawResult);
    }
    setOperation('');
  }


  const cancel = () => {
      if(!powerState) return;
      
      setBuffer(String(buffer).slice(0,-1));
      if (buffer.length <= 1 || isNaN(Number(buffer))) setBuffer('0');
  }

  const operatorInputHandler = (operator) =>{
    if(!powerState) return;

    if  (operation !== '') {
      setResult(runOperation(operation));
    }else{
      setResult(Number(buffer));
    }
    setOperation(operator);
    
    setBuffer('0');
  }

  const numberInputHandler = (e) => {
    if(!powerState) return;

    const number = Number(e.target.innerText);
     const onlyZero = new RegExp(/^0*$/);
      if (onlyZero.test(buffer)){
        setBuffer(number.toString());
      }else if(buffer.length < screenSize){
        setBuffer(buffer + number.toString());
      }
  }

  return (
    <Wrapper>
        <Display value={buffer} state={powerState}/>
        <Keyboard>
          <Slider state={roundState} func={() => setRoundState(!roundState)}/>
          {buttons.map((button) => {
            return (
              <Key key={button.value} value={button.value} className={button.className} func={() => button.func} />
            );
          })}
        </Keyboard>
        <Switch state={powerState} func={() => setPowerState(!powerState)}/>
    </Wrapper>
  );
}

export default App;
