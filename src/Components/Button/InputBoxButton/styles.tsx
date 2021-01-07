import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default EStyleSheet.create({

    container: {
        alignItems: 'center',
        
    },
    textWrapper:{borderBottomColor: '#666666',borderBottomWidth: 1, paddingBottom: hp(1), marginBottom:hp(1), marginTop:hp(1)},
    text:{textAlign:'center' , color:'#666666' , fontSize: hp(1.4), fontFamily:'Montserrat-Regular'}

});