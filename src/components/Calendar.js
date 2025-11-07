import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

/**
 * Calendar component that displays a monthly calendar with task indicators
 * @param {Date} currentDate - The current month to display
 * @param {Function} onMonthChange - Callback when month changes (delta: -1 or +1)
 * @param {Array} tasks - Array of tasks with nextDueDate property
 * @param {Date} selectedDate - Currently selected date
 * @param {Function} onDateSelect - Callback when a date is selected
 */
const CALENDAR_GRID_SIZE = 42; // 6 rows * 7 days

export default function Calendar({ 
  currentDate, 
  onMonthChange, 
  tasks = [], 
  selectedDate,
  onDateSelect 
}) {
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  // Calculate calendar days for the current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1);
    // Convert from JavaScript's Sunday-first (0=Sun, 1=Mon, ..., 6=Sat) 
    // to Monday-first indexing (0=Mon, 1=Tue, ..., 6=Sun) for German calendar standard
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Previous month's last days (to fill the first week)
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();
    
    const days = [];
    
    // Add previous month's days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }
    
    // Add next month's days to complete the grid
    const remainingDays = CALENDAR_GRID_SIZE - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      });
    }
    
    return days;
  }, [currentDate]);

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.nextDueDate) return false;
      const taskDate = new Date(task.nextDueDate);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handlePrevMonth = () => {
    onMonthChange(-1);
  };

  const handleNextMonth = () => {
    onMonthChange(1);
  };

  const handleDatePress = (date, isCurrentMonth) => {
    if (isCurrentMonth && onDateSelect) {
      onDateSelect(date);
    }
  };

  const monthName = currentDate.toLocaleDateString('de-DE', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthName}</Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekDaysRow}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {calendarDays.map((item, index) => {
          const dayTasks = getTasksForDate(item.date);
          const hasTasks = dayTasks.length > 0;
          const isSelected = isSameDay(item.date, selectedDate);
          const isTodayDate = isToday(item.date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !item.isCurrentMonth && styles.dayCellInactive,
                isSelected && styles.dayCellSelected,
                isTodayDate && styles.dayCellToday,
              ]}
              onPress={() => handleDatePress(item.date, item.isCurrentMonth)}
            >
              <Text
                style={[
                  styles.dayText,
                  !item.isCurrentMonth && styles.dayTextInactive,
                  isSelected && styles.dayTextSelected,
                  isTodayDate && styles.dayTextToday,
                ]}
              >
                {item.day}
              </Text>
              {hasTasks && item.isCurrentMonth && (
                <View style={styles.taskIndicator} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 28,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 8,
  },
  dayCellInactive: {
    opacity: 0.3,
  },
  dayCellSelected: {
    backgroundColor: '#4CAF50',
  },
  dayCellToday: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  dayTextInactive: {
    color: '#999',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dayTextToday: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  taskIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#4CAF50',
  },
});
