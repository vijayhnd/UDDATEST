import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container:{
        flexGrow:1,
        flexDirection: 'column',
        backgroundColor:'white',
        justifyContent:'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingTop: hp(0.2),
        paddingBottom: hp(1.4) ,
        
       
    },
    matchDateTime:{
        color:'#464646',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.4),
        paddingBottom:hp(0.4)
    },
    viewMore:{
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
        color: '#ff843a', 
        paddingBottom:hp(0.4),
        textDecorationLine: 'underline'
    }
})