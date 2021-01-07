import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        fontSize: hp(2),
        fontFamily: 'Montserrat-Bold',
    },
    tempStyle: {
        fontSize: hp(2),
        fontFamily: 'Montserrat-Bold'
    }
});