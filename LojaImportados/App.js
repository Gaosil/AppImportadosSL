import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useFonts, Fredoka_400Regular } from '@expo-google-fonts/fredoka';
import AppLoading from 'expo-app-loading';
import store from './src/store/store';
import Home from './src/screens/Home';
import AddProduct from './src/screens/AddProduct';
import StockControl from './src/screens/StockControl';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Início"
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
    <Drawer.Screen name="Adicionar Produto" component={AddProduct} />
    <Drawer.Screen name="Controle de Estoque" component={StockControl} />
  </Drawer.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
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
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    </Provider>
  );
};

export default App;

