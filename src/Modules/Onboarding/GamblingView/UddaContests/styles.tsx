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
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '#68bcbc',
        alignSelf: 'flex-start',
    },
    mainContent: {
        backgroundColor: '#68bcbc',
        width: '100%',
        height: '100%',
        // paddingBottom: hp(1.5),
        alignItems: 'center',
        flex: 1
    },
    Challenge: {
        width: '60%',
        backgroundColor: '#cccccc',
        padding: 10,

    },
    Subscribe: {
        width: '40%',
        backgroundColor: 'white',
        padding: 10
    },
    DialogMain: {
        backgroundColor: 'white',
        margin: 10,
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,

    },
    Text_Style: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop: 10
    },
    Text_Style_NFL: {
        color: '#606060',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginTop: 10
    },
    Question_Container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    Yes_Text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    No_Text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    Udda_Text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 10
    },
    Month_Text: {
        color: '#666666',
        fontFamily: 'Montserrat-Bold',
        fontSize: 13
    },
    Registration_Text: {
        color: '#999999',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 11
    },
    Subscribe_Text: {
        color: '#ff9900',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textAlign: 'center'
    },
    Challenge_Name_Text: {
        color: '#666666',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    Registration_Date: {
        color: '#999999',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12
    },
    Joining_Text: {
        color: '#999999',
        fontFamily: 'Montserrat-Medium',
        fontSize: 10
    },
    Joining_Price: {
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    Join_Now_Text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textAlign: 'center',
        padding: 4
    },
    Private_Text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    Create_Text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    Button_Style: {
        width: '95%',
        height: 50,
        backgroundColor: '#68bcbc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 0
    },
    //private contest styles

   
    verify_button: {
        marginTop: hp(3.8),
        paddingTop: hp(0.8),
        paddingLeft: hp(12.0),
        paddingRight: hp(12.0),
        paddingBottom: hp(0.8),
        backgroundColor:'#68bcbc'
    },
    verify_button_text_style: {
        fontSize: hp(2.5),
        textAlign: 'center',
        color:'white'
    },
    table_title_info_text: {
        textAlign: 'center',
        // marginRight: 1,
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    },
    table_title_info_container: {
        width: 14,
        height: 14,
        backgroundColor: '#69bbbb',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: -2
    },
});