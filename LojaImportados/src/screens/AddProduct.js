import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../store/actions/productActions';

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <View style={styles.container}>
      <ProductForm onSubmit={handleAddProduct} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddProduct;