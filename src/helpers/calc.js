import { ACTIONS } from './constants/constants';

const makeOperation = (type, actionArr, digitArr) => {
  let multiplay = actionArr.indexOf(type);
  const tempResult = ACTIONS[type].action(
    digitArr[multiplay],
    digitArr[multiplay + 1],
  );
  digitArr.splice(multiplay, 2, tempResult);
  actionArr.splice(multiplay, 1);
};

const newProcessing = (actionArr, digitArr) => {
  while (actionArr.length > 0) {
    const firstOperation = actionArr[0];
    let nextOperation = actionArr[1];
    if (!nextOperation) {
      nextOperation = firstOperation;
    }

    const currentOperation =
      ACTIONS[firstOperation].priority >= ACTIONS[nextOperation].priority
        ? firstOperation
        : nextOperation;

    makeOperation(currentOperation, actionArr, digitArr);
  }
};

const testZeroDivision = (digitArr, actionArr) => {
  if (digitArr.includes(0)) {
    const index_0 = digitArr.indexOf(0);
    if (actionArr[index_0 - 1] === '/') {
      throw SyntaxError(`Devision by 0! (operation № ${index_0})`);
    }
  }
};

const calc = data => {
  const digitArr = [];
  const actionArr = [];
  let dataString = data.join('');
  while (dataString.length > 0) {
    // const parsedDigit = Number.parseInt(dataString, 10);
    const parsedDigit = Number.parseFloat(dataString);

    if (!isNaN(parsedDigit)) {
      digitArr.push(parsedDigit);
    } else {
      return;
    }
    const digitToString = parsedDigit.toString();
    const digitLength =
      parsedDigit === 0 && dataString[0] === '-'
        ? digitToString.length + 1
        : digitToString.length;

    if (dataString[digitLength] === '-') {
      actionArr.push('+');
      dataString = dataString.substring(digitLength);
    } else {
      dataString[digitLength] && actionArr.push(dataString[digitLength]);
      dataString = dataString.substring(digitLength + 1);
    }

    testZeroDivision(digitArr, actionArr);
  }

  newProcessing(actionArr, digitArr);

  return digitArr[0];
};

export default calc;
