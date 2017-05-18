import { updateMessage } from '../messageActions.js';

describe('setMessage Actions', () => {
  describe('UPDATE_MESSAGE action', () => {
    it('should create an action to set the message', () => {
      const message = 'hello';
      const expectedAction = {
        type: 'UPDATE_MESSAGE',
        message,
      };
      expect(updateMessage(message)).toEqual(expectedAction);
    });
  });
});
