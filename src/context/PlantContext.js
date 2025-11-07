import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService } from '../services/storageService';

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [loadedPlants, loadedTasks] = await Promise.all([
        storageService.getPlants(),
        storageService.getTasks(),
      ]);
      setPlants(loadedPlants);
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (plantData) => {
    try {
      const newPlant = await storageService.addPlant(plantData);
      setPlants(prev => [...prev, newPlant]);
      
      // Create default water task for the plant
      if (plantData.wateringGeneralBenchmark) {
        const waterTask = {
          plantId: newPlant.id,
          type: 'Water',
          title: `Water ${plantData.name}`,
          repeatInterval: {
            value: parseInt(plantData.wateringGeneralBenchmark.value.split('-')[0]) || 7,
            unit: 'days',
          },
          nextDueDate: new Date(Date.now() + (parseInt(plantData.wateringGeneralBenchmark.value.split('-')[0]) || 7) * 24 * 60 * 60 * 1000).toISOString(),
        };
        await addTask(waterTask);
      }
      
      return newPlant;
    } catch (error) {
      console.error('Error adding plant:', error);
      throw error;
    }
  };

  const updatePlant = async (id, updates) => {
    try {
      await storageService.updatePlant(id, updates);
      setPlants(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    } catch (error) {
      console.error('Error updating plant:', error);
      throw error;
    }
  };

  const deletePlant = async (id) => {
    try {
      await storageService.deletePlant(id);
      setPlants(prev => prev.filter(p => p.id !== id));
      setTasks(prev => prev.filter(t => t.plantId !== id));
    } catch (error) {
      console.error('Error deleting plant:', error);
      throw error;
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await storageService.addTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await storageService.updateTask(id, updates);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const completeTask = async (taskId) => {
    try {
      await storageService.completeTask(taskId);
      // Reload tasks to get updated data
      const updatedTasks = await storageService.getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  };

  const getTasksForPlant = (plantId) => {
    return tasks.filter(t => t.plantId === plantId);
  };

  const getUpcomingTasks = () => {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    return tasks
      .filter(t => {
        if (!t.nextDueDate) return false;
        const dueDate = new Date(t.nextDueDate);
        return dueDate <= threeDaysFromNow;
      })
      .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate));
  };

  const value = {
    plants,
    tasks,
    loading,
    addPlant,
    updatePlant,
    deletePlant,
    addTask,
    updateTask,
    completeTask,
    getTasksForPlant,
    getUpcomingTasks,
    refreshData: loadData,
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};
