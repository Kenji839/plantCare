import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function AddPlantScreen() {
  const [plantName, setPlantName] = useState('');
  const [wateringDays, setWateringDays] = useState('');

  const handleAddPlant = () => {
    if (plantName && wateringDays) {
      console.log('Neue Pflanze hinzufügen:', { plantName, wateringDays });
      // Hier würde die Logik zum Hinzufügen einer Pflanze kommen
      // z.B. zu einem State Management System oder API
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neue Pflanze hinzufügen 🌱</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Pflanzenname</Text>
        <TextInput
          style={styles.input}
          value={plantName}
          onChangeText={setPlantName}
          placeholder="z.B. Monstera"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Gießintervall (Tage)</Text>
        <TextInput
          style={styles.input}
          value={wateringDays}
          onChangeText={setWateringDays}
          placeholder="z.B. 7"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddPlant}
        >
          <Text style={styles.buttonText}>Pflanze hinzufügen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5f2e',
    marginBottom: 30,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5f2e',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2d5f2e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
