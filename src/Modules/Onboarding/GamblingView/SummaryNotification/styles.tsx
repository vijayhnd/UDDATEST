import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
    scrollContent: {
        width: screenWidth,
        //height: screenHeight,
        paddingHorizontal: '2%',
        flexGrow: 1,
        flex: 1
    },
    customhead: {
        height: 60,
        backgroundColor: '#68bcbc',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    mainContent: {
        //backgroundColor: '#eeeeee',
        width: '100%',
        height: '100%'
    },
    listItem: {
        borderBottomColor: '$dividerColor', 
        borderBottomWidth: 1
    },
    leaguetext: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.8),
        textAlign: 'center',
        color: '#ffffff',
    },
    Current_Text_Style: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.2)
    },
    customheadtext:{ 
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.3),
        color: '#68bcbc',
       // alignSelf:'flex-start',
       justifyContent:'center'
    },
    viewMore:{
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
        color: '#ff843a', 
        paddingBottom:hp(0.4),
        textDecorationLine: 'underline'
    },
  
});