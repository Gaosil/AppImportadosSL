import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#ffffff',
  },
});

export default Layout;