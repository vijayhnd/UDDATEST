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
        backgroundColor: '#eeeeee',
        width: '100%',
        height: '100%',
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.0)
    },
    Date_Text_Style: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12
    },
    Flatlist_Style: {
        width: '100%',
        backgroundColor: '#eeeeee',
        marginTop: 10,
        paddingBottom: 1
    },
    Flatlist_Main_Container:
    {
        flexDirection: 'row',
        backgroundColor:'white',
        marginTop:12,
        marginLeft: 12,
        marginRight: 12,
        marginBottom:0
    },
    Detail_Container:
    {
        width: '20%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Name_Container: {
        width: '80%',
        padding: 5,
        justifyContent: 'center',
    },
    label_Style: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8)
    },
    date_Style: {
        color: '#606060',
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.6)
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
    header_part:{
        width:'33.33%',
        height:40,
        margin:2,
        backgroundColor:'#68bcbc',
        alignItems:'center',
        justifyContent:'center'
    },
    header_part_2:{
        width:'25%',
        height:30,
        alignItems:'center',
        justifyContent:'center'
    },
    font_lbl_header:{
        color: '#222222',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.4),
        marginBottom: 3,
    },
    border_bottom:{
        backgroundColor:'#68bcbc',
        height:3,
        width:'100%',
    },

    NameHeaderContainer: {
        backgroundColor: '$white',
        flexDirection: 'row',
        alignContent: 'center',
        padding: hp(1.5),
        width:'100%'

    },
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2),
        color: '#68bcbc',
        alignSelf: 'flex-start',
    },

});