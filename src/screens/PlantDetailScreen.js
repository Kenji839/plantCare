import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { usePlants } from '../context/PlantContext';
import Calendar from '../components/Calendar';
import TaskSummary from '../components/TaskSummary';

export default function PlantDetailScreen({ route, navigation }) {
  const { plantId } = route.params;
  const { plants, getTasksForPlant, completeTask, deletePlant } = usePlants();
  const [plant, setPlant] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const foundPlant = plants.find(p => p.id === plantId);
    setPlant(foundPlant);
    if (foundPlant) {
      const plantTasks = getTasksForPlant(plantId);
      setTasks(plantTasks);
    }
  }, [plantId, plants]);

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
      Alert.alert('Success', 'Task completed!');
      // Refresh tasks
      const plantTasks = getTasksForPlant(plantId);
      setTasks(plantTasks);
    } catch (error) {
      Alert.alert('Error', 'Failed to complete task');
    }
  };

  const handleDeletePlant = () => {
    Alert.alert(
      'Delete Plant',
      `Are you sure you want to delete ${plant.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePlant(plantId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete plant');
            }
          },
        },
      ]
    );
  };

  const handleMonthChange = (delta) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTaskPress = async (task) => {
    Alert.alert(
      'Aufgabe erledigen',
      `${task.title} als erledigt markieren?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Erledigen',
          onPress: () => handleCompleteTask(task.id),
        },
      ]
    );
  };

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header with Plant Image */}
        <View style={styles.imageContainer}>
          {plant.imageUri ? (
            <Image source={{ uri: plant.imageUri }} style={styles.plantImage} />
          ) : (
            <View style={styles.plantImagePlaceholder}>
              <Text style={styles.plantImagePlaceholderText}>🌿</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={handleDeletePlant}
          >
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Calendar
            currentDate={currentMonth}
            onMonthChange={handleMonthChange}
            tasks={tasks}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </View>

        {/* Task Summary Section */}
        <TaskSummary
          tasks={tasks}
          selectedDate={selectedDate}
          onTaskPress={handleTaskPress}
        />

        {/* Plant Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.plantName}>{plant.name}</Text>
          {plant.description && (
            <Text style={styles.plantDescription}>{plant.description}</Text>
          )}
          
          {plant.scientificName && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Scientific Name:</Text>
              <Text style={styles.infoValue}>
                {Array.isArray(plant.scientificName) ? plant.scientificName.join(', ') : plant.scientificName}
              </Text>
            </View>
          )}
          
          {plant.watering && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Watering:</Text>
              <Text style={styles.infoValue}>{plant.watering}</Text>
            </View>
          )}
          
          {plant.wateringGeneralBenchmark && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Water Frequency:</Text>
              <Text style={styles.infoValue}>
                Every {plant.wateringGeneralBenchmark.value} {plant.wateringGeneralBenchmark.unit}
              </Text>
            </View>
          )}
          
          {plant.sunlight && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sunlight:</Text>
              <Text style={styles.infoValue}>
                {Array.isArray(plant.sunlight) ? plant.sunlight.join(', ') : plant.sunlight}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  plantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plantImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImagePlaceholderText: {
    fontSize: 100,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 24,
    color: '#333',
  },
  calendarSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  plantDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#999',
  },
});
