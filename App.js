import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 PlantCare</Text>
      <Text style={styles.subtitle}>Deine intelligente Pflanzen-App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d5f2e',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#5a8f5b',
  },
});
