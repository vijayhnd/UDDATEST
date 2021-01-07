import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
        fontSize: hp(2.6), 
        color: '#3a9797', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
    },
    customheadtext1:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.8), 
        color: '#d8480f', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
    },
    placebutton:{ 
        backgroundColor: '#68bcbc',
        height: hp(10.5),
        width:'100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignContent: 'center',
        borderWidth: 1, 
        borderColor: 'white',
    },
    toptext:{
        width:'65%',
        padding:5,
        backgroundColor:'#68bcbc',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    dropdown:{
        width:'25%',
        padding:5,
        backgroundColor:'#888888',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    sidetext:{
        width:'10%',
        backgroundColor:'#68bcbc',
        padding:13,
        justifyContent:'center',
        alignContent:'center'
    },
    header1:{
        height:60,        
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        borderRightWidth: 1,
        borderLeftColor: '#c6c6c6',
        borderRightColor: '#c6c6c6',
        borderBottomColor: '#c6c6c6',
        borderBottomWidth:1
    },
    Text_Style: {
        color: '#505050',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    flatlist_matchup_text_style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.0),
        color: '#68bcbc',

    },
    header2:{
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        borderRightWidth: 1,
        borderLeftColor: '#c6c6c6',
        borderRightColor: '#c6c6c6',
        borderBottomColor: '#c6c6c6',
        borderBottomWidth:1
    },
    table_title_info_container: {
        width: 20,
        height: 20,
        backgroundColor: '#c8ffff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: -2
    },
    table_title_info_text: {
        textAlign: 'center',
        marginRight: 5,
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,
   
    },
    quartertext:{
        fontSize: hp(2.2),
         color: 'black',
          fontFamily: 'Montserrat-Bold',
          textAlign:'center'
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
    Line: {
        width: '95%',
        height: 1,
        backgroundColor: '#888888',
        marginVertical: 8,
        marginTop: 10,
        marginBottom: 10
    },
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
    },
    scrollviewstyle: {
       // backgroundColor: 'white',
        width: '95%',
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
    //hearder2:{height:60,justifyContent:'flex-end',borderRightWidth: 1,borderLeftColor: '#c3c3c3',borderBottomWidth:1}
    
})