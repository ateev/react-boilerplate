export default function messages(state = { message: '' }, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
