export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
  
  export const updateProductStock = (id, stock) => ({
    type: 'UPDATE_PRODUCT_STOCK',
    payload: { id, stock },
  });
  
  export const deleteProduct = (id) => ({
    type: 'DELETE_PRODUCT',
    payload: { id },
  });