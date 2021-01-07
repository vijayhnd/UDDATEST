import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

 
        customheadtext:{ 
            fontFamily: 'Montserrat-Bold', 
            fontSize: hp(2.6), 
            color: 'white', 
            // textAlign: 'center', 
            marginTop: 7, 
            // alignContent: 'center' 
        }
});