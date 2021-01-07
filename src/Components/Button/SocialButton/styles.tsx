import {Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const imageWidth = Dimensions.get('window').width - wp(4);

export default EStyleSheet.create({
    $facebookButtonColor: '#3b5998',
    $googleButtonColor: '#d34836',
    $twitterButtonColor: '#0084b4',
    $appleButtonColor:'#000000',
    container: {
        alignItems: 'center',
        width: imageWidth,
        flex: 1
    },
    buttonStyle: {
        
        padding: hp(3.5)
    },
    googleButtonStyle: {
        backgroundColor: '$googleButtonColor',
    },
    facebookButtonStyle: {
        backgroundColor: '$facebookButtonColor',
    },
    twitterButtonStyle:{
       // backgroundColor: '$twitterButtonColor',
        backgroundColor: '$appleButtonColor',
       // appleButtonColor
    },
    background_button:{
        flex:1,
    },
    overlay_icon_text:{
        position:'absolute',
        flex:1,
        flexDirection:'row'
    },
    text: {
        fontSize: hp(2.1),
        color : '$white',
        fontFamily: 'Montserrat-SemiBold'
    }
});