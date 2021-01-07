import EStyleSheet from 'react-native-extended-stylesheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: '#DBDBDB',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
        paddingTop: hp(0.8),
        paddingBottom: hp(0.8)
    }
})