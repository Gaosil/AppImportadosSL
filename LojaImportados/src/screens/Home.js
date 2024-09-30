import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const products = useSelector((state) => state.products);

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productContainer}
          onPress={() => navigation.navigate('Controle de Estoque', { productId: product.id })}
        >
          {product.photo && <Image source={{ uri: product.photo }} style={styles.photo} />}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDetail}>Estoque: {product.stock}</Text>
          <Text style={styles.productDetail}>Cor: {product.color}</Text>
          <Text style={styles.productDetail}>Tensão: {product.voltage}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default Home;