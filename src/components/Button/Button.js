import React from 'react';
import Icon from '@mdi/react';
import { mdiBackspaceOutline } from '@mdi/js';
import styles from './Button.module.css';

function Button({ value, clickHandler }) {
  return (
    <div id={value} className={styles.btn} onClick={clickHandler}>
      <p>
        {value !== 'x' ? (
          value
        ) : (
          <Icon
            path={mdiBackspaceOutline}
            size={1}
            horizontal
            vertical
            rotate={180}
            color="#333"
          />
        )}
      </p>
    </div>
  );
}

export default Button;
