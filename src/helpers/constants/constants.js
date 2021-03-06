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

const multiplayAction = (a, b) => a * b;
const divisionAction = (a, b) => a / b;
const additionAction = (a, b) => a + b;
const subtractionAction = (a, b) => a - b;

const ACTIONS = {
  '*': { action: multiplayAction, priority: 2 },
  '/': { action: divisionAction, priority: 2 },
  '+': { action: additionAction, priority: 1 },
  '-': { action: subtractionAction, priority: 1 },
};

export { KEY_ARRAY, ACTIONS };
