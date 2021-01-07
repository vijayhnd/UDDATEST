import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        height: '100%',
        flexGrow: 1,
        flex: 1,
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },

    score_board: {
        height: 68,
        width: '100%',
        backgroundColor: '#b70703',
        flexDirection: 'row',
    },
    Team1: {
        height: 'auto',
        width: '31%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Team_Name: {
        color: '#eeeeee',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold'

    },
    Line: {
        width: 35,
        height: 0.5,
        backgroundColor: '#dddddd'
    },
    Result: {
        color: '#dddddd',
        fontSize: 10,
        fontFamily: 'Montserrat-Regular',

    },
    Count: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'

    },


    Quaters: {
        height: 'auto',
        width: '38%',
        backgroundColor: '#000000',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Week: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold'
    },
    Time: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',

    },
    Quater_Count: {
        color: '#e2211c',
        fontSize: 10,
        fontFamily: 'Montserrat-SemiBold'

    },
    Team2: {
        height: 'auto',
        width: '31%',
        justifyContent: 'center',
        alignItems: 'center'
    },


    Play_Halfs: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    First_Half: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text_First_Half: {
        color: '#000000',
        fontFamily: 'Montserrat-Bold'

    },
    second_Half: {
        width: '20%',
        marginLeft: 10
    },
    Text_Second_Half: {
        color: '#000000',
        fontFamily: 'Montserrat-Bold'

    },

    Match_Table: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    Team_Name1: {
        width: '28%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',

    },
    Team_Bets: {
        width: '45%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#dddddd',
    },
    Team_Name2: {
        width: '28%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    Team_Bet: {
        width: '90%',
        backgroundColor: '#e2211c',
        height: 27,
        borderRadius: 4,
        flexDirection: 'row',
        marginTop: 1,
    },
    bet_text: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold'
    },
    Team_Bets_MoneyLine: {
        width: '45%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#eeeeee',
        flexDirection: 'row'
    },
    Main_Score_Table: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    Score_Table: {
        width: '90%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Table_Heading_Text: {
        height: 'auto',
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Main_Group_Table: {
        width: '100%',
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Group_Table: {
        width: '90%',
        height: 30,
        borderRadius: 50,
        borderColor: '#e2211c',
        borderWidth: 1,
        flexDirection: 'row'
    },


    Main_Game_Table: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        marginBottom: 5
    },
    Main_Row_Container_Total_Count: {
        width: '100%',
        height: 25,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',

    },
    Row_Container: {
        width: '80%',
        height: 25,
        flexDirection: 'row',
        marginTop: 2
    },
    Team_one_row: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_team_one_row: {
        color: '#e2211c',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    Quarter_row: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_quarter: {
        color: '#e2211c',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    Team_two_row: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_team_two_row: {
        color: '#e2211c',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    Main_Row_Score_Container: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 1
    },
    Row_Score_Container: {
        width: '80%',
        height: 35,
        flexDirection: 'row',
    },
    Team_one_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_team_one_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    Players_Time: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_players_time: {
        color: '#000000',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    text_players_count: {
        color: '#000000',
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
    },
    Team_two_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_team_two_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    line: {
        width: '80%',
        height: 2,
        backgroundColor: '#e2211c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_group1_name: {
        color: '#e43a36',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10
    },


    P_Row_Container_Tabs: {
        width: '100%',
        height: 25,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    P_All_Drivers: {
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 5
    },
    P_Scoring_Plays: {
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        marginLeft: 5
    },
    P_text_all_drivers: {
        color: '#e2211c',
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
    },
    P_text_scoring_plays: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
    },
    P_Main_Group_Table: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    P_Group_Table: {
        width: '90%',
        height: 30,
        borderRadius: 50,
        borderColor: '#e2211c',
        borderWidth: 1,
        flexDirection: 'row'
    },
    P_Main_Game_Table: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        marginBottom: 5
    },
    P_Main_Row_Container_Total_Count: {
        width: '100%',
        height: 25,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',

    },
    P_Main_Row_Score_Container: {
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 1
    },
    P_Row_Score_Container: {
        width: '80%',
        height: 35,
        flexDirection: 'row',
    },
    P_Team_one_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    P_text_team_one_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    P_Players_Time: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    P_text_players_time: {
        color: '#000000',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    P_text_players_count: {
        color: '#000000',
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
    },
    P_Team_two_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    P_text_team_two_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },

    T_Main_Group_Table: {
        width: '100%',
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_Group_Table: {
        width: '90%',
        height: 30,
        borderRadius: 50,
        borderColor: '#e2211c',
        borderWidth: 1,
        flexDirection: 'row'
    },
    T_Main_Game_Table: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        marginBottom: 5
    },
    T_Main_Row_Container_Total_Count: {
        width: '100%',
        height: 25,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1
    },
    T_Row_Container: {
        width: '80%',
        height: 25,
        flexDirection: 'row',
        marginTop: 2
    },
    T_Team_one_row: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_team_one_row: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    T_Quarter_row: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_quarter: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    T_Team_two_row: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_team_two_row: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    T_Main_Row_Score_Container: {
        width: '100%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 1
    },
    T_Row_Score_Container: {
        width: '80%',
        height: 25,
        flexDirection: 'row',
    },
    T_Team_one_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_team_one_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },
    T_Players_Time: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_players_time: {
        color: '#000000',
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
    },
    T_Team_two_Score: {
        width: '15%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    T_text_team_two_score: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },




    B_Main_Group_Table: {
        width: '100%',
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    B_Group_Table: {
        width: '90%',
        height: 30,
        borderRadius: 50,
        borderColor: '#e2211c',
        borderWidth: 1,
        flexDirection: 'row'
    },

    B_Main_Table_Container: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        marginBottom: 10,

    },
    B_Table_Name_Container: {
        width: '100%',
        backgroundColor: 'transparent',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    B_text_table_name: {
        width: '85%',
        height: 20,
        color: '#e2211c',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    B_Main_Table_Coloum_Content: {
        width: '100%',
        height: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',


        borderTopColor: '#e4e4e4',
        borderTopWidth: 1,
        borderBottomColor:'#e4e4e4',
        borderBottomWidth:1
    },


    B_Table_Colum_Content: {
        width: '85%',
        height: 25,
        justifyContent:'center',
        alignItems:'center'
    },
    B_Column_Content: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
    },
    B_Blank_View: {
        width: '23%',
        height: 'auto',
    },
    B_First_Column: {
        width: '12%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    B_text_first_column: {
        color: '#000000',
        fontSize: 10,
        fontFamily: 'Montserrat-Bold',
    },
    B_Score_List:{
        width:'100%',
        height:25,
        flexDirection:'row'

    },
    B_Main_Table_Score_Coloum_Content: {
        width: '100%',
        height: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    B_Main_Total_Table_Coloum_Content: {
        width: '100%',
        height: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});





