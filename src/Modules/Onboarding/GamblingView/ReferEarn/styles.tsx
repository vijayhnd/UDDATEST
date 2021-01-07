import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
  $dotColorValue: '$dotColor',
  scrollContent: {
    width: screenWidth,
    height: screenHeight,
    padding: 0,
    flexGrow: 1,
    flex: 1
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerRow :{
    flexDirection :'row',
    alignContent: 'center',
    width:'$screenWidth'
    
  
  },
  scrollviewstyle: {
    backgroundColor: '#ffffff',
    width: '100%',
    marginBottom: hp(2),
  },
  header:{
    width: '100%',
    height: hp(40),
    backgroundColor: '#67BCBE',
  },
  Main_Container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
 mainHeader :{
  height :wp(100),
  backgroundColor:'#67BCBE'
 },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
   
  },
  headerText:{
    color:'white',
    textAlign:'left',
    fontSize: hp(2.5),
    marginLeft:wp(5),
    fontFamily: 'Montserrat-Medium',
  },
  rightContainer: {
    justifyContent: 'flex-end',
    marginRight:wp(10)
  },
  middleElement :{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  referSection :{
    width: '85%',
    marginLeft:wp(6.5),
    marginRight:wp(6.5),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor:'#fff',
    height:wp(40),
    marginTop:wp(-14),
    borderRadius:wp(2),
 
       // elevation: 5,
   
 
  },
  firstMsg :{
    color:'#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(6),
    marginLeft:wp(5),
    marginTop: wp(5)
  },
  secondMsg :{
    color:'#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.8),
    marginLeft:wp(5),
    marginTop: wp(1)
  },
  thirdMsg:{
    color:'#67BCBE',
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.5),
    marginLeft:wp(5),
    marginTop: wp(1)
  },
  referCode:{
    width: '85%',
    marginLeft:wp(6.5),
    marginRight:wp(6.5),
    marginTop:wp(5),
    flexDirection: 'row'
  },
  leftRefer:{
    justifyContent: 'flex-start',
    marginLeft:wp(5)
   
  },
  rightRefeer:{
    justifyContent: 'flex-end',
    marginRight:wp(5)
  
  },
  ReferralCodeSection :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:60,
  },
  code :{
    color:'#000',
    letterSpacing: 2,
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(4),
    textAlign:'left'
  },
  textCode :{
    color:'#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4),
  },
  totalEarned:{
    width: '85%',
    marginLeft:wp(6.5),
    marginRight:wp(6.5),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor:'#fff',
    height:wp(35),
    marginTop:wp(5),
    borderRadius:wp(2),
    flexDirection :'row'
  },
  rightImage:{
    justifyContent:'flex-end',
    marginRight:wp(5),
    marginTop :wp(1)                                                                                
 
  },
  totalLeft:{
   justifyContent :'flex-start',
   marginLeft:wp(4),
   marginTop:wp(5)
  }
 
  
});