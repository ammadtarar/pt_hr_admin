
const signupReducerDefaultState = [];

export default (state = signupReducerDefaultState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        clientKey: action.clientKey
      };
    default:
      return state;
  }
};
