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
import {CallingContextType, Theme} from '../../types/callingContextTypes';
import {CallingContext} from '../../contextApi/CallingContext';
import {io} from 'socket.io-client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationParams } from '../../Navigation/StackNavParams';
import { useNavigation } from '@react-navigation/native';

type dashboardScreenProp = NativeStackNavigationProp<
  StackNavigationParams,
  'Dashboard'
>;

const socket = io('http://192.168.1.3:3000', {autoConnect: true});

const Dashboard = () => {
  const [currentUserr, setCurrentUser] = useState();
  const [name, setName] = useState('');
  const [enterMessage, setMessage] = useState('');
  const navigation = useNavigation<dashboardScreenProp>();
  


  const {
    theme,
    userStatus,
    changeTheme,
    changeUserStatus,
    userName,
    currentUser,
    changeUserName,
    createNewUser,
    message,
    changeMessage,
    sendMessage,
    endJob
  } = React.useContext(CallingContext) as CallingContextType;

  const styles = useStyles();

  // const createNewUser = () => {
  //   socket.connect();
  //   changeUserName(name);
  //   socket.auth = {username: name};
  //   console.log('running...');
  // };
  
  
  // useEffect(() => {
  //  console.log('in use effect');
  //   socket.onAny((event, ...args) => {
  //     console.log(event, args);
  //   });


  //   socket.on('connect', () => {
  //     console.log('connect', socket.connected);
  //   });
  //   // socket.on('user', user => {
  //   //   console.log("current",user);

  //   // });

  //   // socket.on('disconnect', () => {
  //   //   console.log('users ==>', '20d111f1a2ed0205');
  //   // });

  //   socket.on('private message', data => {
  //     console.log('users message ==>', data);
  //     if(data.content == 'calling'){
  //       navigation.navigate('CallingScreen')
  //     }
  //   });

  //   socket.on('session', data => {
  //     setCurrentUser(data);
  //   });
  // }, []);

  // console.log('current users ==>', name);

  // const sendMessage = () => {
  //   socket.emit('private message', {
  //     content: message,
  //     to: '805e0b92776b93b1',
  //   });
  // };

  

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
      <Text>{userName}</Text>

      <Button
        title="Save Name"
        onPress={() => {
          changeUserName(name);
        }}
      />

      <Button
        title="Create User"
        onPress={() => {
          createNewUser();
          changeUserStatus('online');
        }}
      />

      <TextInput
        placeholder="Enter Message"
        multiline={true}
        numberOfLines={3}
        style={styles.inputField}
        onChangeText={e => {
          setMessage(e);
        }}
      />
      <Button
        title="SAVE MESSAGE"
        onPress={() => {
          changeMessage(enterMessage);
        }}
      />

      <Button
        title="Send Message"
        onPress={() => {
          sendMessage();
        }}
      />

      <Button
        title="End Job"
        onPress={() => {
          endJob();
        }}
      />

      
      <Button title="Call" />
      {/* <Button onPress={()=>{navigation.navigate('CallingScreen')}} title="Busy" /> */}
    </View>
  );
};

export default Dashboard;
