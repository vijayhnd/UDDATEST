import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({

    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingTop: Platform.OS === 'ios' ? hp(2) : hp(0)
    },
    text: {
        fontWeight: '600',
        fontSize: 28,
        letterSpacing: -0.5,
        marginTop: 15,
        color : '$white'
    }
});