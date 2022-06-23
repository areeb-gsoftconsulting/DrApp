import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    login: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    LoginBtn: {
      backgroundColor: 'blue',
      padding: 10,
      width: wp('30%'),
      alignSelf: 'center',
      borderRadius: 20,
      margin: 10,
    },
    innerContainer:{
        display:'flex',
        flexDirection:'row'
    }
  });
  return styles;
};
