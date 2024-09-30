import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductStock, deleteProduct } from '../store/actions/productActions';
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';
import styles from '../styles/stockControlStyles';

const StockControl = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showDialog = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedProduct(null);
  };

  const handleStockChange = (id, stock) => {
    const parsedStock = parseInt(stock, 10);
    if (!isNaN(parsedStock)) {
      if (parsedStock === 0) {
        showDialog({ id });
      } else {
        dispatch(updateProductStock(id, parsedStock));
      }
    }
  };

  const incrementStock = (id, stock) => {
    handleStockChange(id, stock + 1);
  };

  const decrementStock = (id, stock) => {
    handleStockChange(id, stock - 1);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id));
      hideDialog();
    }
  };

  const cancelDelete = () => {
    if (selectedProduct) {
      dispatch(updateProductStock(selectedProduct.id, 1));
      hideDialog();
    }
  };

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDetail}>Cor: {product.color}</Text>
          <Text style={styles.productDetail}>Tensão: {product.voltage}</Text>
          {product.photo && <Image source={{ uri: product.photo }} style={styles.photo} />}
          <View style={styles.stockControl}>
            <TouchableOpacity onPress={() => decrementStock(product.id, product.stock)} style={styles.stockButton}>
              <Text style={styles.stockButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={product.stock.toString()}
              onChangeText={(text) => handleStockChange(product.id, text)}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => incrementStock(product.id, product.stock)} style={styles.stockButton}>
              <Text style={styles.stockButtonText}>+</Text>
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
            <Button onPress={cancelDelete}>Não</Button>
            <Button onPress={confirmDelete}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default StockControl;