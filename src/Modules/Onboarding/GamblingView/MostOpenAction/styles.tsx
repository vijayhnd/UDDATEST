import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        //paddingBottom: hp(2)
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    //Pooja(22-05-2019)
    titleContainer: {
        flexShrink: 1,
        flexDirection: 'row',
        backgroundColor: '#666666',
        alignItems: 'stretch',
        paddingTop: hp(1),
        paddingBottom: hp(1),
        alignContent: 'center'
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.2),
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    table_titles_container: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table_title_row_container: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    table_title_info_container: {
        width: 8,
        height: 8,
        backgroundColor: '#c8ffff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -2
    },
    table_title_info_text: {
        textAlign: 'center',
        marginRight: 1,
        fontSize: 7,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
    },


    gameheader:{
        width:'100%', 
        backgroundColor:'#f26522' ,
        height:27, 
        marginTop:2,
        alignItems:'center',
        flexDirection:'row'
    },
    gameheadertext:{
        color: 'white', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.9), 
    },
    gameheader_sub_text:{
        color: 'white', 
        fontSize: hp(1.9), 
        fontFamily: 'Montserrat-SemiBold', 
        marginLeft: 4 
    },

    flatlist_title: {
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.3), 
        color: '#888888', 
        width: '100%', 
    },
    flatlist_sub_title: { 
        fontSize: hp(1.3), 
        color: '#888888', 
        width: '100%', 
    },
    flatlist_title_row:{
        flexDirection: 'row', 
        width: '100%', 
        height: 20, 
        backgroundColor: '#DDDDDD', 
        alignItems: 'center'
    },
    flatlist_data_row_vertical_line:{
        width: '2%', 
        height: '100%',
        backgroundColor: '#68bcbc', 
        alignItems: 'center'
    },
    flatlist_data_whole_row:{
        flexDirection: 'row',
        width: '100%',
        height: '100%', 
        alignItems: 'center'
    },
    flatlist_data_4column:{
        width: '98%', 
        height: '100%', 
        backgroundColor: 'white', 
        alignItems: 'center'
    },
    flatlist_data_row_height:{
        flexDirection: 'row', 
        width: '100%', 
        height: 30, 
        alignItems: 'center',
    },
    flatlist_matchup_style:{
        width: '36%',
        height: '100%', 
        backgroundColor: '#efefef', 
        justifyContent: 'center'
    },
    flatlist_matchup_text_style:{
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.4), 
        color: '#68bcbc', 
        paddingLeft: 2
    },
    flatlist_moneyline_style:{
        width: '26%', 
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    flatlist_total_style:{
        width: '20%', 
        height: '100%',  
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    flatlist_spread_style:{
        width: '20%', 
        height: '100%',  
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    flatlist_data_text:{
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(1.6),
    },

    
    // ----------- 08-06-2019
    dialog_triangle: {
        height: 0,
        width: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderBottomWidth: 12,
        borderBottomColor: 'white',
        // marginTop: "-3%",
        backgroundColor: 'transparent'
    },
    dialog_container: {
        backgroundColor: 'white',
        marginLeft: 8,
        marginBottom: 8,
        marginRight: 8,
        borderRadius: 5
    },
    dialog_chackbox_text_style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8),
        padding: 0,
        marginLeft: 1
    },
    dialog_chackbox_container: {
        backgroundColor: 'white',
        borderWidth: 0,
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 0,
        marginRight: 0,
        marginLeft: 3,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    dialog_chackbox_info_text_style: {
        fontSize: hp(1),
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    dialog_chackbox_info_container: {
        // alignSelf: 'flex-start',
        // position: 'absolute',
        backgroundColor: '#15c3c3',
        padding: hp(0.1),
        height: hp(1.4),
        width: hp(1.4),
        borderRadius: hp(1)
    },
    dialogue_text_label_container: {
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        // borderLeftWidth: 5,
        // borderRightWidth: 5,
        // borderColor: 'white',
    },
    dialogue_main_text_label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        backgroundColor: '#dddddd',
        color: 'black',
        paddingTop: 8,
        paddingBottom: 8
    },
    dialogue_sub_text_label: {
        fontFamily: 'Montserrat-Semibold',
        textDecorationLine: 'underline'
    },
    dialog_text_input_container: {
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        borderColor: '#c7c7c7',
        borderWidth: 2,
        margin: 5,
    },
    dialog_or_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.2),
        color: '#68bcbc',
    },
    dialog_text_close_img: {
        height: 12,
        width: 12,
        marginTop: 9,
        position: 'absolute',
    },
    dialog_place_bet_container: {
        backgroundColor: '#68bcbc',
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 21,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2
    },
   



    //-------------------------- More Dialog Style --------------------------------//


    DialogMain: {
        backgroundColor: 'white',
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,
       
    },
    DialogHeaderMain: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white'
    },
    DialogHeaderText: {
        padding: 6,
        paddingTop:0,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.4),
        color: '#e2211c',       
    },
    DialogSubmain: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        width: '100%'
    },
    SearchView: {
        width: '90%',
        height: 25,
        marginTop: 8,
        marginBottom: 4,
        backgroundColor: "white",
        borderRadius: 10
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
        justifyContent:'center'
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
    MatchGameMainContainer: {
        width: '100%',
        backgroundColor: 'white'
    },
    MatchGameContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 1,
        paddingRight: 3,
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: 'white'
    },
    MainGameSubContainer: {
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 3
    },
    MatchGameText: {
        color: '#e2211c'
    },
    MatchGameSub: {
        width: '20%',
        alignContent: 'flex-end'
    },
    MatchGameSubText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.4),
        color: '#e2211c'
    },
    RedLine: {
        width: '100%',
        height: 1,
        marginTop: 2,
        backgroundColor: '#e2211c'
    },
    QuestionContainerMain: {
        width: '100%',
        backgroundColor: 'white'
    },
    QuestionContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: 'white'
    },
    SelectionContainer: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    AnswerContainer: {
        flexDirection: 'column',
        width: '85%',
        height: '100%',
        justifyContent: 'center'
    },
    AnswerText: {
        fontFamily: 'Montserrat-bold',
        fontSize: hp(1.3),
        color: '#222222'
    },
    AnswerOptionContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 2
    },
    AnsweroptionText1: {
        fontFamily: 'Montserrat-bold',
        fontSize: hp(1.1),
        color: '#888888'
    },
    AnsweroptionText2: {
        fontFamily: 'Montserrat-bold',
        fontSize: hp(1.1),
        color: '#888888',
        marginLeft: 5
    },
    BetaDialogMain: {
        width: '100%',
        height: 150,
        padding: 10,
        backgroundColor: '#EEEEEE'
    },
    BetdialogAnswerrow: {
        flexDirection: 'row',
        width: '100%'
    },
    BetdialogAnswerrow1: {
        flexDirection: 'row',
        width: '50%'
    },
    AnswerOptions1: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.2),
        color: '#e2211c'
    },
    Answeroptions2: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.2),
        color: '#333333'
    },
    BetdialogAnswerrow2: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end'
    },
    MyAnswerContainer: {
        width: '100%',
        height: 30,
        marginTop: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    EnterAmountOption: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        marginTop: 2,
        backgroundColor: '#EEEEEE'
    },
    InputAmountOption: {
        width: '60%',
        height: 70,
        margin: 2
    },
    AmountOptionDetail: {
        margin: 2,
        height: 30,
        padding: 4
    },
    AmountOptionDetailText: {
        padding: 1,
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(0.9),
        color: 'black'
    },
    BetButtonMain: {
        width: '40%',
        height: 65,
        margin: 2
    },
    BetButtonSubMain: {
        height: '100%',
        backgroundColor: '#ff9900',
        padding: 4,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 4
    },
    PlaceBetText: {
        paddingTop: 3,
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8),
        color: '#a21310'
    },
    PlaceBetbuttonSub: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PlaceBetButtonText: {
        padding: 1,
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.2),
        color: 'black'
    },
    PlaceBetButtonText2: {
        padding: 1,
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
        color: 'black'
    },
    GreyLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#888888'
    },
    PlayerContainerMain: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    PlayerContainer1: {
        flexDirection: 'row',
        width: '80%',
        paddingLeft: 8,
        alignItems: 'center'
    },
    Playertext: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        color: '#e2211c'
    },
    PlayerNameText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8),
        color: '#e2211c'
    },
    PlayerTeamNameText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.0),
        color: '#e2211c',
        marginTop: 4
    },
    PlayerContainer2: {
        width: '20%',
        alignContent: 'flex-end'
    },
    PlayerBetText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.4),
        color: '#e2211c'
    },
    verify_button: {
        marginTop: hp(3.8),
        paddingTop: hp(0.8),
        paddingLeft: hp(9.0),
        paddingRight: hp(9.0),
        paddingBottom: hp(0.8),

    },
    verify_button_text_style: {
        fontSize: hp(2.5),
        textAlign: 'center'
    },

});