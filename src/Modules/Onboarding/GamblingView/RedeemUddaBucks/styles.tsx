import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
    },
    mainContent: {
        backgroundColor: '#eeeeee', 
        width: '100%',
        height: '100%'
    },

    // ------------------OrderSummaryDialog------------

    Dialog_Container: {
        width: '100%',
        backgroundColor:'white',
        height: 'auto',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10
    },
    Order_Summary_Text: {
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    Item_Text: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        textAlign: 'right'
    },
    Detail_Container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderWidth: 1,
        marginTop: 10
    },
    Shipping_Address_Text: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold'
    },
    Address_Name_Text: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    Address_Text: {
        color: '#333333',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        width: '40%'
    },
    Order_Review: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        padding: 8
    },
    White_Container: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});