import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container: {flex: 1, flexDirection: 'row' , alignSelf: 'center' },
    togglebutton: {
        backgroundColor: '#FFFFFF'
    },
    toggleIconWrapper:{alignSelf: 'flex-start', paddingRight:5  },
    toggleIcon: { width: wp(20), height:wp(10) },
    toggleTextWrapper : {alignSelf:'flex-start', flex: 1 , paddingLeft:5},
    toggleTextStyle: {fontSize: hp(1.5),
        paddingVertical: 0,
        padding: 0,
        color: '#333333',
        alignItems: 'flex-start',
        fontFamily: 'Montserrat-SemiBold'}
});