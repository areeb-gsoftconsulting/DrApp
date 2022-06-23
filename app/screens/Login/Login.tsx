import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationParams} from '../../Navigation/StackNavParams';
import {ThemeContextType, Theme} from '../../types/theme';

import {ThemeContext} from '../../contextApi/ThemeContext';

// import authContext from '../../contextApi/authContext'

type loginScreenProp = NativeStackNavigationProp<
  StackNavigationParams,
  'Login'
>;

const Login = () => {
  const {theme, userStatus, changeTheme, changeUserStatus} = React.useContext(
    ThemeContext,
  ) as ThemeContextType;

  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<loginScreenProp>();
  // const {isLoggedin} = React.useContext(authContext);
  console.log({theme, userStatus});
  return (
    <View>
      <TextInput
        placeholder="Enter Your Email"
        style={styles.inputField}
        keyboardType="email-address"
        onChangeText={e => {
          setEmail(e);
        }}
      />
      <TextInput
        placeholder="Enter Your Password"
        style={styles.inputField}
        secureTextEntry={true}
        onChangeText={e => {
          setPassword(e);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Dashboard')
          changeUserStatus('online');
        }}
        style={styles.LoginBtn}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
