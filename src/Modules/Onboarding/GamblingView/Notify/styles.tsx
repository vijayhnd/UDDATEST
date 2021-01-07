import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    // hrline:{
    //     borderBottomColor: '$backgroundColorHeader',
    //     borderBottomWidth: hp(.2),
    // },
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        // paddingBottom: hp(5)
    },
    mainContent: {
       backgroundColor: 'white',
        flex: 1
    },
    content: {
        padding: '4%',
        paddingTop: '0%',
        paddingBottom: '2%'
    },
    blockContent: {
        width: '100%',
        paddingLeft: '5%',

    },
    notifiyTitleContainer: {
        width: '100%',
        padding: '2%',
    },
    Text_Style: {
        color: '#68bcbc',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    blockNotification: {
        flexDirection: 'row', paddingBottom: '3%'
    },
    textBlockWidth: {
        width: '85%'
    },
    toggleBlockWidth: {
        width: '15%'
    },
    notifytext: {
        fontSize: hp(2.1),
        fontFamily: 'Montserrat-Regular',
        color: '#000',
        marginRight: '2%',

    },
    notifySubmenu: {
        fontSize: hp(2.1),
        fontFamily: 'Montserrat-Regular',
        color: '#000',
        marginRight: '2%',
        marginBottom: '3%',

    },
    paddingLeft:{
        paddingLeft: '5%',
    },
    toggleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.1),
        //marginRight: 3
    },
    toggleText1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
        //marginRight: 3
    },
    createsquaare: {
        justifyContent: 'center',
        alignItems: 'center',
        //width: '100%',
        //padding: '6%',
        borderWidth: 1,
        borderColor: '#68bcbc',
        backgroundColor: '#68bcbc',
        height: hp(10.0),
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
    labelheadtext: {
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
        // textAlign:'center',
        paddingVertical: hp(2.0),
        paddingLeft: 10

    },
    createsquaaretext: {
        // justifyContent: 'center', 
        // alignItems: 'center',
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    flatlist_title: {
        fontSize: wp(2.8), //garima hp(1.4) ,
        color: '#666666',
        width: '100%',
    },
    flatlist_matchup_text_style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.9),
        color: '#68bcbc',

    },
    labelhead2text: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        paddingLeft: 20,
        color: '#888888',
        paddingVertical: hp(1.5),
        textAlign: 'justify'
    },
    myteamcontainLabel: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        paddingVertical: hp(2.0),
    },
    mySportteamcontainLabel: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color: '#000000',
        paddingBottom: hp(2.0),
    },
    backtext: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color: '#68bcbc',
        paddingVertical: hp(2.0),
        textDecorationLine: 'underline',
        textDecorationColor: '#68bcbc',
        textAlign: 'center',

    },
    teamlabelcol: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        color: '#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
        // borderColor: '#cccccc',
        borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    teamlabelcol1: {
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        color: '#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
        borderColor: '#cccccc',
        // borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    list: {
        flex: 1,
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
    customhead: {
        height: 60,
        backgroundColor: '#68bcbc',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    customheadtext: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.6),
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
        alignContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },
});