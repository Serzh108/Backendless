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

const calc = data => {
  console.log('calc:', data);
  const digitArr = [];
  const actionArr = [];
  let dataString = data.join('');
  while (dataString.length > 0) {
    const parsedDigit = Number.parseInt(dataString, 10);
    // const parsedDigit = Number.parseFloat(dataString);
    // if (parsedDigit) digitArr.push(parsedDigit);  ?? надо ли проверку
    digitArr.push(parsedDigit);
    const numberToString = parsedDigit.toString();
    const numberLength = numberToString.length;
    console.log('operation :', dataString[numberLength]);
    if (dataString[numberLength] === '-') {
      actionArr.push('+');
      dataString = dataString.substring(numberLength);
    } else {
      dataString[numberLength] && actionArr.push(dataString[numberLength]);
      dataString = dataString.substring(numberLength + 1);
    }
    console.log(
      'parsedDigit = ',
      parsedDigit,
      ' numberToString = ',
      numberToString,
      ' numberLength = ',
      numberLength,
    );
  }
  console.log('digitArr = ', digitArr);
  console.log('actionArr = ', actionArr);

  ACTIONS_TYPE.forEach(type => makeOperation(type, actionArr, digitArr));
  return digitArr[0];
};

export default calc;
