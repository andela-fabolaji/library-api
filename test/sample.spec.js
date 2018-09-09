import { expect } from 'chai';
import addFn from '../src/testFn';

describe('Add Function', () => {
  it('should return an addition', () => {
    const res = addFn(5, 6);
    console.log(res);
    expect(res).to.equal(11);
  });
});