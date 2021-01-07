import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const imageWidth = Dimensions.get('window').width - wp(4);

export default EStyleSheet.create({
    $largeContainerSize: imageWidth,
    $largeImageSize: imageWidth,
    $smallContainerSize: imageWidth,
    $smallImageSize: imageWidth,
    container: {
        alignItems: 'center',
    },
    togglebutton: {
        backgroundColor: '#FFFFFF'
    },
    text: {
        fontWeight: '600',
        fontSize: hp(2),
        letterSpacing: -0.5,
        marginTop: hp(1),
        backgroundColor : '#FF0000',
        color: '#00FF00'
    },
    toggleTextStyle:{
        fontSize : hp(1.2),
        paddingVertical: 5,
        padding: 0,
        marginRight: wp(10),
        color: '#333333',
        fontWeight: '600',
        alignItems: 'flex-start',
        fontFamily: 'Montserrat-Regular'
    },
    link: {
        textDecorationLine: 'underline',
        color: '#E2211C',
        fontFamily: 'Montserrat-SemiBold'
    }
});