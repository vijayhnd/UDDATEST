import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    searchBoxMainContainer:{
        flex: 1,
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchBoxContainer:{
        flexGrow: 1,
        flexDirection:'row',
        alignItems: 'stretch',
        alignContent: 'center',
        padding: wp(2),
    },
    inputTextStyle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.4),
        color: '$inputBoxLightColor',
        paddingVertical: 0,
        width:wp(25)
    },
    searchIconContainer:{
        padding: wp(2),
    }
});