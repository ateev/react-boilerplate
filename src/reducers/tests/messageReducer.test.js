import messageReducer from '../messageReducer.js';
import { updateMessage } from '../../actions/messageActions.js';

describe('message reducer', () => {
  it('should return default state', () => {
    expect(messageReducer(undefined, {})).toEqual({
      message: '',
    });
  });

  it('should add a new message', () => {
    const messageAction = updateMessage('hello');
    const expectedState = {
      message: 'hello',
    };
    expect(messageReducer({}, messageAction)).toEqual(expectedState);
  });
});
