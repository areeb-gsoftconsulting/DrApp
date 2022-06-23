import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationParams} from '../../Navigation/StackNavParams';
import {ThemeContextType, Theme} from '../../types/theme';

import {ThemeContext} from '../../contextApi/ThemeContext';

// import authContext from '../../contextApi/authContext'

type CallingScreenProp = NativeStackNavigationProp<
  StackNavigationParams,
  'CallingScreen'
>;

const CallingScreen = () => {
  const {theme, userStatus, changeTheme, changeUserStatus} = React.useContext(
    ThemeContext,
  ) as ThemeContextType;

  const styles = useStyles();

  console.log({theme, userStatus});
  return (
    <View style={styles.container}>
      <Text>Incoming Call</Text>
      <Text>Current Status: {userStatus}</Text>
      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => {
          changeUserStatus('busy');
        }}>
        <Text style={styles.callBtnTxt}>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => {
          changeUserStatus('online');
        }}>
        <Text style={styles.callBtnTxt}>Decline</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallingScreen;
