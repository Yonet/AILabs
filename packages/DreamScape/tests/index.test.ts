import { greet } from '../src';

describe('DreamScape', () => {
  it('should greet', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
