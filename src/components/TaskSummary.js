import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

/**
 * TaskSummary component that displays tasks grouped by date
 * @param {Array} tasks - Array of tasks with nextDueDate property
 * @param {Date} selectedDate - Currently selected date to show tasks for
 * @param {Function} onTaskPress - Callback when a task is pressed
 */
export default function TaskSummary({ tasks = [], selectedDate, onTaskPress }) {
  const getTaskIcon = (type) => {
    switch (type) {
      case 'Water':
        return '💧';
      case 'Light':
        return '☀️';
      case 'Prune':
        return '✂️';
      default:
        return '📋';
    }
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('de-DE', options);
  };

  // Filter tasks for the selected date
  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    
    return tasks.filter(task => {
      if (!task.nextDueDate) return false;
      const taskDate = new Date(task.nextDueDate);
      return (
        taskDate.getFullYear() === selectedDate.getFullYear() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getDate() === selectedDate.getDate()
      );
    });
  }, [tasks, selectedDate]);

  // Get tasks for upcoming week (for summary view)
  const upcomingTasks = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const tasksByDate = {};
    
    tasks.forEach(task => {
      if (!task.nextDueDate) return;
      const taskDate = new Date(task.nextDueDate);
      
      // Only include tasks within the next week
      if (taskDate >= now && taskDate <= nextWeek) {
        const dateKey = taskDate.toDateString();
        if (!tasksByDate[dateKey]) {
          tasksByDate[dateKey] = {
            date: taskDate,
            tasks: [],
          };
        }
        tasksByDate[dateKey].tasks.push(task);
      }
    });
    
    // Convert to array and sort by date
    return Object.values(tasksByDate).sort((a, b) => a.date - b.date);
  }, [tasks]);

  const getDaysUntilDue = (dueDate) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateLabel = (dueDate) => {
    const daysUntil = getDaysUntilDue(dueDate);
    if (daysUntil === 0) return 'Heute';
    if (daysUntil === 1) return 'Morgen';
    if (daysUntil < 0) return 'Überfällig';
    return `In ${daysUntil} Tagen`;
  };

  if (selectedDate && tasksForSelectedDate.length > 0) {
    // Show tasks for selected date
    return (
      <View style={styles.container}>
        <Text style={styles.dateHeader}>{formatDate(selectedDate)}</Text>
        {tasksForSelectedDate.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => onTaskPress && onTaskPress(task)}
          >
            <Text style={styles.taskIcon}>{getTaskIcon(task.type)}</Text>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>{task.type}</Text>
              <Text style={styles.taskSubtitle}>{task.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (upcomingTasks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTasksText}>Keine anstehenden Aufgaben</Text>
      </View>
    );
  }

  // Show upcoming tasks grouped by date
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Anstehende Aufgaben</Text>
      {upcomingTasks.map((group, index) => (
        <View key={index} style={styles.dateGroup}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>
              {group.date.toLocaleDateString('de-DE', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short' 
              })}
            </Text>
            <Text style={styles.dueDateLabel}>
              {getDueDateLabel(group.date)}
            </Text>
          </View>
          {group.tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskItem}
              onPress={() => onTaskPress && onTaskPress(task)}
            >
              <Text style={styles.taskIcon}>{getTaskIcon(task.type)}</Text>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.type}</Text>
                <Text style={styles.taskSubtitle}>{task.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  dueDateLabel: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  taskIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  taskSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  noTasksText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 20,
  },
});
