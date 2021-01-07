import {Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    mobile_text_wrapper:{ borderBottomColor: '#666666', borderBottomWidth: 1  },
    mobile_text:{ textAlign: 'center', color: 'black', fontSize: hp(2.2), fontFamily: 'Montserrat-Regular', paddingBottom: Platform.OS === 'ios' ? hp(1) : 0 },
    text: {
        fontWeight: '600',
        fontSize: 28,
        letterSpacing: -0.5,
        marginTop: 15,
        color : '$white'
    }
});