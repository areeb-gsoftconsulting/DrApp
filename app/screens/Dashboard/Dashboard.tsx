import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  addons,
  Button,
} from 'react-native';
import {useStyles} from './styles';
import {ThemeContextType, Theme} from '../../types/theme';
import {ThemeContext} from '../../contextApi/ThemeContext';
import {io} from 'socket.io-client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationParams } from '../../Navigation/StackNavParams';
import { useNavigation } from '@react-navigation/native';

type dashboardScreenProp = NativeStackNavigationProp<
  StackNavigationParams,
  'Dashboard'
>;

const socket = io('http://192.168.1.5:3000', {autoConnect: true});

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation<dashboardScreenProp>();


  const {theme, userStatus, changeTheme, changeUserStatus} = React.useContext(
    ThemeContext,
  ) as ThemeContextType;

  const styles = useStyles();

  const createNewUser = () => {
    socket.connect();

    socket.auth = {username: name};
    console.log('running...');
  };

  useEffect(() => {
    console.log('in use effect');

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('connect', () => {
      console.log('connect', socket.connected);
    });
    // socket.on('user', user => {
    //   console.log("current",user);

    // });

    // socket.on('disconnect', () => {
    //   console.log('users ==>', '20d111f1a2ed0205');
    // });

    socket.on('private message', data => {
      console.log('users message ==>', data);
      if(data.content == 'calling'){
        navigation.navigate('CallingScreen')
      }
    });

    socket.on('session', data => {
      setCurrentUser(data);
    });
  }, []);

  console.log('current users ==>', name);

  const sendMessage = () => {
    socket.emit('private message', {
      content: message,
      to: 'b75f5aa55d7e73b5',
    });
  };

  

  return (
    <View style={{alignSelf: 'center', flex: 1, justifyContent: 'center'}}>
      <Text>User Dashboard</Text>
      <Text>User is currently {userStatus}</Text>

      <TextInput
        placeholder="Enter Your Name"
        style={styles.inputField}
        onChangeText={e => {
          setName(e);
        }}
      />

      <Button title="Create User" onPress={createNewUser} />

      <TextInput
        placeholder="Enter Message"
        multiline={true}
        numberOfLines={3}
        style={styles.inputField}
        onChangeText={e => {
          setMessage(e);
        }}
      />

      <Button title="Send Message" onPress={sendMessage} />

      <Button
        title="Button"
        onPress={() => {
          socket.emit('private message', {
            content: 'calling...',
            to: '20d111f1a2ed0205',
          });
        }}
      />
      <Button title="Call" />
      {/* <Button onPress={()=>{navigation.navigate('CallingScreen')}} title="Busy" /> */}
    </View>
  );
};

export default Dashboard;
