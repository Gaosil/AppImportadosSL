import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig';
import CustomText from './CustomText';

const colors = ['red', 'blue', 'black', 'yellow', 'pink'];
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

    let photoURL = null;
    if (photo) {
      const storage = getStorage();
      const response = await fetch(photo);
      const blob = await response.blob();
      const storageRef = ref(storage, `products/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      photoURL = await getDownloadURL(storageRef);
    }

    const product = { name, stock: parseInt(stock, 10), color, voltage, photo: photoURL };

    try {
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
      navigation.navigate('HomeScreen');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao cadastrar o produto.',
      });
    }
  };

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
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
        onChangeText={(text) => {
          if (/^\d+$/.test(text) || text === '') {
            setStock(text);
          }
        }}
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
      {photo && Platform.OS !== 'web' && <Image source={{ uri: photo }} style={styles.photo} />}
      {photo && Platform.OS === 'web' && <img src={photo} style={styles.photo} alt="Selected" />}
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
    fontSize: 22,
    marginBottom: 10,
    color: '#ffffff',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#ffffff',
    fontSize: 18,
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
    fontSize: 18,
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
    marginTop: 20,
  },
  buttonSpacer: {
    width: 20,
  },
});

export default ProductForm;