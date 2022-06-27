import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import {useStyles} from './styles';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import requestCameraAndAudioPermission from './Permission'
import styles from './Style';


const Call = () => {
  const _engine = useRef<RtcEngine | null>(null);
  const [appId, setAppId] = useState(`1a3ade3349ef4d1e990e5de8ae47f12b`);
  const [token, setToken] = useState(
    '0061a3ade3349ef4d1e990e5de8ae47f12bIACd6p23CQysCylt7CBNUD7e5u2Jg+R69npe+UbU1tGtUgJkFYoAAAAAEABGROOe6fO2YgEAAQDn87Zi',
  );
  const [channelName, setChannelName] = useState('channel-x');
  const [joinSucceed, setJoinSucceed] = useState<boolean>();
  const [openMicrophone, setOpenMicrophone] = useState<boolean>();
  const [enableSpeakerphone, setEnableSpeakerphone] = useState<boolean>();
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
    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    const init = async () => {
      // const {appId} = config;
      _engine.current = await RtcEngine.create(appId);
      await _engine.current.enableVideo();

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
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @name startCall
   * @description Function to start the call
   */
  const startCall = async () => {
    // Join Channel using null token and channel name
    await _engine.current?.joinChannel(token, channelName, null, 0);
  };


  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    await _engine.current?.leaveChannel();
    setPeerIds([]);
    setJoined(false);
  };

  const _renderVideos = () => {
    return isJoined ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {_renderRemoteVideos()}
      </View>
    ) : null;
  };
  const _renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={styles.padding}
        horizontal={true}>
        {peerIds.map(value => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {_renderVideos()}
      </View>
    </View>
  );
  // const styles = useStyles();
  // return (
  //   <View style={styles.container}>
  //     <View>
  //       <Text style={{textAlign: 'center'}}>CAll</Text>
  //     </View>
  //     <View style={styles.innerContainer}>
  //       {/* <Text>Call</Text> */}
  //       <TouchableOpacity style={styles.LoginBtn}>
  //         <Text style={styles.login}>Join</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity style={styles.LoginBtn}>
  //         <Text style={styles.login}>Leave</Text>
  //       </TouchableOpacity>
  //     </View>

  //     <View style={styles.innerContainer}>
  //       <TouchableOpacity style={styles.LoginBtn}>
  //         <Text style={styles.login}>Mute</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity style={styles.LoginBtn}>
  //         <Text style={styles.login}>Unmute</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

export default Call;
