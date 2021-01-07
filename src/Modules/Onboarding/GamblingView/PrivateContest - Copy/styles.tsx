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
        backgroundColor: '#68bcbc',
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
});