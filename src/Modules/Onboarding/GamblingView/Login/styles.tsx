import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
 
export default EStyleSheet.create({
  $dotColorValue: '$dotColor',
  scrollContent: {
    width: screenWidth,
    height: screenHeight,
    padding: 0
  },

 twitterButtonStyleLogin: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0084b4',
  borderColor: '#0084b4',
  borderRadius: 5,
  marginTop:5,
  height:60
  
  },
  ImageIconStyleTwiter: {
  padding: 10,
  marginLeft:20,
  margin: 5,
  height: 30,
  width: 30,
  resizeMode: 'stretch',
  },
  TextStyleTwiter: {
  color: '#fff',
  marginBottom: 4,
  marginRight: 20,
  fontSize: hp(2.1),
  fontFamily: 'Montserrat-SemiBold',
  textAlign:'center'
  },
  mainContent: {
    
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginBottom: hp(2),
    //marginTop: hp(2),
    paddingHorizontal: wp(5)
  },
  image: {
    width: 320,
    height: 320,
  },
  inputBoxesWrapper: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: hp(1),
    paddingBottom: hp(1)
  },
  inputBoxWrapper: {


  },
  forgot_password_remember_me_wrapper: {

    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  forgot_password_wrapper: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  checkboxContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  forgot_password_remember_me: {
    fontSize: hp(1.8),
    color: '#68bcbc',
    textDecorationLine: 'underline'
  },
  sign_in_details_wrapper: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    paddingTop: hp(1)
  },
  sign_in_button_wrapper: {
    backgroundColor: 'yellow'
  },
  sign_in_button: {
    paddingTop: hp(0.8),
    paddingBottom: hp(1),

  },
  sign_in_button_text_style: {
    fontSize: hp(3.8),
    textAlign: 'center'
  },
  create_account_guest_user_wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: hp(2),
   // paddingLeft: wp(2)
  },
  create_account_wrapper: {
    alignItems: 'flex-start',
    flex: 1,

  },
  guest_user_wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  create_account_guest_user: {
    fontSize: hp(2),
    color: '#68bcbc',
    fontFamily: 'Montserrat-Bold',
    textDecorationLine: 'underline'
  },
  social_buttons_wrapper: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
     
    
  },
  social_button_wrapper: {
    marginVertical: hp(1)
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  footerDots: { flexDirection: 'row', alignSelf: 'center', alignItems: 'stretch', },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d34836',
    borderColor: '#fff',
    borderRadius: 5,
    marginTop:5,
    
    },
    ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
    },
    TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
    fontSize: hp(2.1),
    fontFamily: 'Montserrat-SemiBold'
    },
    SeparatorLine: {
    backgroundColor: '#fff',
    marginLeft: 15,
    },
    title_link: {
      textDecorationLine: 'underline',
      color: '#E2211C',
      paddingVertical: 5
    },
    });