import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
export const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    mainContainer:{
        width:screenWidth,
        flexDirection: 'row',
        // paddingTop: hp(0.5),
        // paddingBottom: hp(0.5),
        backgroundColor:'$backgroundColorHeader'
    },
    leftArrowIconStyle: {
        position:'absolute',
        left:wp(1),
    },
    rightArrowIconStyle: {
        position:'absolute',
        right:wp(1),
    },
    arrowBGImageStyle: {
        alignSelf:'stretch',
        
    },
    arrowContainerStyle:{
        position:'absolute',
        top:0,
        bottom:0,
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'center'
    },
    leftArrowContainerStyle: {
        left:0,
        
    },
    rightArrowContainerStyle: {
        
        right:0,
        
    },
    scrollContent: {
        padding: 0,
        flexGrow:1
    },
    innerSportContainer:{
        flexDirection: 'column',
        width: '100%',
        // paddingLeft: wp(10),
        // paddingRight: wp(10)
    },
    topSportListContainer:{
        flexDirection: 'row',
        height: hp(4),
        // paddingLeft: wp(3),
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    bottomSportListContainer:{
        flexDirection: 'row',
        height: hp(4),
       
        paddingTop: hp(0.2)
    }
})