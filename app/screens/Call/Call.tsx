import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useStyles} from './styles';

interface Props {

}

const Call = () => {
    const [appId,setAppId] = useState('')
    const [token, setToken] = useState('');
    const [channelName, setChannelName] = useState('');
    const [joinSucceed, setJoinSucceed] = useState<boolean>();
    const [openMicrophone, setOpenMicrophone] = useState<boolean>();
    const [enableSpeakerphone, setEnableSpeakerphone] = useState<boolean>();
    const [peerIds, setPeerIds] = useState<number[]>([]);
    //
   
  const styles = useStyles();
  return (
    <View style={styles.container}>
        <View>
            <Text style={{textAlign:"center"}}>CAll</Text>
        </View>
      <View style={styles.innerContainer}>
        {/* <Text>Call</Text> */}
        <TouchableOpacity style={styles.LoginBtn}>
          <Text style={styles.login}>Join</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginBtn}>
          <Text style={styles.login}>Leave</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.LoginBtn}>
          <Text style={styles.login}>Mute</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginBtn}>
          <Text style={styles.login}>Unmute</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Call;
