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
    {value: '&radic;', className: 'btn_func btn_blue'},
    {value: '%', className: 'btn_func btn_blue'},
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
    {value: '-', className: 'btn_dark', func: () => operatorInputHandler('substract')},
    {value: '0', className: 'btn_light', func: (e) => numberInputHandler(e)},
    {value: '.', className: 'btn_light'},
    {value: '=', className: 'btn_dark', func: () => getResult()},
    {value: '+', className: 'btn_dark', func: () => operatorInputHandler('summary')},
  ]
  

  console.log(`buffer: ${buffer}`);
  console.log(`operation: ${operation}`);
  console.log(`memory: ${memory}`);
  console.log(`result: ${result}`);

  Number.prototype.round = function(places) {
      return +(Math.round(this + "e+" + places)  + "e-" + places);
  }
  
  const runOperation = (operator) => {

    switch (operator){
        case 'difference':
            setResult(result - Number(buffer));
            break;

        case 'summary':
            setResult(result + Number(buffer));
            break;   

        case 'divide':
            setResult(result / Number(buffer));              
            break; 

        case 'multiply':
            setResult(result * Number(buffer));
            break;         
    }
  }

  const addToMemory = () => {
    setMemory(memory + +buffer);
  }

  const substractFromMemory = () => {
    setMemory(memory - +buffer); 
  }

  const readFromMemory = () => {
    setBuffer(memory);
  }

/*
  const getPercent = () => {
    switch (currentOperation){
        case 'summary':
            result = result + (result / 100 * buffer);
            currentOperation = '';
            break; 

        case 'multiply':
            result = (result / 100 * buffer);
            currentOperation = '';
            break;

        case '':
            result = buffer;
            break;
    }
    return result;
  } */

/* 
  const getRoot = () => {
      return result = Math.sqrt(getResult());
  } */

  const reset = () => {
      setResult(0);
      setOperation('');
      setBuffer('0');
      setMemory(0);
  }

 /*  const useRound = (number) => {
    if (round){
        return number.round(2);
    }else{
        let trunc = Math.trunc(number);
        let places = screenSize - String(trunc).length - 2;
        return number.round(places);
    }
  } */

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

//   const addPoint = () => {
//      const alreadyHavePoint = new RegExp(/^.*\..*/, 'g' );
//      
//      if(!alreadyHavePoint.test(buffer))
//          buffer += '.';
//  } 
  const getResult = () => {
    if (operation !== '') runOperation(operation);
    else setResult(buffer);

    setOperation('');

    setBuffer(result);
  }


  const cancel = () => {
      if(!powerState) return;
      
      setBuffer(String(buffer).slice(0,-1));
      if (buffer.length <= 1) setBuffer('0');
  }

  const operatorInputHandler = (operator) =>{
    if  (operation !== '') {
      runOperation(operation);
 
    }
    setOperation(operator);
    
  }

  const numberInputHandler = (e) => {
    if(!powerState) return;

    const number = Number(e.target.innerText);
     const onlyZero = new RegExp(/^0*$/);
      if (onlyZero.test(buffer)){
        setBuffer(number.toString());
      }else{
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
