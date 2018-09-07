import { expect } from 'chai';
const addFn = (a, b) => {
  return a + b;
};

describe('Add Function', () => {
  it('should return an addition', () => {
    const res = addFn(5, 6);
    expect(res).to.equal(11);
  });
});