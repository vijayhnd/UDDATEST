import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    hrline:{
        borderBottomColor: '$backgroundColorHeader',
        borderBottomWidth: hp(.2),
    },
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        // paddingBottom: hp(5)
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    labelheadtext:{
        fontSize: hp(2.0),
        fontFamily: 'Montserrat-Bold',
       // textAlign:'center',
        paddingVertical: hp(2.0),
        paddingLeft:10
        
    },
    labelhead2text:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        paddingLeft: 20,
        color:'#888888',
        paddingVertical: hp(1.5),
        textAlign:'justify'
    },
    myteamcontainLabel:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
        color:'#000000',
        paddingVertical: hp(2.0),
    },
    mySportteamcontainLabel:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color:'#000000',
        paddingBottom: hp(2.0),
    },
    backtext:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-Regular',
        color:'#68bcbc',
        paddingVertical: hp(2.0),
        textDecorationLine:'underline',
        textDecorationColor:'#68bcbc',
        textAlign:'center',
       
    },
    teamlabelcol:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
         color:'#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
        // borderColor: '#cccccc',
        borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign:'center'
    },
    teamlabelcol1:{
        fontSize: hp(1.8),
        fontFamily: 'Montserrat-SemiBold',
         color:'#68bcbc',
        paddingVertical: hp(2.0),
        paddingHorizontal: hp(1.5),
         borderColor: '#cccccc',
       // borderColor: '#68bcbc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign:'center'
    },
    list: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },
});