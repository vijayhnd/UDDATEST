import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
   
    Text_Style_Label_Large: {
        color: '#888888',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    Text_Style_Label_Medium: {
        color: '#888888',
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold'
    },
    Text_Style_Label_Small: {
        color: '#888888',
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Bold'
    },
    Text_Style_Value: {
        fontSize: hp(2.2),
        color: 'black',
        fontFamily: 'Montserrat-Bold'
    },
    Containers: {
        width: '100%',
        marginTop: '3%',
    },
    Input_Containers: {
        width: '100%',
        backgroundColor: '#F4F4F4',
        marginTop: 8,
       
    },
    textboxborder :{
        borderColor: '#cfcfcf', 
        borderRadius: 0, 
        borderWidth: 1
    },
    Input_TextStyles: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.1),
        height:hp(7.1)
    },
});