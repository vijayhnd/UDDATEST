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
        width: '100%',
    },
    Main_Container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Second_Container: {
        width: '95%',
        height: '100%',
        backgroundColor: '#dddddd',
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Profile_Container: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10
    },
    Image_Container: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    UserDetail_Container: {
        width: '85%',
        height: 'auto',
        justifyContent: 'center',
    },
    Line: {
        width: '95%',
        height: 1,
        backgroundColor: '#888888',
        marginVertical: 8,
        marginTop: 10,
        marginBottom: 10
    },
    Horizontal_Container: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    
    },
    Text_Container: {
        width: '60%',
    },
    Text_Container2: {
        width: '20%',
        justifyContent:'center',
        alignItems: 'center',
    },
    Main_WhiteColor_Container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    White_Container: {
        width: '95%',
        backgroundColor: 'white',
        padding: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    dialog_triangle: {
        elevation: 5,
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84 ,
        shadowColor: '#000',
        height: 0,
        width: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderBottomWidth: 14,
        borderBottomColor: '#fff',
        backgroundColor: 'transparent',
    },
    CloseView: {
        alignItems: 'flex-end',
        width: '100%',
    },
    CloseViewArrow:{
        alignItems: 'flex-start',
        width: '100%',
    },
    verify_button: {
        marginTop: hp(3.8),
        paddingTop: hp(0.8),
        paddingLeft: hp(9.0),
        paddingRight: hp(9.0),
        paddingBottom: hp(0.8),
    },
    verify_button_text_style: {
        fontSize: wp(4.5), // garima  hp(2.5)
        textAlign: 'center'
    },
});