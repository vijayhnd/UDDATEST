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
        backgroundColor: 'white',
        // backgroundColor: '#68bcbc',
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center'
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
    NFL_Text_Style:
    {
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        textDecorationLine: 'underline'
    },
    Current_Text_Style: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.1)
    },
    Date_Text_Style: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12
    },
    Flatlist_Style: {
        width: '100%',
        backgroundColor: '#dddddd',
       // marginTop: 10,
        paddingBottom: 1,
        height:'85%'
    },
    Flatlist_Main_Container:
    {
        width: '100%',
        flexDirection: 'row',
        height: 60,
        marginTop: 1,
    },
    Detail_Container:
    {
        width: '20%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Name_Container: {
        width: '55%',
        padding: 5,
        justifyContent: 'center',
    },
    
    Count_Style: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12
    },
    Name_Style: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    Price_Container: {
        width: '25%',
        padding: 5,
        justifyContent: 'center',
    },
    Price_Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    Date_Text: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: 10
    },
    Team1_Text: {
        color: '#606060',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    Verses_Text: {
        color: '#606060',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginLeft: 3,
        marginRight: 3,
        textAlign: 'center'
    },
    Team2_Text: {
        color: '#606060',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textDecorationLine: 'underline'
    },
    Team_Price_Container: {
        width: '25%',
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        paddingRight: 20
    },
    Team_Price_Text: {
        color: '#606060',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        textAlign: 'right'
    },
    Line: {
        width: '100%',
        backgroundColor: '#d2d2d2',
        height: 1
    },
    Detail_Container1:
    {
       // width: '20%',
    //    justifyContent: 'center',
    //     alignItems: 'center',
    },  
     Name_Container1: {
       // width: '35%',
        justifyContent: 'center',
    },
    Price_Container1: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.2),
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

});