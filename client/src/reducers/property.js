const propertyReducerDefaultState = [];

export default (state = propertyReducerDefaultState, action) => {
  switch (action.type) {
    case 'PROPERTY':
      return {
        ...state,
        propertyID: action.propertyID
      };
    default:
      return state;
  }
};
