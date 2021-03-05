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
  };

  useEffect(() => {
    document.addEventListener('keypress', keyboardHandler);
    return () => {
      document.removeEventListener('keypress', keyboardHandler);
    };
  }, [keyboardHandler]);

  const clickHandler = e => {
    const currentSymbol = e.currentTarget.id;
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
      setIsResult(false);

      switch (currentSymbol) {
        // case '.':
        case '%':
          return;

        case 'x':
          const newValue = [...state];
          newValue.length = newValue.length - 1;
          setState(state.includes('ERROR') ? [] : newValue);
          return;

        case 'AC':
          setState(initialState);
          setResult(initialResult);
          setIsResult(false);
          return;

        case '=':
          if (isNaN(state[state.length - 1])) return;

          let res;
          try {
            res = calc(state);
          } catch (error) {
            alert(error.message);
          }
          res = res === undefined ? 'ERROR' : res;

          setState([`${res}`]);
          setResult(initialResult);
          setIsResult(true);
          return;

        default:
          break;
      }
      // ------------- Calculate ----------
      let ress;
      try {
        ress = calc(state);
      } catch (error) {
        alert(error.message);
      }
      ress === undefined ? setResult('ERROR') : setResult(ress);
      // ------------- /Calculate ----------

      // --- set first item if it is '-' ---
      if (state.length === 0 && !isResult) {
        currentSymbol === '-' && setState([currentSymbol]);
        return;
      }
      // --- /set first item if it is '-' ---
      // --- exit if first symbol is '-' ---
      if (state.length === 1 && state[0] === '-') {
        return;
      }
      // --- /exit if first symbol is '-' ---
      // --- replace last NaN symbol ---
      if (isNaN(state[state.length - 1])) {
        let newValue = [...state];
        newValue[newValue.length - 1] = currentSymbol;
        setState(newValue);
        // --- /replace last NaN symbol ---
      } else setState(prev => [...prev, currentSymbol]);
    } else {
      if (isResult) {
        setIsResult(false);
        setState([`${currentSymbol}`]);
      } else {
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
