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
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingBottom: hp(4),
        //paddingTop: hp(2),
        paddingHorizontal: wp(5),
    },
    inputBoxesWrapper: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        //paddingBottom: hp(1)
    },
    inputBoxWrapper: {
        
    },
    sign_in_details_wrapper: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        //paddingTop: hp(3)
    },
    sign_in_button_wrapper: {
    },
    sign_in_button: {
        paddingTop: hp(0.8),
        paddingBottom: hp(1),
    },
    sign_in_button_text_style: {
        fontSize: hp(3.8),
        textAlign: 'center'
    },
    title: {
        fontSize: hp(1.8),
        color: '#333333',
        textAlign: 'justify',
        fontFamily: 'Montserrat-SemiBold',
    },
    titleContainer: { flexDirection: 'column', alignSelf: 'stretch' },
    footer: { flexDirection: 'column', alignSelf: 'stretch', alignItems: 'stretch', justifyContent: 'flex-start', paddingTop: hp(1) },
    headTitle: {
        fontSize: hp(3.2),
        color: '#333333',
        textAlign: 'justify',
        fontFamily: 'Montserrat-Regular'
    },
    headTitleWrapper: {
        alignItems: 'center',
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