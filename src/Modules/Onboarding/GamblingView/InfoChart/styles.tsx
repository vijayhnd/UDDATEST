import {  Dimensions } from 'react-native';
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
    flex: 1,
    // paddingBottom: hp(2),
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
  titleContainer:{
    backgroundColor: '$white',
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    padding: hp(1.5)

},
textStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp(2.3),
},

textFlatlistStyle: {
  fontFamily: 'Montserrat-SemiBold',
  fontSize: hp(1.5),
},
bg_flatlist:{
  paddingVertical: 6, 
  justifyContent: 'center', 
  alignItems: 'center', 
  borderBottomColor: '#999999', 
  borderBottomWidth: 1,
  borderRightColor: '#999999',
  borderRightWidth: 1,
},
bg_flatlist_2:{
  paddingVertical: 6, 
  justifyContent: 'center', 
  alignItems: 'center', 
  borderTopColor: '#999999', 
  borderTopWidth: 1,
  borderRightColor: '#999999',
  borderRightWidth: 1,
}
  
});