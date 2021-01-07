import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    titleContainer:{
        backgroundColor: '$white',
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        padding: hp(1.5)

    },
    textStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
    }
});