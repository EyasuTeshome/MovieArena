const axios = require('axios');
const counter = require('./comment_counter');

jest.mock('axios');

axios
  .get
  .mockResolvedValue({ data: { length: 2 } });

describe('comment counter tests', () => {
  test('comments length', async () => {
    const result = await counter.commentCounter();
    expect(result).toBe(2);
  });
  test('if api was called', async () => {
    expect(axios.get).toHaveBeenCalled();
  });
  test('test if link is correct', async () => {
    expect(axios.get).toHaveBeenCalledWith('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/MYBVMigQRLz45iJjyYTt/comments?item_id=9');
  });
});