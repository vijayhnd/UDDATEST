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
    // flex: 1
  },
  mainContent: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginBottom: hp(2),
    marginTop: hp(2),
    paddingHorizontal: wp(5)
  },
  scrollviewstyle: {
    backgroundColor: '#ffffff',
    width: '100%',
    marginBottom: hp(2),
  },
  Main_Container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  Second_Container: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#ffffff',
  },
  question_container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#eeeeee',
    marginTop: 2
  },
  text_container: {
    color: '#666666',
    fontSize: 13,
    padding: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  Main_Second_Container: {
    width: '90%',
    height: 'auto',
    alignItems: 'center'
  },
  Answer_Container: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eeeeee',
    elevation: 1,
  },
  text_answer: {
    color: '#333333',
    fontSize: 13,
    padding: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  customheadtext:{ 
    fontFamily: 'Montserrat-Bold', 
    fontSize: hp(2.6), 
    color: 'white', 
    textAlign: 'center', 
    marginTop: 7, 
    alignContent: 'center' 
},
customheadtext1:{ 
  fontFamily: 'Montserrat-Bold', 
  fontSize: hp(2.5), 
  color: 'white', 
  textAlign: 'center', 
 alignContent: 'center' 
}
  
});