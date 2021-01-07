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
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        marginLeft: 15 ,
        color: '#68bcbc'
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
    },
    settingsContainer:{
        backgroundColor: 'white'
    },
    logoutContainer:{
        height: hp(10),
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingHorizontal: wp(5),
        paddingTop: wp(3),
    },
    logoutButtonStyle:{
        flexGrow: 1,
        alignSelf: 'stretch',
        paddingTop: hp(0.8),
        paddingBottom: hp(1),
        backgroundColor:'#68bcbc'
    },
    logoutButtonTextStyle: {
        fontSize: hp(3),
        textAlign: 'center'
    },
    headerTitle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.5),
        paddingLeft: wp(1),
        alignSelf: 'center',
    },
    nextIcon:{ 
        width: wp(4), 
        height: wp(7),
    },
    subTitle:{
        fontSize: hp(2.1),
        width:'65%',
        paddingVertical: 5,
    },
    Input_TextStyle: {
        padding: 5,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12
    },
})