import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PlantCard from '../components/PlantCard';

export default function HomeScreen() {
  const plants = [
    { id: '1', name: 'Monstera', wateringSchedule: 'Alle 7 Tage' },
    { id: '2', name: 'Sukkulente', wateringSchedule: 'Alle 14 Tage' },
    { id: '3', name: 'Farn', wateringSchedule: 'Alle 3 Tage' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meine Pflanzen 🌱</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard name={item.name} wateringSchedule={item.wateringSchedule} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5f2e',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
  },
});
