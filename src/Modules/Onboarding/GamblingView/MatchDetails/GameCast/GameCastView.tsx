import React from "react";
import { View, Text,  ScrollView, TouchableWithoutFeedback, BackHandler, Alert } from "react-native";
import styles from './styles';
import Container from '../../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../../Util/AppValidationComponent";

const ProfilePageContent = {
    key: 'somethun',
    page_title: '',
}

interface G_GameCastViewProps extends AppValidationComponentProps { }

interface G_GameCastViewState extends AppValidationComponentState {
    PlayBoard: any;
}

enum ProfileScreenComponents {
    FirstNameInput = 1,
    LastNameInput,
    EmailInput,
    MobileInput
}

export default class G_GameCastView extends AppValidationComponent<G_GameCastViewProps, G_GameCastViewState>  {
    private playtableData: any
    constructor(props: G_GameCastViewProps) {
        super(props);
        this.state = {
            PlayBoard: 'G'
        }
    }
    componentDidMount() {
     
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    
    

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      handleBackButton() {
        Alert.alert(
          'Exit App',
          'Are You Sure You Want to Exit the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          },], {
            cancelable: false
          }
        )
        return true;
      }
    

    GotoPlay(playboardFlag: any) {
        this.setState({ PlayBoard: playboardFlag });
    }

