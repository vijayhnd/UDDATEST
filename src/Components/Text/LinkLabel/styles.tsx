import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = EStyleSheet.create({
    link_label:{
        fontSize: hp(2),
        color: '#e2211c',
        fontFamily: 'Montserrat-SemiBold',
        textDecorationLine: 'underline'
        
      }
});

export default styles;