import EStyleSheet from 'react-native-extended-stylesheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default EStyleSheet.create({
    scrollContent: {
        width: '$screenWidth',
        height: '$screenHeight',
        padding: 0,
    },
    mainContent: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#FFFFFF',
        paddingBottom: hp(2),
        paddingTop: hp(2),
        paddingHorizontal: wp(5),
        
    },
    inputBoxesWrapper: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        paddingVertical: hp(2)
    },
    inputBoxWrapper: {
        
    },
    sign_in_details_wrapper: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        paddingTop: hp(3)
    },
    sign_in_button_wrapper: {
    },
    sign_in_button: {
        paddingTop: hp(0.5),
        paddingBottom: hp(1),
        backgroundColor:'#68bcbc',
        marginVertical: 10,
    },
    sign_in_button_text_style: {
        fontSize: hp(2.5),
        textAlign: 'center'
    },
    title: {
        fontSize: hp(2.2),
        color: '#68bcbc',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    titleContainer: { flexDirection: 'column', alignSelf: 'stretch',marginVertical: 5, },
    footer: { flexDirection: 'column', alignSelf: 'stretch', alignItems: 'stretch', justifyContent: 'flex-start', paddingTop: hp(1) },
    headTitle: {
        fontSize: hp(3.5),
        color: '#333333',
        textAlign: 'justify',
        fontFamily: 'Montserrat-Regular'
    },
    headTitleWrapper: {
        alignItems: 'center',
        marginVertical: 10,
    },
    headTitle_normal: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
    },
    headTitle_bold: {
        color: '#333333',
        fontFamily: 'Montserrat-Bold'
    },
    footerTitle: {
        fontSize: hp(1.7),
        color: '#333333',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    title_link: {
        textDecorationLine: 'underline',
        color: '#68bcbc',
        paddingVertical: 5
    }

});