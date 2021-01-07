import {  Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
  $dotColorValue: '$dotColor',
  scrollContent:{
    width: screenWidth,
    height: screenHeight,
    padding: 0
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginBottom: hp(2) ,
    marginTop: hp(2),
    paddingHorizontal: wp(5)
  },
  image: {
    width: 320,
    height: 320,
  },
  textWrapper:{
    paddingTop: hp(4)
  },
  textStyle:{
    fontFamily: 'Montserrat-SemiBold',
    color: '#585858',
    fontSize: hp(1.8)
  },
  inputBoxesWrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent:'flex-start',
    paddingBottom: hp(10)
  },
  inputBoxWrapper: {
    
    height: hp(5)
    
  },
  otpTextStyle:{
    textAlign: 'center',
    padding:0
  },
  resend_OTP_wrapper: {

    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingTop: hp(4),
    paddingBottom: hp(2)
  },
  resend_wrapper: {
    alignSelf: 'center',
  },
  checkboxContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  resend_OTP_text: {
    fontSize: hp(1.8),
    color: '#68bcbc',
    textDecorationLine: 'underline'
  },
  verify_button_details_wrapper: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    paddingTop: hp(1)
  },
  verify_button_wrapper: {
    backgroundColor: 'yellow'
  },
  verify_button: {
    paddingTop: hp(0.8),
    paddingBottom: hp(1),

  },
  verify_button_text_style:{
    fontSize: hp(3.8),
    textAlign: 'center'
  },
  create_account_guest_user_wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: hp(2),
    paddingLeft:wp(2)
  },
  create_account_wrapper: {
    alignItems:'center',
    flex: 1,
    
  },
  guest_user_wrapper:{
    alignItems:'center',
    flex: 1,
  },
  create_account_guest_user: {
    fontSize: hp(2),
    color: '#e2211c',
    fontFamily: 'Montserrat-Bold',
    textDecorationLine: 'underline'
  },
  social_buttons_wrapper:{
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems:'stretch',
    paddingTop:hp(2.5)
  },
  social_button_wrapper:{
    marginVertical:hp(1)
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  footerDots : {flexDirection:'row', alignSelf:'center', alignItems:'stretch', padding:hp(1)}
});