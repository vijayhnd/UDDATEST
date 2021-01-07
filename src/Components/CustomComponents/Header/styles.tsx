import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    headerMainContainer:{
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignContent: 'center',
        width:'$screenWidth'
    },
    paddingForContainer:{
        padding:hp(1)
    },
    menuButtonContainer:{
        paddingVertical: hp(1),
        flexDirection: 'row',
    },
    searchBarContainer:{
       flexGrow: 1,
        paddingVertical: hp(1),
        
    },
    logoContainer:{
        paddingVertical: hp(1)
    },
    textStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '$appRed'
    },


    searchBoxMainContainer:{
        flex: 1,
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchBoxContainer:{
        flexGrow: 1,
        flexDirection:'row',
        alignItems: 'stretch',
        alignContent: 'center',
        padding: wp(2),
    },
    inputTextStyle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.4),
        color: '$inputBoxLightColor',
        paddingVertical: 0,
        width:wp(25)
    },
    searchIconContainer:{
        padding: wp(2),
    },
    CloseView: {
        width: '5%',
    },
    Line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#cccccc',
        padding:0
        },
    Spinner_Container: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },
    Filter_Container: {
        width: '50%',
        flexDirection: 'column',
       // alignItems:'center'
    },
    Sort_Container: {
        width: '80%',
        flexDirection: 'row'
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