import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    listItemMainContainer:{
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'center',
        borderBottomColor: '$dividerColor',
        borderBottomWidth: 1
    },
    listItemTextContainer: {
        flexGrow: 1,
        flexDirection:'row',
        paddingRight: hp(2),
        paddingVertical: hp(1),
        alignItems: 'center'
    },
    listItemIconContainer: {
        paddingLeft: hp(2),
        paddingVertical: hp(1)
    },
    textStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.2),
        color: '$inputBoxLightColor'
    }
});