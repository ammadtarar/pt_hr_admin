const authReducerDefaultState = []

export default (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loginStatus: true
      };
    case 'LOGOUT':
      return {
        ...state,
        loginStatus: false
      };
    default:
      return state;
  }
}
