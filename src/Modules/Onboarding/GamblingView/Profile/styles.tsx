import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: hp(2)
    },
    mainContent: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'center'
    },
    pageTitleContainer: {
    },
    profileDetailsContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '$backgroundColorHeader'
    },
    profilePhotoContainer: {
        width: wp(30),
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        paddingTop: hp(1)
    },
    photoContainer:{
        paddingLeft:wp(5),
        paddingRight:wp(5)
    },
    changePhotoTextWrapper:{
        padding: hp(1)
    },
    change_photo_text: {
        fontSize: hp(1.3),
        color: '$appGreen',
        textDecorationLine: 'underline'
    },
    profileFieldsContainer: {
        flexGrow: 2,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5)
    },
    inputBoxesWrapper: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        
    },
    inputBoxWrapper: {
        
    },
    inputBoxTextStyle:{
        color: '$inputBoxLightColor'
    },
    buttonWrapper:{ 
        alignSelf: 'stretch', 
        alignItems: 'stretch', 
        flexDirection: 'column' ,
        paddingTop: hp(2)
    },
    profileSettingsContainer: {
        backgroundColor: '$white',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    settingsItemsWrapper: {
        flexDirection:'column',
        alignItems: 'center',
        padding: wp(5)
    },
    settingsItem: {
        flexDirection:'column',
        alignItems: 'center'
    },
    log_out_wrapper: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        paddingHorizontal: wp(5)
    },
    log_out_button_wrapper: {
    },
    log_out_button: {
        paddingTop: hp(0.8),
        paddingBottom: hp(1),
    },
    log_out_button_text_style: {
        fontSize: hp(3),
        textAlign: 'center'
    },
    NameHeaderContainer: {
        backgroundColor: '$white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: hp(5.5),
        textAlign:'center',
        justifyContent:'center' //garima
    },
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '#68bcbc',
       // alignSelf:'flex-start',
       justifyContent:'center'
    },
    levelStyle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.5),
        color: 'black',
        alignSelf: 'center',
    },
    levelAnsStyle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.0),
        color: 'white',
        backgroundColor:'#68bcbc',
        padding: 3,
        marginLeft: 3,
        alignSelf: 'center',
    },
    customtextinput:{ 
        marginTop:5, 
        borderColor: '#cfcfcf', 
        borderRadius: 3, 
        borderWidth: 1, 
        backgroundColor: 'white' 
    },
    table_title_info_container: {
        width: 12,
        height: 12,
        backgroundColor: '#c8ffff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: -2
    },
    table_title_info_text: {
        textAlign: 'center',
        // marginRight: 1,
        fontSize: 7,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
    },
});