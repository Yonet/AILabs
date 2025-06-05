import { placeholderFunction } from '../src';

describe('Scraper Core', () => {
  it('should return true from placeholderFunction', () => {
    expect(placeholderFunction()).toBe(true);
  });
});
