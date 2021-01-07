
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    subHeaderMainContent: {
        flexGrow: 1,
        backgroundColor: '$subHeaderNameBackground',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    nameCotainer: {
        flex: 0.8,
    },
    profileIcon: {
        padding: wp(1),
        justifyContent: 'center'
    },
    verticleNameContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        padding: hp(0.5)
    },
    accountNameTextStyle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.0)
    },
    profileNameTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5)
    },
    balanceContainer: {
        flex: 0.7,
    },
    availableBalanceTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.0)
    },
    availableBalanceTextContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: wp(1),
    },
    availableBalanceCurrencyTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.2)
    },
    availableBalanceTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5)
    },

    playsContainer: {
        flex: 0.4,
        backgroundColor: '$subHeaderPlaysBackground',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    plays2Container: {
        flex: 0.3,
        backgroundColor: '$subHeaderPlaysBackground',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    playsTitleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(1),
    },
    playsTitleTextStyle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.0),
    },
    playsTextStyleContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(0.3),
    },
    playsTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.0),
    },
    playsText2Style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.1),
    },

    verBG: {
        backgroundColor: '$subHeaderPlaysBackground',
        width: 1,
        height: 'auto',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    verticalline: {
        width: '100%',
        height: 35,
        backgroundColor: '#aaaaaa',

    },

    coveredContainer: {
        flex: 0.6,
        backgroundColor: '$subHeaderPlaysBackground',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    covered2Container: {
        flex: 0.5,
        backgroundColor: '$subHeaderPlaysBackground',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    coveredTitleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(0.7),
    },
    coveredTitleTextStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.2),
        color: '$appRed',
    },
    coveredTitleText2Style: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.2),
        // color: '$appGreen',
        color: '#0c98ad',
    },
    coveredTextStyleContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(0.3),
    },
    coveredTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.7),
        color: '$appRed',
    },
    coveredText2Style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.7),
        // color: '$appGreen',
        color: '#0c98ad',
    },
    G_coveredContainer: {
        flex: 0.7,
        backgroundColor: '$subHeaderPlaysBackground',
        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    G_coveredTitleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(0.7),
    },
    G_coveredTitleTextStyle: {
        fontFamily: 'Montserrat-SemiBold',
        textShadowColor: '#000000',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        fontSize: hp(1.5),
        color: '#68bcbc',
    },
    G_coveredTextStyleContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: wp(0.3),
    },
    G_coveredTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.8),
        color: '#68bcbc',
        textShadowColor: '#000000',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    textStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.8),
        color: '$appRed'
    }
});
