const popupReducerDefaultState = [];

export default (state = popupReducerDefaultState, action) => {
  switch (action.type) {
    case 'POPUP':
      return {
        ...state,
        popupData: action.popupData
      };
    default:
      return state;
  }
};
