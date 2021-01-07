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
        backgroundColor: '#68bcbc',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    White_Container: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    NFLDAILYGAME: {
        width: '90%',
        backgroundColor: 'white',
        padding: 5,
        marginTop: 10,
        borderRadius: 10
    },
    Text_Invitation: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    Text_Nfl: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        padding: 10
    },
    Line1: {
        backgroundColor: '#999999',
        width: '100%',
        height: 1
    },
    Text_ContestName: {
        color: '#999999',
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        marginTop: 2
    },
    Text_Allan: {
        color: 'black',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Montserrat-Bold',
        marginTop: 10
    },
    Text_Accept: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold'
    },
    AcceptView: {
        width: '50%',
        backgroundColor: '#ff9900',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 5
    },
    AcceptView2: {
        width: '50%',
        backgroundColor: '#ff9900',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    MainAcceptView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2
    },
    LineImageContainer: {
        marginTop: 20,
        width: '100%',
        height: 2,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    BorderContainer: {
        width: '100%',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexDirection:'row',
        padding:10
    },
    Text_ViewThisContest: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
    },
    verify_button: {
        marginTop: hp(3.8),
        paddingTop: hp(0.8),
        paddingLeft: hp(9.0),
        paddingRight: hp(9.0),
        paddingBottom: hp(0.8),
        backgroundColor:'#6abcbc'
    },
    verify_button_text_style: {
        fontSize: hp(2.5),
        textAlign: 'center'
    },

});