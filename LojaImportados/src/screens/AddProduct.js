import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../store/actions/productActions';
import Layout from '../components/Layout';
import Toast from 'react-native-toast-message'; 

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    try {
      dispatch(addProduct(product));
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Produto adicionado com sucesso!',
      });
      navigation.goBack(); 
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao adicionar o produto.',
      });
    }
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