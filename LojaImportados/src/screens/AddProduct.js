import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../store/actions/productActions';
import Layout from '../components/Layout';

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <ProductForm onSubmit={handleAddProduct} navigation={navigation} />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddProduct;