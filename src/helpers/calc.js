import { ACTIONS_TYPE, ACTIONS } from './constants/constants';

const makeOperation = (type, actionArr, digitArr) => {
  let multiplay = actionArr.indexOf(type);
  while (multiplay >= 0) {
    console.log(`${type} present!!! on: `, multiplay);
    const tempResult = ACTIONS[type](
      digitArr[multiplay],
      digitArr[multiplay + 1],
    );
    console.log(`${type} tempResult : `, tempResult);
    digitArr.splice(multiplay, 2, tempResult);
    console.log('digitArr : ', digitArr);
    // ------
    actionArr.splice(multiplay, 1);
    console.log(`${type} actionArr: `, actionArr);
    multiplay = actionArr.indexOf(type);
  }
  console.log(`no ${type} action!!!`);
};

const testZeroDivision = (digitArr, actionArr) => {
  if (digitArr.includes(0)) {
    const index_0 = digitArr.indexOf(0);
    console.log(`AHTUNG!!!! -> 0 presents!!! at ${index_0}`);
    if (actionArr[index_0 - 1] === '/') {
      console.log(`ERROR!!!! -> /0 presents!!!`);
      throw SyntaxError(`Devision by 0! (operation № ${index_0})`);
    }
  }
};

const calc = data => {
  console.log('calc:', data);
  const digitArr = [];
  const actionArr = [];
  let dataString = data.join('');
  while (dataString.length > 0) {
    const parsedDigit = Number.parseInt(dataString, 10);
    console.log('parsedDigit = ', parsedDigit);
    // const parsedDigit = Number.parseFloat(dataString);
    // if (parsedDigit) digitArr.push(parsedDigit);  ?? надо ли проверку
    digitArr.push(parsedDigit);
    const digitToString =
      parsedDigit === -0 ? parsedDigit.toString() + 1 : parsedDigit.toString();
    const digitLength = digitToString.length;
    console.log('operation :', dataString[digitLength]);
    if (dataString[digitLength] === '-') {
      actionArr.push('+');
      dataString = dataString.substring(digitLength);
    } else {
      dataString[digitLength] && actionArr.push(dataString[digitLength]);
      dataString = dataString.substring(digitLength + 1);
    }
    console.log(
      'parsedDigit = ',
      parsedDigit,
      ' digitToString = ',
      digitToString,
      ' digitLength = ',
      digitLength,
    );
    testZeroDivision(digitArr, actionArr);
  }
  console.log('digitArr = ', digitArr);
  console.log('actionArr = ', actionArr);

  ACTIONS_TYPE.forEach(type => makeOperation(type, actionArr, digitArr));
  return digitArr[0];
};

export default calc;
