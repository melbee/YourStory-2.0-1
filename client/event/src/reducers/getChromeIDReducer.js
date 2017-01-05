const initialState = 'HELLO';

export default (state = initialState, action) => {
  console.log('inside getChromeID reducer', action);
  switch (action.type) {
    case 'GET_CHROMEID':
      return action.payload;
    default:
      return state;
  }
}
