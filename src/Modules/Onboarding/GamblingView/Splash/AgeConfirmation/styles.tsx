import {Dimensions ,Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
  $dotColorValue: '$dotColor',
  mainContent: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: screenWidth,
    marginTop: hp(12),
    marginBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  logoContainer: {  flex: 1, alignSelf: 'center', alignItems: 'center',justifyContent:'center'},
  titleContainer: {flexDirection:'row', flex: 1, alignSelf:'center', alignItems:'center',paddingTop:hp(2)},
  footer : {flexDirection:'column', flex: 1, alignSelf:'center', alignItems:'stretch', marginBottom: hp(5)},
  footerDots : {flexDirection:'row', alignSelf:'center', alignItems:'stretch', padding:hp(1)},
  checkboxContainer: {alignSelf:'center', alignItems:'stretch' , flex:1, flexDirection:'row'},
  title: {
    fontSize: hp(2),
    color: '#333333',
    textAlign: 'justify',
    alignItems: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});