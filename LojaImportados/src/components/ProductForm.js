import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { addProduct } from '../store/actions/productActions';
import styles from '../styles/productFormStyles';

const colors = ['red', 'blue', 'black', 'yellow', 'gray'];
const voltages = ['110V', '220V'];

const ProductForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [voltage, setVoltage] = useState('');
  const [photo, setPhoto] = useState(null);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!name || !stock || !color || !voltage || !photo) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Todos os campos são obrigatórios.',
      });
      return;
    }

    const productExists = products.some(
      (product) => product.name === name && product.color === color && product.voltage === voltage
    );

    if (productExists) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não é possível cadastrar um produto já cadastrado anteriormente.',
      });
      return;
    }

    dispatch(addProduct({ name, stock: parseInt(stock, 10), color, voltage, photo }));
    setName('');
    setStock('');
    setColor('');
    setVoltage('');
    setPhoto(null);
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Produto cadastrado com sucesso!',
    });
    navigation.navigate('Início');
  };

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Estoque"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <View style={styles.colorContainer}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorCircle, { backgroundColor: c }, color === c && styles.selectedColor]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>
      <View style={styles.voltageContainer}>
        {voltages.map((v) => (
          <TouchableOpacity
            key={v}
            style={[styles.voltageButton, voltage === v && styles.selectedVoltage]}
            onPress={() => setVoltage(v)}
          >
            <Text style={styles.voltageText}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Selecionar Foto" onPress={selectPhoto} />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <Button title="Adicionar Produto" onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;