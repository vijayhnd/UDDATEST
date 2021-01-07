import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    maincontainercustom:{ 
        flexDirection: 'column',
        paddingTop: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
     },
     customhead:{
          height: 60,
          backgroundColor: '#68bcbc',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center'
        },
        customheadtext:{ 
            fontFamily: 'Montserrat-Bold', 
            fontSize: hp(2.6), 
            color: 'white', 
            textAlign: 'center', 
            marginTop: 7, 
            alignContent: 'center' 
        },
        customquestion:{ 
            flexDirection: 'column', 
            width: '95%',
            height:hp(15.9) ,
            marginTop:hp(1.9)
        },
        customtextinput:{ 
            marginTop:5,
            width: '95%', 
            borderColor: '#cfcfcf', 
            borderRadius: 3, 
            borderWidth: 1, 
            backgroundColor: '#eeeeee' 
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
        customanswere:{ 
            flexDirection: 'column', 
            width: '95%',
            marginTop:10,
            height:hp(8.1),
            minHeight:50
        },
        oddcustomtext:{ 
            paddingBottom: 8, 
            paddingTop: 15, 
            width: '100%', 
            fontFamily: 'Montserrat-Semibold', 
            fontSize: hp(2.1), 
            color: '#a9a9a9' 
        },
        datetimetext:{              
            fontFamily: 'Montserrat-SemiBold',           
            fontSize: hp(1.6), 
            paddingLeft:10
        },
        datetimeicon:{ 
            width: '10%', 
            justifyContent: 'center', 
            alignItems: 'flex-end' 
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
        betamount:{ 
            borderColor: '#cfcfcf', 
            borderWidth: 1,
            borderRadius: 3,
            width: '95%', 
            backgroundColor: '#eeeeee',
            height: hp(8.1), 
            flexDirection: 'row',
            marginTop:10,
            alignContent:'center',
            alignItems:'center' 
        },
        toggleButton:{
            justifyContent:'center',
            flexDirection:'row',
            alignContent:'center',
            alignItems:'center',
            marginTop:10,
            marginBottom:0
        },
        toggleText:{
              fontFamily: 'Montserrat-Bold', 
            fontSize: hp(1.9),
            marginRight:3
        },
        poolborder:{
            borderBottomWidth:1,
            width:'100%',
            borderBottomColor:'#eeeeee',
            marginTop:10,
            marginBottom:10
        },
        table_title_info_text: {
            textAlign: 'center',
            // marginRight: 1,
            fontSize: 7,
            color: '#000000',
            fontFamily: 'Montserrat-Bold',
        },
        table_title_info_container: {
            width: 12,
            height: 12,
            backgroundColor: '#c8ffff',
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: -2
        },

        // css for settlepool page

        poolmaincontainer:{
            borderWidth:6,
            borderColor:'#cfcfcf',
            borderRadius:4,
            marginBottom:5
        },
        customtextinputpool:{ 
            marginTop:5,
            width: '100%', 
            borderColor: '#f4f4f4', 
            borderRadius: 3, 
            borderWidth: 0, 
            backgroundColor: '#eeeeee' 
            
        },
        settlepool:{
            color:'white',
            textAlign:'center',
            fontFamily: 'Montserrat-Bold',
            fontSize: hp(2.8), 
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
        headerviewdialog:{
            backgroundColor:'#68bcbc',
            height:hp(5),
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
            marginBottom:10
        },



        //// deep link name
        scrollContent: {
            padding: 0,
            width: '100%',
            alignItems: 'center',
            flexGrow: 1,
        },
        scrollviewstyle: {
            backgroundColor: 'white',
            width: '100%',
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
        Line: {
            width: '95%',
            height: 1,
            backgroundColor: '#888888',
            marginVertical: 8,
            marginTop: 10,
            marginBottom: 10
        },
        Profile_Container: {
            width: '100%',
            flexDirection: 'row',
            marginTop: 10
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
        deepPlace:{ 
            width: '100%',
            height:hp(12),
            borderColor: '#cfcfcf', 
            borderWidth: 1, 
            borderRadius: 4,
            backgroundColor: '#69bbbb',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',
            paddingTop:5,
            paddingBottom:5
        },
        Main_WhiteColor_Container: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10
        },
        Main_WhiteColor_Container1: {
            width: '100%',
            alignItems: 'center',
            paddingLeft:5,
            paddingRight:5
            // marginBottom: 10,
            // marginTop: 10
        },
})