    render() {
        return (
            <Container title={ProfilePageContent.page_title} isHeader={true} isSubHeader={true} isTitle={true} showIndicator={false}>
                <View style={styles.scrollContent}>
                    <ScrollView style={{
                        width: '100%', height: '100%', marginBottom:10
                    }}>
                        <View style={styles.score_board}>
                            <View style={styles.Team1}>
                                <Text style={styles.Team_Name}>
                                    TEXANS
                            </Text>
                                <View style={styles.Line}>
                                </View>
                                <Text style={styles.Result}>
                                    4 6
                            </Text>
                                <Text style={styles.Count}>
                                    9
                            </Text>
                            </View>
                            <View style={styles.Quaters}>
                                <Text style={styles.Week}>
                                    NFL - WEEK 7
                            </Text>
                                <Text style={styles.Time}>
                                    Now is 5:30PM EST
                            </Text>
                                <Text style={styles.Quater_Count}>
                                    3rd QUATERS
                            </Text>
                            </View>
                            <View style={styles.Team2}>
                                <Text style={styles.Team_Name}>
                                    DOLPHINS
                            </Text>
                                <View style={styles.Line}>
                                </View>
                                <Text style={styles.Result}>
                                    6 6
                            </Text>
                                <Text style={styles.Count}>
                                    30
                                </Text>
                            </View>
                        </View>


                        <View style={styles.Play_Halfs}>
                            <View style={styles.First_Half}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.Text_First_Half}>
                                        1
                            </Text>
                                    <Text style={{
                                        fontSize: 8, color: '#000000', fontFamily: 'Montserrat-SemiBold'
                                    }}>
                                        ST </Text>
                                    <Text style={styles.Text_First_Half}>
                                        Half
                            </Text>
                                </View>
                                <View style={{ width: '70%', height: 2, backgroundColor: '#e22824', justifyContent: 'center' }}>
                                </View>
                            </View>
                            <View style={styles.second_Half}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.Text_Second_Half}>
                                        2
                            </Text>
                                    <Text style={{
                                        fontSize: 8, color: '#000000', fontFamily: 'Montserrat-SemiBold'
                                    }}>
                                        ND </Text>
                                    <Text style={styles.Text_Second_Half}>
                                        Half
                            </Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.Match_Table}>
                            <View style={{ width: '90%', backgroundColor: '#eeeeee', height: 25, borderRadius: 4, flexDirection: 'row' }}>
                                <View style={styles.Team_Name1}>
                                    <Text style={{
                                        color: '#e2211c', fontSize: 12, fontFamily: 'Montserrat-Bold'
                                    }}>
                                        Texans
                            </Text>
                                </View>
                                <View style={styles.Team_Bets}>
                                    <Text style={{
                                        color: '#000000', fontSize: 16, fontFamily: 'Montserrat-Bold'
                                    }}>
                                        BETS
                            </Text>
                                </View>
                                <View style={styles.Team_Name2}>
                                    <Text style={{
                                        color: '#e2211c', fontSize: 12, fontFamily: 'Montserrat-Bold'
                                    }}>
                                        Dolphins
                            </Text>
                                </View>
                            </View>

                            <View style={styles.Team_Bet}>
                                <View style={styles.Team_Name1}>
                                    <Text style={styles.bet_text}>
                                        -216
                            </Text>
                                </View>
                                <View style={styles.Team_Bets_MoneyLine}>
                                    <Text style={{
                                        color: '#000000', fontSize: 12, fontFamily: 'Montserrat-SemiBold'
                                    }}>
                                        Money Line </Text>
                                    <View style={{ width: 11, height: 11, borderRadius: 7, backgroundColor: '#05a9fe', justifyContent: 'center', alignItems: 'center', marginTop: -4 }}>
                                        <Text style={{
                                            color: '#ffffff', fontSize: 10, fontFamily: 'Montserrat-Bold'
                                        }}>
                                            i
                                    </Text>
                                    </View>
                                </View>
                                <View style={styles.Team_Name2}>
                                    <Text style={styles.bet_text}>
                                        +216
                            </Text>
                                </View>
                            </View>

                            <View style={styles.Team_Bet}>
                                <View style={styles.Team_Name1}>
                                    <Text style={styles.bet_text}>
                                        O 21.5
                            </Text>
                                </View>
                                <View style={styles.Team_Bets_MoneyLine}>
                                    <Text style={{
                                        color: '#000000', fontSize: 12, fontFamily: 'Montserrat-SemiBold'
                                    }}>
                                        Total </Text>
                                    <View style={{ width: 11, height: 11, borderRadius: 7, backgroundColor: '#05a9fe', justifyContent: 'center', alignItems: 'center', marginTop: -4 }}>
                                        <Text style={{
                                            color: '#ffffff', fontSize: 10, fontFamily: 'Montserrat-Bold'
                                        }}>
                                            i
                                    </Text>
                                    </View>
                                </View>
                                <View style={styles.Team_Name2}>
                                    <Text style={styles.bet_text}>
                                        U 21.5
                            </Text>
                                </View>
                            </View>

                            <View style={styles.Team_Bet}>
                                <View style={styles.Team_Name1}>
                                    <Text style={styles.bet_text}>
                                        +5.5
                            </Text>
                                </View>
                                <View style={styles.Team_Bets_MoneyLine}>
                                    <Text style={{
                                        color: '#000000', fontSize: 12, fontFamily: 'Montserrat-SemiBold'
                                    }}>
                                        Spread </Text>
                                    <View style={{ width: 11, height: 11, borderRadius: 7, backgroundColor: '#05a9fe', justifyContent: 'center', alignItems: 'center', marginTop: -4 }}>
                                        <Text style={{
                                            color: '#ffffff', fontSize: 10, fontFamily: 'Montserrat-Bold'
                                        }}>
                                            i
                                    </Text>
                                    </View>
                                </View>
                                <View style={styles.Team_Name2}>
                                    <Text style={styles.bet_text}>
                                        -5.5
                            </Text>
                                </View>
                            </View>

                            <View style={{
                                width: '90%',
                                backgroundColor: '#e2211c',
                                height: 27,
                                borderRadius: 4,
                                marginTop: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'Montserrat-Bold' }}>
                                    BET A FRIEND
                             </Text>
                            </View>


                        </View>


                        {/* --------------------------PlayBoard Table-------------------------------=- */}

                        <View style={styles.Main_Score_Table}>
                            <View style={styles.Score_Table}>

                                <View style={{ width: '26%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => this.GotoPlay('G')}>
                                        <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>
                                            Gamecast
                                        </Text>
                                    </TouchableWithoutFeedback>
                                    {this.state.PlayBoard == 'G' ? <View style={styles.line}></View> : null}
                                </View>

                                <View style={[styles.Table_Heading_Text, { width: '22%' }]}>
                                    <TouchableWithoutFeedback onPress={() => this.GotoPlay('B')}>
                                        <Text style={[styles.Table_Heading_Text]}>
                                            Box Score
                                        </Text>
                                    </TouchableWithoutFeedback>
                                    {this.state.PlayBoard == 'B' ? <View style={styles.line}></View> : null}
                                </View>

                                <View style={[styles.Table_Heading_Text, { width: '28%' }]}>
                                    <TouchableWithoutFeedback onPress={() => this.GotoPlay('P')}>
                                        <Text style={styles.Table_Heading_Text}>
                                            Play-by-Play
                                    </Text>

                                    </TouchableWithoutFeedback>
                                    {this.state.PlayBoard == 'P' ? <View style={styles.line}></View> : null}
                                </View>

                                <View style={[styles.Table_Heading_Text, { width: '28%' }]}>
                                    <TouchableWithoutFeedback onPress={() => this.GotoPlay('T')}>
                                        <Text style={styles.Table_Heading_Text}>
                                            Team Stats
                                        </Text>

                                    </TouchableWithoutFeedback>
                                    {this.state.PlayBoard == 'T' ? <View style={styles.line}></View> : null}
                                </View>
                            </View>
                        </View>


                        {/* -------------------------- Game State------------------------------------- */}

                        {this.state.PlayBoard == 'G' ?
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={styles.Main_Group_Table}>
                                    <View style={styles.Group_Table}>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center' }}>
                                            <Text style={styles.text_group1_name}>
                                                TEXANS
                                       </Text>
                                        </View>
                                        <View style={{ width: 2, height: 28, backgroundColor: '#e43a36' }}>
                                        </View>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center', alignItems: 'flex-end', }}>
                                            <Text style={{ color: '#e43a36', fontSize: 14, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>
                                                DOLPHINS
                                            </Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={styles.Main_Game_Table}>

                                    <View style={styles.Main_Row_Container_Total_Count}>
                                        <View style={styles.Row_Container}>
                                            <View style={styles.Team_one_row}>
                                                <Text style={styles.text_team_one_row}>
                                                    2
                                    </Text>
                                            </View>
                                            <View style={styles.Quarter_row}>
                                                <Text style={styles.text_quarter}>
                                                    FIRST QUARTER
                                    </Text>
                                            </View>
                                            <View style={styles.Team_two_row}>
                                                <Text style={styles.text_team_two_row}>
                                                    7
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.Main_Row_Score_Container}>
                                        <View style={styles.Row_Score_Container}>
                                            <View style={styles.Team_one_Score}>
                                                <Text style={styles.text_team_one_score}>
                                                    0
                                    </Text>
                                            </View>
                                            <View style={styles.Players_Time}>
                                                <Text style={styles.text_players_time}>
                                                    TD 9:30
                                    </Text>
                                                <Text style={styles.text_players_count}>
                                                    10 PLAYS 75 YARDS 5:30
                                    </Text>
                                            </View>
                                            <View style={styles.Team_two_Score}>
                                                <Text style={styles.text_team_two_score}>
                                                    7
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.Main_Row_Score_Container}>
                                        <View style={styles.Row_Score_Container}>
                                            <View style={styles.Team_one_Score}>
                                                <Text style={styles.text_team_one_score}>
                                                    0
                                    </Text>
                                            </View>
                                            <View style={styles.Players_Time}>
                                                <Text style={styles.text_players_time}>
                                                    TD 9:30
                                    </Text>
                                                <Text style={styles.text_players_count}>
                                                    10 PLAYS 75 YARDS 5:30
                                    </Text>
                                            </View>
                                            <View style={styles.Team_two_Score}>
                                                <Text style={styles.text_team_two_score}>
                                                    7
                                    </Text>
                                            </View>
                                        </View>
                                    </View>



                                </View>


                            </View>
                            : null
                        }

                        {/* ------------------------------Box Score------------------------------------ */}


                        {this.state.PlayBoard == 'B' ?
                            <View style={{ backgroundColor: 'white' }}>

                                <View>
                                    <View style={styles.B_Main_Group_Table}>
                                        <View style={[styles.B_Group_Table, { borderColor: '#e5e5e5' }]}>
                                            <View style={{ width: '50%', height: 28, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.text_group1_name}>
                                                    TEXANS
                                       </Text>
                                            </View>
                                            <View style={{ width: '50%', height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dddddd', borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                                <Text style={{ color: '#9c9c9c', fontSize: 14, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>
                                                    DOLPHINS
                                            </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.B_Main_Table_Container}>

                                        <View style={styles.B_Table_Name_Container}>
                                            <Text style={styles.B_text_table_name}>
                                                TEXANS PASSING
                                    </Text>
                                        </View>
                                        <View style={styles.B_Main_Table_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={styles.B_Blank_View}>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            C/ATT
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            YDS
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            AVG
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '5%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TD
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            INT
                                             </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            SACKS
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            QRR
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            RTC
                                             </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={styles.B_Blank_View}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            C Kessler
                                             </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            25/43
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {
                                                        width: '10%'
                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            240
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            5.6
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '5%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            1
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            0
                                             </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            4-45
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            453
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            815
                                             </Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                        <View style={styles.B_Main_Total_Table_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={styles.B_Blank_View}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TEAM
                                             </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            25/43
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            195
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            5.6
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '5%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            1
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            0
                                             </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            4-45
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            -
                                             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '10%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            81.5
                                             </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                    </View>






                                    <View style={styles.B_Main_Table_Container}>

                                        <View style={styles.B_Table_Name_Container}>
                                            <Text style={styles.B_text_table_name}>
                                                TEXANS RUSHING
                                            </Text>
                                        </View>
                                        <View style={styles.B_Main_Table_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '40%' }]}>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            CAR
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            YDS
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            AVG
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TD
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '15%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            LONG
                                                        </Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '40%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            L FOURNETTE
                                                         </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            14
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            36
                                                         </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            26
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            0
                                                     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '15%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                                                        </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>

                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '40%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            L FOURNETTE
                                                         </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            14
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            36
                                                         </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            26
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            0
                                                     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '15%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                                                        </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>

                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '40%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            L FOURNETTE
                                                         </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            14
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            36
                                                         </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            26
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            0
                                                     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '15%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                                                        </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>


                                        <View style={styles.B_Main_Total_Table_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '40%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TEAM
     </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            20
     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            60
     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            3.0
     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            0
     </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '15%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            10
     </Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>

                                    </View>








                                    <View style={styles.B_Main_Table_Container}>

                                        <View style={styles.B_Table_Name_Container}>
                                            <Text style={styles.B_text_table_name}>
                                                TEXANS RECEIVING
    </Text>
                                        </View>
                                        <View style={styles.B_Main_Table_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '30%' }]}>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={styles.B_text_first_column}>
                                                            REC
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            YDS
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            AVG
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TD
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            LONG
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={styles.B_text_first_column}>
                                                            TGTS
                </Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '30%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                           D Westbook
                 </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            88
                 </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            12.6
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            1
             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            23
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            10
                </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>


                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '30%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                           D Westbook
                 </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            88
                 </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            12.6
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            1
             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            23
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            10
                </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>



                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '30%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                           D Westbook
                 </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            88
                 </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            12.6
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            1
             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            23
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            10
                </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>


                                        <View style={styles.B_Main_Table_Score_Coloum_Content}>
                                            <View style={styles.B_Table_Colum_Content}>
                                                <View style={styles.B_Column_Content}>

                                                    <View style={[styles.B_Blank_View, { width: '30%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                           D Westbook
                 </Text>
                                                    </View>
                                                    <View style={styles.B_First_Column}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            7
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {

                                                    }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            88
                 </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            12.6
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, {}]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            1
             </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            23
                </Text>
                                                    </View>
                                                    <View style={[styles.B_First_Column, { width: '12%' }]}>
                                                        <Text style={[styles.B_text_first_column, {
                                                            fontFamily: 'Montserrat-Regular',
                                                        }]}>
                                                            10
                </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            : null
                        }


                        {/* ---------------------------Play by play------------------------------------ */}

                        {this.state.PlayBoard == 'P' ?
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={styles.P_Row_Container_Tabs}>
                                    <View style={styles.P_All_Drivers}>
                                        <Text style={styles.P_text_all_drivers}>
                                            All Drivers
                                </Text>
                                        <View style={{ width: '30%', height: 1, backgroundColor: '#e2211c', justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                    </View>
                                    <View style={styles.P_Scoring_Plays}>
                                        <Text style={styles.P_text_scoring_plays}>
                                            Scoring Plays
                                </Text>
                                    </View>
                                </View>

                                <View style={styles.P_Main_Group_Table}>
                                    <View style={styles.P_Group_Table}>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center' }}>
                                            <Text style={{ color: '#e43a36', fontSize: 14, fontFamily: 'Montserrat-Bold', marginLeft: 10 }}>
                                                TEXANS
                                </Text>
                                        </View>
                                        <View style={{ width: 2, height: 28, backgroundColor: '#e43a36' }}>
                                        </View>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center', alignItems: 'flex-end', }}>
                                            <Text style={{ color: '#e43a36', fontSize: 14, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>
                                                DOLPHINS
                                </Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={styles.P_Main_Game_Table}>

                                    <View style={styles.P_Main_Row_Score_Container}>
                                        <View style={styles.P_Row_Score_Container}>
                                            <View style={styles.P_Team_one_Score}>
                                                <Text style={styles.P_text_team_one_score}>
                                                    0
                                    </Text>
                                            </View>
                                            <View style={styles.P_Players_Time}>
                                                <Text style={styles.P_text_players_time}>
                                                    TOUCHDOWN
                                    </Text>
                                                <Text style={styles.P_text_players_count}>
                                                    10 PLAYS 75 YARDS 5:30
                                    </Text>
                                            </View>
                                            <View style={styles.P_Team_two_Score}>
                                                <Text style={styles.P_text_team_two_score}>
                                                    7
                                    </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            : null
                        }

                        {/* ----------------------------Team Statte------------------------------------ */}

                        {this.state.PlayBoard == 'T' ?
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={styles.T_Main_Group_Table}>
                                    <View style={styles.T_Group_Table}>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center' }}>
                                            <Text style={{ color: '#e43a36', fontSize: 14, fontFamily: 'Montserrat-Bold', marginLeft: 10 }}>
                                                TEXANS
                                </Text>
                                        </View>
                                        <View style={{ width: 2, height: 28, backgroundColor: '#e43a36' }}>
                                        </View>
                                        <View style={{ width: '49%', height: 28, justifyContent: 'center', alignItems: 'flex-end', }}>
                                            <Text style={{ color: '#e43a36', fontSize: 14, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>
                                                DOLPHINS
                                </Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={styles.T_Main_Game_Table}>

                                    <View style={styles.T_Main_Row_Container_Total_Count}>
                                        <View style={styles.T_Row_Container}>
                                            <View style={styles.T_Team_one_row}>
                                                <Text style={styles.T_text_team_one_row}>
                                                    17
                                    </Text>
                                            </View>
                                            <View style={styles.T_Quarter_row}>
                                                <Text style={styles.T_text_quarter}>
                                                    1ST DOWNS
                                    </Text>
                                            </View>
                                            <View style={styles.T_Team_two_row}>
                                                <Text style={styles.T_text_team_two_row}>
                                                    21
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.T_Main_Row_Score_Container}>
                                        <View style={styles.T_Row_Score_Container}>
                                            <View style={styles.T_Team_one_Score}>
                                                <Text style={styles.T_text_team_one_score}>
                                                    11
                                    </Text>
                                            </View>
                                            <View style={styles.T_Players_Time}>
                                                <Text style={styles.T_text_players_time}>
                                                    Passing 1st Downs
                                    </Text>
                                            </View>
                                            <View style={styles.T_Team_two_Score}>
                                                <Text style={styles.T_text_team_two_score}>
                                                    9
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.T_Main_Row_Container_Total_Count}>
                                        <View style={styles.T_Row_Container}>
                                            <View style={styles.T_Team_one_row}>
                                                <Text style={styles.T_text_team_one_row}>
                                                    67
                                    </Text>
                                            </View>
                                            <View style={styles.T_Quarter_row}>
                                                <Text style={styles.T_text_quarter}>
                                                    TOTAL PLAYS
                                    </Text>
                                            </View>
                                            <View style={styles.T_Team_two_row}>
                                                <Text style={styles.T_text_team_two_row}>
                                                    57
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.T_Main_Row_Container_Total_Count}>
                                        <View style={styles.T_Row_Container}>
                                            <View style={styles.T_Team_one_row}>
                                                <Text style={styles.T_text_team_one_row}>
                                                    255
                                    </Text>
                                            </View>
                                            <View style={styles.T_Quarter_row}>
                                                <Text style={styles.T_text_quarter}>
                                                    TOTAL YARDS
                                    </Text>
                                            </View>
                                            <View style={styles.T_Team_two_row}>
                                                <Text style={styles.T_text_team_two_row}>
                                                    426
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.T_Main_Row_Container_Total_Count}>
                                        <View style={styles.T_Row_Container}>
                                            <View style={styles.T_Team_one_row}>
                                                <Text style={styles.T_text_team_one_row}>
                                                    11
                                    </Text>
                                            </View>
                                            <View style={styles.T_Quarter_row}>
                                                <Text style={styles.T_text_quarter}>
                                                    TOTAL DRIVERS
                                    </Text>
                                            </View>
                                            <View style={styles.T_Team_two_row}>
                                                <Text style={styles.T_text_team_two_row}>
                                                    10
                                    </Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>

                            </View>
                            : null
                        }



                    </ScrollView>
                </View>

            </Container>
        );
    }
}
