import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { PlantProvider } from './src/context/PlantContext';
import HomeScreen from './src/screens/HomeScreen';
import AddPlantScreen from './src/screens/AddPlantScreen';
import PlantDetailScreen from './src/screens/PlantDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
    </Stack.Navigator>
  );
}

function TabIcon({ emoji, color, isAdd = false }) {
  if (isAdd) {
    return (
      <View style={[styles.addIconContainer, { backgroundColor: color }]}>
        <Text style={styles.addIconText}>{emoji}</Text>
      </View>
    );
  }
  return <Text style={[styles.iconText, { color }]}>{emoji}</Text>;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="🏠" color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddPlantScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="📷" color={color} isAdd />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="👤" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PlantProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </PlantProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  iconText: {
    fontSize: 24,
  },
  addIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addIconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
