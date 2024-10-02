import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateProductStock, deleteProduct } from '../store/actions/productActions';
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Layout from '../components/Layout';
import CustomText from '../components/CustomText';
import { useFocusEffect } from '@react-navigation/native';

const colorTranslations = {
  red: 'Vermelho',
  blue: 'Azul',
  black: 'Preto',
  yellow: 'Amarelo',
  gray: 'Cinza',
};

const StockControl = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const showDialog = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedProduct(null);
  };

  const handleStockChange = async (id, stock) => {
    const parsedStock = parseInt(stock, 10);
    if (!isNaN(parsedStock)) {
      if (parsedStock === 0) {
        showDialog({ id });
      } else {
        dispatch(updateProductStock(id, parsedStock));
        try {
          const productRef = doc(db, 'products', id);
          await updateDoc(productRef, { stock: parsedStock });
          setProducts(prevProducts =>
            prevProducts.map(product =>
              product.id === id ? { ...product, stock: parsedStock } : product
            )
          );
          Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: 'Estoque atualizado com sucesso!',
          });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Falha ao atualizar o estoque.',
          });
        }
      }
    }
  };

  const incrementStock = (id, stock) => {
    handleStockChange(id, stock + 1);
  };

  const decrementStock = (id, stock) => {
    handleStockChange(id, stock - 1);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id));
      try {
        const productRef = doc(db, 'products', selectedProduct.id);
        await deleteDoc(productRef);
        setProducts(prevProducts =>
          prevProducts.filter(product => product.id !== selectedProduct.id)
        );
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Produto excluído com sucesso!',
        });
        hideDialog(); // Certifique-se de que o modal é fechado após a exclusão
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Falha ao excluir o produto.',
        });
      }
    }
  };

  const cancelDelete = () => {
    if (selectedProduct) {
      dispatch(updateProductStock(selectedProduct.id, 1));
      hideDialog();
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <CustomText style={styles.productName}>{product.name}</CustomText>
              <CustomText style={styles.productDetail}>Cor: {colorTranslations[product.color] || product.color}</CustomText>
              <CustomText style={styles.productDetail}>Tensão: {product.voltage}</CustomText>
              {product.photo && <Image source={{ uri: product.photo }} style={styles.photo} />}
              <View style={styles.stockControl}>
                <TouchableOpacity onPress={() => decrementStock(product.id, product.stock)} style={styles.stockButton}>
                  <CustomText style={styles.stockButtonText}>-</CustomText>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={product.stock.toString()}
                  onChangeText={(text) => handleStockChange(product.id, text)}
                  keyboardType="numeric"
                  placeholderTextColor="#ffffff"
                />
                <TouchableOpacity onPress={() => incrementStock(product.id, product.stock)} style={styles.stockButton}>
                  <CustomText style={styles.stockButtonText}>+</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Confirmação de Exclusão</Dialog.Title>
              <Dialog.Content>
                <Paragraph>O estoque chegou a zero. Deseja excluir o produto?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => { cancelDelete(); hideDialog(); }}>Não</Button>
                <Button onPress={() => { confirmDelete(); hideDialog(); }}>Sim</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
    width: '100%',
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderRadius: 10,
  },
  productName: {
    fontSize: 22, // Increased font size
    marginBottom: 10,
    color: '#ffffff', // White color for text
  },
  productDetail: {
    fontSize: 18, // Increased font size
    marginBottom: 5,
    color: '#ffffff', // White color for text
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  stockControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  stockButtonText: {
    color: '#ffffff',
    fontSize: 20, // Increased font size
  },
  input: {
    height: 50, // Increased height
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 15, // Increased padding
    color: '#ffffff', // White color for text
    fontSize: 18, // Increased font size
    textAlign: 'center',
    flex: 1,
  },
});

export default StockControl;