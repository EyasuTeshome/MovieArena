const axios = require('axios');
const counter = require('./item_counter');

jest.mock('axios');

axios
  .get
  .mockResolvedValue({ data: { length: 6 } });

describe('test the count', () => {
  test('should ', async () => {
    const result = await counter.showCount();
    expect(result).toBe(6);
  });
});