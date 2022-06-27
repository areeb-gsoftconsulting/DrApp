import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Button,
  TextInput,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import styles from './Style';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Temp = () => {
  const _engine = useRef<RtcEngine | null>(null);
  const [appId, setAppId] = useState(`1a3ade3349ef4d1e990e5de8ae47f12b`);
  const [token, setToken] = useState(
    '0061a3ade3349ef4d1e990e5de8ae47f12bIACPrkhaWkgk19UrbNF+hjiSr5yPPikG6hjfoGmmjYVZlwJkFYoAAAAAEACJVdSDiZO6YgEAAQCJk7pi',
  );
  const [channelName, setChannelName] = useState('channel-x');
  const [joinSucceed, setJoinSucceed] = useState<boolean>();
  const [openMicrophone, setOpenMicrophone] = useState<boolean>();
  const [enableSpeakerphone, setEnableSpeakerphonee] = useState<boolean>();
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const [isJoined, setJoined] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }, []);
  

  useEffect(() => {
    const init = async () => {
      _engine.current = await RtcEngine.create(appId);
      await _engine.current.enableAudio();

      // Listen for the UserJoined callback.
      // This callback occurs when the remote user successfully joins the channel.
      _engine.current.addListener('Warning', warn => {
        console.log('Warning', warn);
      });

      _engine.current.addListener('Error', err => {
        console.log('Error', err);
      });

      _engine.current.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);
        // If new user
        if (peerIds.indexOf(uid) === -1) {
          // Add peer ID to state array
          setPeerIds(prev => [...prev, uid]);
        }
      });

      _engine.current.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason);
        // Remove peer ID from state array
        setPeerIds(prev => prev.filter(id => id !== uid));
      });

      // If Local user joins RTC channel
      _engine.current.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          console.log('JoinChannelSuccess', channel, uid, elapsed);
          // Set state variable to true
          setJoined(true);
        },
      );
      init();
    };
  }, []);

  const _joinChannel = async () => {
    // Join Channel using null token and channel name
    _engine.current?.joinChannel(token, channelName, null, 0);
  };

  const _leaveChannel = async () => {
    await _engine.current?.leaveChannel();
    setPeerIds([]);
    setJoined(false);
  };

  const _switchMicrophone = () => {
    // const {openMicrophone} = this.state;
    _engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        setOpenMicrophone(!openMicrophone);
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };

  // Switch the audio playback device.
  const _switchSpeakerphone = () => {
    // const {enableSpeakerphone} = this.state;
    _engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        setEnableSpeakerphonee(!enableSpeakerphone);
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };
       return (
         <View style={styles.container}>
           <View style={styles.top}>
             <TextInput
               style={styles.input}
               onChangeText={text => setChannelName(text)}
               placeholder={'Channel Name'}
               value={channelName}
             />
             <Button
               onPress={joinSucceed ? _leaveChannel : _joinChannel}
               title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
             />
           </View>
           <View style={styles.float}>
             <Button
               onPress={_switchMicrophone}
               title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
             />
             <Button
               onPress={_switchSpeakerphone}
               title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
             />
           </View>
         </View>
       );
};
export default Temp;
