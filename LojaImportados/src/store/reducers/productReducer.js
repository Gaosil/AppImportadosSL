const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, { ...action.payload, id: state.length + 1 }];
    case 'UPDATE_PRODUCT_STOCK':
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, stock: action.payload.stock }
          : product
      );
    case 'DELETE_PRODUCT':
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
};

export default productReducer;