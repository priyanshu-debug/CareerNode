import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SeekerDashboard from '../screens/SeekerDashboard';
import PostJobScreen from '../screens/PostJobScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SeekerDashboard" component={SeekerDashboard} />
      <Stack.Screen name="PostJob" component={PostJobScreen} />
    </Stack.Navigator>
  );
}