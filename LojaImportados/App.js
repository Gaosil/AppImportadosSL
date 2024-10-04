import React from 'react';
import { ActivityIndicator } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useFonts, Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import store from './src/store/store';
import Home from './src/screens/Home';
import AddProduct from './src/screens/AddProduct';
import StockControl from './src/screens/StockControl';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="AddProductScreen" component={AddProduct} />
    <Stack.Screen name="StockControlScreen" component={StockControl} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1E90FF',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontFamily: 'Fredoka_400Regular',
      },
    }}
  >
    <Drawer.Screen name="HomeScreen" component={Home} options={{ title: 'Início' }} />
    <Drawer.Screen name="AddProductScreen" component={AddProduct} options={{ title: 'Adicionar Produto' }} />
    <Drawer.Screen name="StockControlScreen" component={StockControl} options={{ title: 'Controle de Estoque' }} />
  </Drawer.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;