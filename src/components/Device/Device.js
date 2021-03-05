import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import calc from '../../helpers/calc';
import { KEY_ARRAY } from '../../helpers/constants/constants';
import styles from './Device.module.css';

const initialState = [];
const initialResult = 0;

function Device() {
  const [state, setState] = useState(initialState);
  const [result, setResult] = useState(initialResult);
  const [isResult, setIsResult] = useState(false);

  const keyboardHandler = e => {
    const currentKey = e.key;
    if (KEY_ARRAY.includes(currentKey)) {
      symbolHandler(currentKey);
    } else {
      return;
    }
    // console.log('key pressed :', currentKey, ' ', e);
  };

  useEffect(() => {
    // const keyboardHandler = e => {
    //   const currentKey = e.key;
    //   console.log('key pressed :', currentKey);
    //   symbolHandler(currentKey);
    // };
    // 'keypress' 'keydown'
    document.addEventListener('keypress', keyboardHandler);
    return () => {
      document.removeEventListener('keypress', keyboardHandler);
    };
  }, [keyboardHandler]);

  const clickHandler = e => {
    const currentSymbol = e.currentTarget.id;
    console.log('click:', currentSymbol);
    symbolHandler(currentSymbol);
  };

  const symbolHandler = currentSymbol => {
    if (isNaN(currentSymbol)) {
      if (state.includes('ERROR')) {
        setState(initialState);
        setResult(initialResult);
        setIsResult(false);
        return;
      }
      console.log('currentSymbol is not a number!', currentSymbol);
      console.log(
        `state = ${state} state.length = ${state.length}
           state.length - 1 = ${state[state.length - 1]}`,
      );
      setIsResult(false);
      // ------------- ??? ----------
      // const ress = calc(state);

      let ress;
      try {
        ress = calc(state);
      } catch (error) {
        alert(error.message);
      }

      console.log('!!! NEW result = ', ress);
      // setState(initialState);
      // setResult(result);
      // setState([`${ress}`]);
      ress === undefined ? setResult('ERROR') : setResult(ress);
      // ------------- /??? ----------
      switch (currentSymbol) {
        case '.':
        case '%':
          return;

        case 'x':
          const newValue = [...state];
          newValue.length = newValue.length - 1;
          setState(state.includes('ERROR') ? [] : newValue);
          return;

        case 'AC':
          console.log('"AC" pressed!!');
          setState(initialState);
          setResult(initialResult);
          setIsResult(false);
          return;

        case '=':
          if (isNaN(state[state.length - 1])) return;
          console.log('" =" pressed!!');
          let res;
          try {
            res = calc(state);
          } catch (error) {
            alert(error.message);
          }
          // let res = calc(state);
          // res = res === Infinity || res === -Infinity ? 'ERROR' : res;
          res = res === undefined ? 'ERROR' : res;
          console.log(` res after '=' : ${res}`);
          setState([`${res}`]);
          setResult(initialResult);
          setIsResult(true);
          return;

        default:
          break;
      }

      // --- first item ---
      if (state.length === 0 && !isResult) {
        currentSymbol === '-' && setState([currentSymbol]);
        return;
      }
      // --- /first item ---
      // --- first is '-' ---
      if (state.length === 1 && state[0] === '-') {
        return;
      }
      // --- first is '-' ---
      // --- replace last NaN symbol ---
      if (isNaN(state[state.length - 1])) {
        let newValue = [...state];
        console.log('newValue = ', newValue);
        newValue[newValue.length - 1] = currentSymbol;
        console.log('???? newValue = ', newValue);
        setState(newValue);
        // --- /replace last NaN symbol ---
      } else setState(prev => [...prev, currentSymbol]);
    } else {
      console.log('currentSymbol is number', currentSymbol);
      if (isResult) {
        setIsResult(false);
        setState([`${currentSymbol}`]);
      } else {
        // if (currentSymbol === '0') {
        //   console.log('0!!!!!!!!');
        // }
        setState(prev => [...prev, currentSymbol]);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <p className={styles.firstLine}>{state.join('')}</p>
        {!isResult && <p className={styles.secondLine}>{result}</p>}
      </div>
      <div className={styles.keyboard}>
        {KEY_ARRAY.map(item => (
          <Button key={item} value={item} clickHandler={clickHandler} />
        ))}
      </div>
    </div>
  );
}

export default Device;
