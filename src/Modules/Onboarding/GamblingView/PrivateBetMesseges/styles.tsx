import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    scrollviewstyle: {
        backgroundColor: 'white',
        width: '100%'
    },
    Main_Container: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Second_Container: {
        width: '95%',
        backgroundColor: '#dddddd',
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Profile_Container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
    },
    Image_Container: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Data_Container: {
        width: '85%',
        height: 'auto',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    Line: {
            width: '97%',
            height: 1,
            backgroundColor: '#888888',
            marginVertical: 2,
            alignSelf: 'center',
    },
    OtherTextContainer: {
        flexShrink: 1,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OtherTextSubContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '70%',
        marginBottom: '10%',
    },
    UnderConstText: {
        color: '#68bcbc',
        fontSize: hp(3.0),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    DescText: {
        color: 'black',
        fontSize: hp(1.9),
        justifyContent: 'center',
        textAlign:'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: 15,
    },
});