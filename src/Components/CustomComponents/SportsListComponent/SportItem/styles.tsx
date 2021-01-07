import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    sportItemContainer: {
        // backgroundColor: '#BFBFBF',
        // margin: 1,
        alignItems: 'center',
        width:wp(18), 
         justifyContent: 'center',
        textAlign: 'justify',
        //  paddingTop: wp(1),
        //  paddingBottom: wp(4),
        // paddingRight: wp(7),
        //  borderRadius: wp(1),
        flexDirection:'column',
        // borderWidth: 1,
        // borderColor: '$backgroundColorHeader', 
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderBottomColor: '$backgroundColorHeader', 
        borderTopColor: '$backgroundColorHeader',         
         
    },
    textStyle: { 
        color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.0), textAlign: 'center', paddingRight: wp(1.9),
         paddingLeft: wp(1),paddingTop:3,alignItems: 'center',
    }

});