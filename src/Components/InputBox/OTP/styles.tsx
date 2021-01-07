import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    mobile_text_wrapper:{ borderBottomColor: '#666666', borderBottomWidth: 1, backgroundColor: 'transparent', borderRadius : 0, width:wp(18) , alignItems:'center', alignContent:'center'},
    mobile_text:{flex:1, textAlign: 'center', color: '#585858', fontSize: hp(2.2), fontFamily: 'Montserrat-Regular'},
    text: {
        fontWeight: '600',
        fontSize: 28,
        letterSpacing: -0.5,
        marginTop: 15,
        color : '$white'
    }
});