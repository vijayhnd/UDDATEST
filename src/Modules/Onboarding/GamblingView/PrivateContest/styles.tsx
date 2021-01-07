import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
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
      fontSize: hp(2.0),
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
    mainContent: { 
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    TextStyle: {
        color: '#68bcbc',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    Text_Container: {
        backgroundColor: 'white',
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    Second_Container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    ThirdContainer: {
        width: '90%',
        marginTop: 13
    },
    Text_Style: {
        color: 'black',
        fontSize: 10,
        fontFamily: 'Montserrat-Bold'
    },
    Input_Container: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 8
    },
    Input_TextStyle: {
        padding: 5,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12
    },
    // verify_button: {
    //     marginTop: hp(3.8),
    //     paddingTop: hp(0.8),
    //     paddingLeft: hp(12.0),
    //     paddingRight: hp(12.0),
    //     paddingBottom: hp(0.8),
    //     backgroundColor:'#68bcbc'
    // },
    // verify_button_text_style: {
    //     fontSize: hp(2.5),
    //     textAlign: 'center',
    //     color:'white'
    // },
    verify_button: {
        marginTop: hp(3.8),
        paddingTop: hp(0.8),
        paddingLeft: hp(9.0),
        paddingRight: hp(9.0),
        paddingBottom: hp(0.8),
        backgroundColor:'#68bcbc'
    },
    verify_button_text_style: {
        fontSize: wp(4.5), // garima  hp(2.5)
        textAlign: 'center'
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
    itemCenter:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
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
    createsquaaretext:{
        // justifyContent: 'center', 
        // alignItems: 'center',
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        textAlign: 'center'
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
    ThirdContainers: {
        width: '100%',
        marginTop: '3%',
    },
	
	 Input_Containers: {
        width: '100%',
        backgroundColor: '#F4F4F4',
        marginTop: 8,
       
    },
    Input_TextStyles: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.1),
        height:hp(7.1)
    },
	customheadtext1:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(2.6), 
        color: 'white', 
        textAlign: 'center', 
        marginTop: 5, 
        alignContent: 'center' 
    },
    Text_Style_Label: {
        color: '#505050',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    content:{
        padding:'2%',
        paddingTop: '0%',
        paddingBottom: '2%'
    },
    inputPadding:{
      //  alignContent: 'center', padding: 3,
    },
    textboxborder :{ borderColor: '#cfcfcf', 
    borderRadius: 0, 
    borderWidth: 1, },
    calenderTextCss:{
        color: 'black', fontFamily: 'Montserrat-SemiBold', padding: 12 ,  fontSize: hp(2.1),
    },
    heightCalender:{
        height:hp(7.1),
        justifyContent: 'center',
        alignContent: 'center',
    },
    Text_Style_toggle_Label: {
        color: '#505050',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-SemiBold'
    },

    
});