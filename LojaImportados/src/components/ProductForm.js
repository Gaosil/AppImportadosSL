import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CustomText from './CustomText';

const colors = ['red', 'blue', 'black', 'yellow', 'gray'];
const voltages = ['110V', '220V'];

const ProductForm = ({ onSubmit, navigation }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [voltage, setVoltage] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async () => {
    if (!name || !stock || !color || !voltage) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Todos os campos são obrigatórios, exceto a foto.',
      });
      return;
    }

    const product = { name, stock: parseInt(stock, 10), color, voltage, photo };

    try {
      console.log('Adicionando produto:', product);
      await addDoc(collection(db, 'products'), product);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Produto cadastrado com sucesso!',
      });
      onSubmit(product);
      setName('');
      setStock('');
      setColor('');
      setVoltage('');
      setPhoto(null);
      navigation.navigate('Início');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao cadastrar o produto.',
      });
    }
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
      <CustomText style={styles.label}>Nome do Produto</CustomText>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#ffffff"
      />
      <CustomText style={styles.label}>Estoque</CustomText>
      <TextInput
        style={styles.input}
        placeholder="Estoque"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        placeholderTextColor="#ffffff"
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
            <CustomText style={styles.voltageText}>{v}</CustomText>
          </TouchableOpacity>
        ))}
      </View>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <View style={styles.buttonContainer}>
        <Button title="Selecionar Foto" onPress={selectPhoto} />
        <View style={styles.buttonSpacer} />
        <Button title="Adicionar Produto" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 20,
  },
  label: {
    fontSize: 22, // Increased font size
    marginBottom: 10,
    color: '#ffffff', // White color for text
  },
  input: {
    height: 50, // Increased height
    borderColor: 'gray',
    borderBottomWidth: 1, // Only bottom border
    marginBottom: 15,
    paddingHorizontal: 15, // Increased padding
    color: '#ffffff', // White color for text
    fontSize: 18, // Increased font size
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  voltageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  voltageButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1E90FF',
  },
  selectedVoltage: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  voltageText: {
    color: '#ffffff',
    fontSize: 18, // Increased font size
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Increased margin top
  },
  buttonSpacer: {
    width: 20, // Spacer width to increase space between buttons
  },
});

export default ProductForm;