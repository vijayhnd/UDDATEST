import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
     maincontainercustom: {
        flex: 1,
        padding: 0,
        },
    customhead: {
        height: 60,
        backgroundColor: '#68bcbc',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },headerTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.6),
        textAlign: 'center',
        color: '#ffffff',

    },
    customheadtext:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(2.6), 
        color: 'white', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
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
	headerviewdialog:{
    backgroundColor:'#68bcbc',
    height:hp(5),
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10
},
datetimeicon:{ 
    width: '10%', 
    justifyContent: 'center', 
    alignItems: 'flex-end' 
},
customtextinputpool:{ 
    marginTop:5,
    width: '100%',   
    backgroundColor: 'white' ,
    // backgroundColor: '#eeeeee' ,
    borderColor: '#cfcfcf',
     borderWidth: 1,
      borderRadius: 3
},
customtextinputpool1:{ 
    marginTop:5,
    width: '100%',   
    backgroundColor: '#eeeeee' ,    
      borderRadius: 3
},
datetimetext:{              
    fontFamily: 'Montserrat-SemiBold',           
    fontSize: hp(1.6), 
    paddingLeft:10
},
settlepool:{
    color:'white',
    textAlign:'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp(2), 
},
imageclose:{
    justifyContent:'flex-end',
    position:'relative',
    paddingTop:20,
    backgroundColor:'black',
    paddingLeft:10
},
hrline1: {
    borderBottomColor: '$backgroundColorHeader',
    borderBottomWidth: hp(.3),
    
},
})
