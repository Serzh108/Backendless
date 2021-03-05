import calc from './calc';

describe('calc', () => {
  it('should return add number', () => {
    expect(calc(['5', '+', '3'])).toEqual(8);
  });

  it('should return multiplay number', () => {
    expect(calc(['5', '*', '4'])).toEqual(20);
  });

  it('should return result complex calculations', () => {
    expect(calc(['5', '+', '4', '/', '2', '-', '2', '*', '2'])).toEqual(3);
  });
});
