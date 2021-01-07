import {Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const imageWidth = Dimensions.get('window').width - wp(4);

export default EStyleSheet.create({

    container: {
        alignItems: 'center',
        width: imageWidth,
        flex: 1
    },
    buttonStyle: {
        backgroundColor: '#E2211C',
        padding: hp(1)
    },
    text: {
        fontWeight: '600',
        fontSize: hp(2),
        letterSpacing: -0.5,
        marginTop: hp(1),
        color : '$white'
    }
});