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


    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#666666',
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
        alignContent: 'center'
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.4),
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },



    gameheader: {
        width: '100%',
        backgroundColor: '#f26522',
        height: 30,
        flexDirection: 'row',
        marginTop: 1,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,

    },
    gameheadertext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.0),
        paddingLeft: 2,
    },
    gamecounttext: {
        color: 'yellow',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.9),
    },


    gamedatetimecontainer: {
        backgroundColor: '#DDDDDD',
        flexDirection: 'row',
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
        paddingLeft: 8,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    datetext: {
        color: '#666666',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },
    daytext: {
        color: '#666666',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.5),
    },


    gamelistcontainer: {
        backgroundColor: 'green',
        height: 60,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },

    gamelistindexcontainer: {
        backgroundColor: 'red',
        height: '100%',
        width: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    indextext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
    },

    teamtitletext: {
        color: 'red',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
    },

    teamoddstext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },

    team2titletext: {
        color: '#888888',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.4),
    },

    team2oddstext: {
        color: '#888888',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.3),
        marginLeft: '4%'
    },

    teamtotaltext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8),

    },
    gamelisttotaldollertext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.3),
        marginBottom: 5
    },
    gamelistteamcontainer: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '67%',
    },
    gamelistteam1container: {
        flexDirection: 'row',
        backgroundColor: 'red',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },

    gamelistmatchup: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '40%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    gamelistamountbet: {
        backgroundColor: 'red',
        height: '100%',
        width: '30%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    gamelistline: {
        backgroundColor: 'red',
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gamelistmatchupteam2: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '40%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    gamelistamountbetteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '30%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gamelistlineteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gamelistteam2container: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: '50%',
        width: '100%',
    },

    gamelisttotalcontainer: {
        backgroundColor: 'red',
        height: '100%',
        width: '25%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        flexDirection: 'row'
    },


    NameHeaderContainer: {
        backgroundColor: '$white',
        flexDirection: 'row',
        alignContent: 'center',
        padding: hp(1.5)

    },
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '$appRed',
        alignSelf: 'flex-start',
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
        marginBottom:'10%',
    },
    UnderConstText: {
        color: 'red',
        fontSize: hp(3.5),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    DescText: {
        color: 'black',
        fontSize: hp(1.9),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    GotoDashboardText:{
        color: 'red',
        fontSize: hp(1.6),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
        textDecorationLine: 'underline'
        
    },
      QuestionContainer:{
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingLeft:4,
    },
    Quetitletext: {
        color: '#333333',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.2),
        textAlign:'center'
    },
    Proptitletext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
    },



});