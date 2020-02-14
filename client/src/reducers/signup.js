const signupReducerDefaultState = [];

export default (state = signupReducerDefaultState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
