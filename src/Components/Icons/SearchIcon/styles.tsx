import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

    CloseView: {
        alignItems: 'flex-end',
        width: '100%',
    },
    Line: {
        width: '100%',
        height: 1,
        backgroundColor: '#cccccc',
        marginTop: 10,
        marginBottom: 10,
        padding:0
        },
    Spinner_Container: {
        width: '100%',
        flexDirection: 'row'
    },
    Filter_Container: {
        width: '50%',
        flexDirection: 'row',
        alignItems:'center'
    },
    Sort_Container: {
        width: '50%',
        flexDirection: 'row'
    },
    searchBoxMainContainer: {
        flex: 1,
        borderColor: '#cccccc',
        borderWidth: 0,
        borderRadius: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchBoxContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: wp(1),
    },
    FilterContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 25,
        marginTop: 4,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FilterText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.4),
        color: '#333333'
    },
    FilterBox: {
        flexDirection: 'row',
        width: '70%',
        height: 25,
        marginBottom: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: '#333333',
        borderWidth: 1,
        justifyContent: 'center'
    },
    OkButtonContainer: {
        width: '20%',
        height: 25,
        backgroundColor: '#e2211c',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 4,
        borderBottomEndRadius: 4
    },
    OkButtonText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
        color: 'white'
    },

});