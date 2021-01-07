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

    /* --------------------- Titles ---------------- */
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


    /* --------------------- Game Header ---------------- */

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

    /* --------------------- Game Date & Time ---------------- */

    gamedatetimecontainer: {
        backgroundColor: '#666666',
        flexDirection: 'row',
        paddingTop: hp(0.6),
        paddingBottom: hp(0.6),
        paddingLeft: 8,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    datetext: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },
    daytext: {
        color: '#666666',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.5),
    },

    /* --------------------- Game List Main Container ---------------- */

    gamelistcontainer: {
        backgroundColor: 'green',
        height: 80,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },

    gamelistindexcontainer: {
        backgroundColor: 'orange',
        height: '100%',
        width: '2%',
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
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
        lineHeight: hp(1.7)
    },

    teamoddstext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },

    team2titletext: {
        color: '#888888',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.3),
        lineHeight: hp(1.5)
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
        fontSize: hp(1.4),

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
        width: '70%',
    },
    gamelistteam1container: {
        flexDirection: 'row',
        backgroundColor: '#68bcbc',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },

    gamelistmatchup: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '53%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingTop: '1%',
        
    },
    gamelistamountbet: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '25%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    gamelistline: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gamelistmatchupteam2: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '53%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingTop: '1%',
    },
    gamelistamountbetteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '25%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gamelistlineteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '22%',
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
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '30%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        // flexDirection: 'row'
        flexDirection: 'column'
    },


    
    // --------------03-06-2019
    NameHeaderContainer: {
        backgroundColor: '$white',
        flexDirection: 'row',
        alignContent: 'center',
        padding: hp(1.5)

    },
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '#68bcbc',
        alignSelf: 'flex-start',
    },

    // ---------------------- 03-06-2019 ---------------------
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
        fontSize: hp(3.2),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'

    },
    DescText: {
        color: 'black',
        fontSize: hp(1.9),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    GotoDashboardText: {
        color: '#68bcbc',
        fontSize: hp(1.6),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
        textDecorationLine: 'underline'

    },
    // ------------------------ 20-06-2019
    QuestionContainer: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingLeft: 4,
    },
    Quetitletext: {
        color: '#333333',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.2),
        textAlign: 'center'
    },
    Proptitletext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.2),
    },
    flatlist_matchup_count_text_style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.3),
        color: '#999999',
        paddingRight: 4,
        width: '20%',
        textAlign: 'right',
    }, timecontainer: {
        backgroundColor: '#DDDDDD',
        paddingTop: hp(0.6),
        paddingBottom: hp(0.6),
        paddingLeft: 8,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    betclosetext: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.6),
        color: '#666666'
    },
    daystext: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
        color: '#666666'
    },
    timetext: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        color: '#8d8d8d'
    },

});