import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'stretch',
        flexGrow: 1
    },
    titleContainer:{
        height: hp(7),
        flexDirection: 'row',
        //backgroundColor:'#68bcbc',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText:{
        flexGrow: 1,
        //backgroundColor:'green',
        textAlign:'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '$appGreen'
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
    },
    settingsContainer:{
        flexGrow: 1,
        backgroundColor: 'white'
    },
    logoutContainer:{
        height: hp(10),
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingHorizontal: wp(5),
        paddingTop: wp(3),
        //backgroundColor:'green'
    },
    logoutButtonStyle:{
        flexGrow: 1,
        alignSelf: 'stretch',
        paddingTop: hp(0.8),
        paddingBottom: hp(1),
    },
    logoutButtonTextStyle: {
        fontSize: hp(3),
        textAlign: 'center'
    }
})