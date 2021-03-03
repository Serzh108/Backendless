import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './Device.module.css';

const KEY_ARRAY = [
  'AC',
  'x',
  '%',
  '/',
  7,
  8,
  9,
  '*',
  4,
  5,
  6,
  '-',
  1,
  2,
  3,
  '+',
  '.',
  0,
  '=',
];

const initialState = [];
const initialResult = 0;

function Device() {
  const [state, setState] = useState(initialState);
  const [result, setResult] = useState(initialResult);

  const clickHandler = e => {
    const x = e.currentTarget.id;
    console.log('click', x);
    if (isNaN(x)) {
      console.log('x is not a number!', x);
      console.log(
        `state = ${state}   state.length = ${
          state.length
        }   state.length - 1 = ${state[state.length - 1]}`,
      );
      // --- first item ---
      if (state[0] === '') {
        return;
      }
      // --- /first item ---
      // --- del last ---
      if (x === 'x') {
        const newValue = [...state];
        newValue.length = newValue.length - 1;
        setState(newValue);
        return;
      }
      // --- /del last ---
      // --- clear ---
      if (x === 'AC') {
        setState(initialState);
        return;
      }
      // --- /clear ---
      // --- calc ---
      if (x === '=') {
        console.log('" =" pressed!!');
        calc(state);
        return;
      }
      // --- /calc ---
      if (isNaN(state[state.length - 1])) {
        let newValue = [...state];
        console.log('newValue = ', newValue);
        newValue[newValue.length - 1] = x;
        console.log('???? newValue = ', newValue);
        // newValue.length = newValue.length - 1;
        // console.log('2!!  newValue = ', newValue);
        // console.log(
        //   '2.5 +++!!  newValue[newValue.length - 1] = ',
        //   newValue[newValue.length - 1],
        // );
        // // newValue = [...newValue, x];
        // newValue.push(x);
        // console.log('3!!!!  newValue = ', newValue);
        setState(newValue);
      } else setState(prev => [...prev, x]);
    } else {
      console.log('x is number', x);
      setState(prev => [...prev, x]);
    }
  };

  const calc = data => {
    console.log('calc:', data);
    setResult(93);
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <p className={styles.firstLine}>{state.join('')}</p>
        <p className={styles.secondLine}>{result}</p>
      </div>
      <div className={styles.keyboard}>
        {KEY_ARRAY.map((item, idx) => (
          <Button key={item} value={item} clickHandler={clickHandler} />
        ))}
      </div>
    </div>
  );
}

export default Device;
