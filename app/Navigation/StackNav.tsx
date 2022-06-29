import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import CallingScreen from '../screens/CallingScreen/CallingScreen';
import UserList from '../screens/UserList/UserList';



const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CallingScreen" component={CallingScreen} />
      <Stack.Screen name="UserList" component={UserList} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
