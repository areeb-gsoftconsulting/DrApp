import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const useStyles = () => {
  const styles = StyleSheet.create({
    inputField: {
      width: wp('80%'),
      borderRadius: 20,
      marginBottom: 20,
      alignSelf: 'center',
      backgroundColor: 'white',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    login:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold'
    },
    LoginBtn:{
        backgroundColor:'blue',
        padding:10,
        width:wp('30%'),
        alignSelf:'center',
        borderRadius:20
    }
  });
  return styles;
};
