import { QuantityPipe } from './quantity.pipe';

describe('QuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
  });
});
