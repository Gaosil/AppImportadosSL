import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomText from '../components/CustomText';
import Layout from '../components/Layout';

const Home = ({ navigation }) => {
  return (
    <Layout>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Main', { screen: 'Adicionar Produto' })}
        >
          <CustomText style={styles.menuButtonText}>Adicionar Produto</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Main', { screen: 'Controle de Estoque' })}
        >
          <CustomText style={styles.menuButtonText}>Controle de Estoque</CustomText>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 50,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    width: '90%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default Home;