import { greet } from '../src';

describe('test-utils', () => {
  it('should greet', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
