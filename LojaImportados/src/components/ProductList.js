import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ProductList = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDetail}>Stock: {item.stock}</Text>
          <Text style={styles.productDetail}>Color: {item.color}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProductList;