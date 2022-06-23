import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigation from './app/Navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Login from './app/screens/Login/Login';
import Dashboard from './app/screens/Dashboard/Dashboard';
import ThemeProvider from './app/contextApi/ThemeContext';
import CallingScreen from './app/screens/CallingScreen/CallingScreen';


const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <StackNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
