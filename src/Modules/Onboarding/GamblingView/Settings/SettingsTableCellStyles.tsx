import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    mainContent:{
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: '#68bcbc',
        paddingLeft: wp(18),
        paddingRight: wp(2),
        height: hp(6),
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    titleStyle:{
        textAlign: 'left',
        color: 'black',
        fontSize: hp(2),
        fontFamily: 'Montserrat-Regular',
        //backgroundColor: 'yellow',
    },
    switch:{
        justifyContent:'center',
        //backgroundColor: '#68bcbc'
    }
})