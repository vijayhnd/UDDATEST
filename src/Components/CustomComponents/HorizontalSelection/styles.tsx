import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container:{
        flexGrow:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'$white',
        padding: 8
    },
    centerContainerTitleStyle: {
        borderWidth: 1,
        alignSelf:'center',
        borderColor: '$gray',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: wp(1.3)
    },
    centerTitleTextStyle: {
        fontFamily: 'Montserrat-bold', fontSize: hp(1.5),color:'black'
    },
    boldTextStyle: {
        color:'$gray', fontFamily: 'Montserrat-Bold', fontSize: hp(1.3),paddingTop: 1,
    }
})