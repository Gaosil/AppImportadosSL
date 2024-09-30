import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './src/store/store';
import Home from './src/screens/Home';
import AddProduct from './src/screens/AddProduct';
import StockControl from './src/screens/StockControl';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Início">
            <Drawer.Screen name="Início" component={Home} />
            <Drawer.Screen name="Adicionar Produto" component={AddProduct} />
            <Drawer.Screen name="Controle de Estoque" component={StockControl} />
          </Drawer.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    </Provider>
  );
}