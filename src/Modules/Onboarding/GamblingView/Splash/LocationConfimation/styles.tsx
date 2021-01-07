import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
  $dotColorValue: '$dotColor',
  scrollContent: {
    alignItems: 'center',
    width: '100%',
    padding: 0,
    flexGrow: 1
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
  mainContent: {
    //flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '$screenWidth',
    flexDirection: 'column',
    marginBottom: hp(2),
    //marginTop: hp(2),
    paddingHorizontal: wp(5)
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: wp(3),
  },
  headTitle: {
    fontSize: hp(3),
    color: '#333333',
    textAlign: 'justify',
    marginLeft: wp(5),
    marginRight: wp(5),
    marginBottom: wp(1),
    fontFamily: 'Montserrat-Regular'
  },
  headTitle_normal: {
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
  },
  headTitle_bold: {
    color: '#333333',
    fontFamily: 'Montserrat-Bold'
  },
  title: {
    fontSize: hp(1.8),
    color: '#333333',
    textAlign: 'justify',
    fontFamily: 'Montserrat-SemiBold'
  },
  title_link: {
    textDecorationLine: 'underline',
    color: '#E2211C',
    paddingVertical: 5
  },
  checkboxContainer: { alignSelf: 'flex-start', alignItems: 'stretch', flexDirection: 'row',marginTop: wp(1)},
  footerDots : {flexDirection:'row', alignSelf:'center', alignItems:'stretch', padding:hp(1)},
});