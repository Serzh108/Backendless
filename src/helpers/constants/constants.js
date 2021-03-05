const KEY_ARRAY = [
  'AC',
  'x',
  '%',
  '/',
  '7',
  '8',
  '9',
  '*',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '.',
  '0',
  '=',
];

// const ACTIONS_TYPE = ['*', '/', '+', '-'];
const ACTIONS_TYPE = ['*', '/', '+'];

const multiplayAction = (a, b) => a * b;
const divisionAction = (a, b) => a / b;
const additionAction = (a, b) => a + b;
// const subtractionAction = (a, b) => a - b;

const ACTIONS = {
  '*': multiplayAction,
  '/': divisionAction,
  '+': additionAction,
  // '-': subtractionAction,
};

export { KEY_ARRAY, ACTIONS_TYPE, ACTIONS };
