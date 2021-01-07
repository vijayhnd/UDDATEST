import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    verify_button_text_style: {
        fontSize: wp(4.5), // garima  hp(2.5)
        textAlign: 'center'
    },
})