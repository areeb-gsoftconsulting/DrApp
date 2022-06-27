import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  Permission
} from 'react-native';
import StackNavigation from './app/Navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Login from './app/screens/Login/Login';
import Dashboard from './app/screens/Dashboard/Dashboard';
import ThemeProvider from './app/contextApi/CallingContext';
import CallingScreen from './app/screens/CallingScreen/CallingScreen';
import Call from './app/screens/Call/Call';
import VoiceCall from './app/screens/VoiceCall/VoiceCall';
import Temp from './app/screens/Temp';


const App = () => {
  
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <Dashboard />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
