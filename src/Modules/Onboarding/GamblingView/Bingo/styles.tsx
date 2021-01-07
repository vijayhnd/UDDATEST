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
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    content:{
        padding:'4%',
        paddingTop: '0%',
        paddingBottom: '2%'
    },

    ThirdContainer: {
        width: '100%',
        marginTop: '3%',
    },
    Text_Style: {
        color: '#505050',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    Input_Container: {
        width: '100%',
        marginTop: 8,
        backgroundColor: '#F4F4F4'
    },
    Input_TextStyle: {
        padding: 5,
       
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15
    },
    inputPadding:{
        alignContent: 'center', padding: 3
    }
    ,
    selectgame:{
        padding:5,
        borderWidth:1,
        borderColor: '#68bcbc',
        width:'90%',
    },
    selectgametext:{
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
        color: '#68bcbc',
        textAlign: 'center'
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
    createsquaare:{
        justifyContent: 'center', 
        alignItems: 'center',
        //width: '100%',
        //padding: '6%',
        borderWidth: 1,
        borderColor: '#68bcbc',
        backgroundColor:'#68bcbc',
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
 labelheadtext:{
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
       // textAlign:'center',
        paddingVertical: hp(2.0),
        paddingLeft:10
        
    },
    createsquaaretext:{
        // justifyContent: 'center', 
        // alignItems: 'center',
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    customheadtext1:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.8), 
        color: '#d8480f', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
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
    labelhead2text:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        paddingLeft: 20,
        color:'#888888',
        paddingVertical: hp(1.5),
        textAlign:'justify'
    },
    myteamcontainLabel:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        color:'#000000',
        paddingVertical: hp(2.0),
    },
    mySportteamcontainLabel:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color:'#000000',
        paddingBottom: hp(2.0),
    },
    backtext:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color:'#68bcbc',
        paddingVertical: hp(2.0),
        textDecorationLine:'underline',
        textDecorationColor:'#68bcbc',
        textAlign:'center',
       
    },
    teamlabelcol:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
         color:'#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
        // borderColor: '#cccccc',
        borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign:'center'
    },
    teamlabelcol1:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
         color:'#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
         borderColor: '#cccccc',
       // borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign:'center'
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
    //ashish
    datetimeicon:{ 
        width: '10%', 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    squareBox:{
        width:'20%',
        height:70,
        borderWidth:.5,
        borderColor:'#eeeeee',
        
    },
    itemCenter:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }, 
    customhead:{
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
      },
      customheadtext:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(2.2), 
        color: '#3a9797', 
        //textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
    },
    giftRow:{
        height:50,
        marginBottom:5,
        marginTop:5,
        flexDirection:'row',
        borderWidth:1,
        borderRadius:7,
        borderColor:'#eeeeee'
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
        marginTop: 5
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
    scrollviewstyle: {
        // backgroundColor: 'white',
         width: '95%',
     },
     Line: {
        width: '95%',
        height: 1,
        backgroundColor: '#888888',
        marginVertical: 8,
        marginTop: 10,
        marginBottom: 10
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,
  
    },
    imageclose:{
        justifyContent:'flex-end',
        position:'relative',
        paddingTop:20,
        backgroundColor:'#222',
        paddingLeft:10
    },
});