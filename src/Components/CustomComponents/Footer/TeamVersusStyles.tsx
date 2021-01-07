import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container:{
        flexShrink:1,
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems: 'center',
        width:'auto',
        alignSelf: 'stretch',
        paddingLeft: hp(0.2),
        paddingRight: hp(0.2),
        paddingTop: hp(0.4),
        paddingBottom: hp(0.4),
        
    },
    teamName:{
        flex: 1,
        color:'black',
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.6)
    },
    versusText:{
        color:'#5A5A5A',
        flex: 0.4,
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.4)
    }
})