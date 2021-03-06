import React, {useEffect} from 'react';
import {
  Theme,
  UserStatus,
  CallingContextType,
  UserName,
  Message,
  CurrentUser,
  AllUsers,
} from '../types/callingContextTypes';
import {io} from 'socket.io-client';
import {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const CallingContext = React.createContext<CallingContextType | null>(
  null,
);

const socket = io('http://192.168.1.3:3000', {autoConnect: true});

const ThemeProvider: React.FC<React.ReactNode> = ({children}) => {
  const [themeMode, setThemeMode] = useState<Theme>('light');
  const [currentStatus, setcurrentStatus] = useState<UserStatus>('offline');
  const [userrName, setUserName] = useState<UserName>('');
  const [currentUserData, setCurrentUser] = useState<CurrentUser>({});
  const [userMessage, setMessage] = useState<Message>('');
  const [all_Users, setAllUser] = useState<AllUsers>([{}]);

  const creatingNewUser = () => {
    try {
      socket.connect();
      socket.auth = {username: userrName};
      console.log('running from context');
    } catch (err) {
      console.log('error while creating user', err);
    }
  };

  const _sendMessage = () => {
    console.log('running', userMessage);

    socket.emit('private message', {
      content: userMessage,
      to: 'a351c0f2e981e4eb',
    });
  };

  const _endJob = () => {
    socket.disconnect();
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

    socket.on('disconnect', () => {
      setcurrentStatus('offline');
      console.log('user disconnected');
    });

    socket.on('private message', data => {
      console.log('users message ==>', data);
      // if (data.content == 'calling') {
      //   navigation.navigate('CallingScreen');
      // }
    });

    socket.on('session', data => {
      setCurrentUser(data);
    });

    socket.on('users', data => {
      setAllUser(data);
    });
    // NetInfo.fetch().then(state => {
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    // });
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Is connected?', state.isConnected);
      if (state.isConnected == false) {
        socket.disconnect();
      }
    });
  }, [NetInfo]);

  return (
    <CallingContext.Provider
      value={{
        theme: themeMode,
        changeTheme: setThemeMode,
        userStatus: currentStatus,
        changeUserStatus: setcurrentStatus,
        userName: userrName,
        changeUserName: setUserName,
        currentUser: currentUserData,
        createNewUser: creatingNewUser,
        message: userMessage,
        changeMessage: setMessage,
        sendMessage: _sendMessage,
        endJob: _endJob,
        allUsers: all_Users,
      }}>
      {children}
    </CallingContext.Provider>
  );
};

export default ThemeProvider;
