export const initialState = {
  themeColor: 'light',
  uid: '',
  productData: [],
  loadingData: true,
};

function contextReducer(state = initialState, action) {
  console.log(action, 'action');
  switch (action.type) {
    case 'TOOGLE_THEME':
      return {
        ...state,
        themeColor: state.themeColor === 'light' ? 'dark' : 'light',
      };
    case 'SET_UID':
      return {
        ...state,
        uid: action.data,
      };
    case 'ADD_PRODUCT_DATA':
      return {
        ...state,
        productData: action.data,
      };
    case 'SET_LOADING_DATA':
      return {
        ...state,
        loadingData: action.data,
      };
    default:
      return state;
  }
}

export default contextReducer;
