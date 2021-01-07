import React, { Component } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Dialog } from 'react-native-simple-dialogs';

import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../Util/AppValidationComponent";
import { Text } from "react-native-elements";
import styles from './styles';
import { Dropdown } from 'react-native-material-dropdown';
import Application from "../../../Entities/Application";
import AlertUtil from "../../../Util/AlertUtil";
import { FlatList } from "react-native-gesture-handler";
import Container from "../../../Components/Container";






interface ProfileViewProps extends AppValidationComponentProps {


}

interface ProflieViewState extends AppValidationComponentState {

    NoData: any
    Dialog: any
    BlackDialog: any
    DataList: any
}


export class SearchIcon extends Component<ProfileViewProps, ProflieViewState> {

    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

    constructor(props: any) {
        super(props);
        this.state = {
            Dialog: false,
            NoData: '',
            BlackDialog: ' ',
            DataList: []
        }
    }

    showMoreDialog(isShow: any) {
        this.setState({ Dialog: isShow });
        this.callMethod('Falcons');
    }

    callMethod(teamname: any) {
        var params: any = {
            'teamName': teamname,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch('http://34.203.164.56/v1/apiNew/searchMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Search Result' + JSON.stringify(responseJson));
                if (responseJson.length > 0) {
                    this.setState({ DataList: responseJson })
                    this.setState({ NoData: false });
                }
                else {
                    this.setState({ NoData: true });
                }

            })
            .catch(error => console.log(error)) 
    }


    getDialogue2(BlackDialog: any) {
        this.setState({ BlackDialog: BlackDialog });
    }




    render() {
        let data = [{
            value: 'MY BETS',
        }, {
            value: 'Match / Game ',
        },
        {
            value: 'Date / Schedule ',
        },
        {
            value: 'Player Name ',
        }];

        let data2 = [{
            value: 'Asc',
        }, {
            value: 'Desc',
        },
        ];


        return (


            <View >
                <TouchableWithoutFeedback onPress={() => { }}>
                    <Image source={require('../../../images/search_icon.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                </TouchableWithoutFeedback>
                <View>
                   
                    {this.state.Dialog == true ?
                        <View style={{ backgroundColor: 'white', padding: 8 ,}} >
                            <TouchableOpacity onPress={() => { this.showMoreDialog(false) }}>
                                <View style={[styles.CloseView,]}>
                                    <Image source={require('../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%', }}>
                                <Text style={{ color: 'red', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>
                                    Top Result
                                </Text>
                                <View style={styles.Line}>
                                </View>
                                <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 14, textDecorationLine: 'underline' }}>
                                    Hoston Texans (NFL Team)
                                </Text>
                                <View style={styles.Line}>
                                </View>

                                <View style={styles.Spinner_Container}>
                                    <View style={styles.Filter_Container}>
                                        <Text style={{ color: '#333333', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>
                                            Filter by:
                                        </Text>
                                        <View style={{ borderRadius: 5, width: 100, borderColor: '#cccccc', borderWidth: 1, marginLeft: 4, height: 25, alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}>
                                            <Dropdown
                                                containerStyle={{ paddingLeft: 5, margin: 0, marginBottom: 8, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '100%' }}
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                dropdownMargins={{ min: 0, max: 0 }}
                                                dropdownPosition={-4.2}
                                                itemTextStyle={{ paddingLeft: 5, fontFamily: 'Montserrat-Bold', fontSize: 10, paddingBottom: 0, color: '#333333', margin: 0, width: '100%' }}
                                                data={data}
                                                fontSize={10}
                                                value={''}
                                            />

                                        </View>
                                    </View>
                                    <View style={styles.Sort_Container}>
                                        <View style={styles.Filter_Container}>
                                            <Text style={{ color: '#333333', fontFamily: 'Montserrat-Regular', fontSize: 12, marginLeft: 5 }}>
                                                Sort by:
                                        </Text>
                                            <View style={{ borderRadius: 5, width: 60, borderColor: '#cccccc', borderWidth: 1, marginLeft: 4, height: 25, alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}>
                                                <Dropdown
                                                    containerStyle={{ paddingLeft: 3, margin: 0, marginBottom: 8, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '100%' }}
                                                    dropdownOffset={{ top: 0, left: 0, }}
                                                    dropdownMargins={{ min: 0, max: 0 }}
                                                    dropdownPosition={-4.2}
                                                    itemTextStyle={{ paddingLeft: 3, fontFamily: 'Montserrat-Bold', fontSize: 10, paddingBottom: 0, color: '#333333', margin: 0, width: '100%' }}
                                                    data={data2}
                                                    fontSize={10}
                                                    value={''}
                                                />

                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.getDialogue2('B')}>

                                                <View style={{ width: 40, height: 25, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                                        OK
                                                </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                             

                                <FlatList
                                    key={this.state.DataList.length}
                                    extraData={this.state}
                                    data={this.state.DataList}
                                    keyExtractor={(item: any, index) => index.toString()}
                                    bounces={false}
                                    renderItem={({ item, index }: any) => {
                                        return (

                                            <View>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                                    <Text style={{ color: '#333333', textDecorationColor: '#888888', textDecorationLine: 'underline', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>{item.event_name}  </Text>
                                                </View>

                                                <Text style={{ color: '#333333', fontSize: 14, fontFamily: 'Montserrat-Regular' }}>
                                                    Week 7 - {item.ondate}, {item.ontime}
                                                </Text>

                                              

                                            </View>
                                        )
                                    }} />


                                {this.state.BlackDialog == 'B' ?

                                    <View style={{ width: '100%', marginTop: 10 }}>
                                        <Text style={{ color: '#333333', textDecorationColor: '#888888', textDecorationLine: 'underline', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                                            Eagles VS Texans
</Text>
                                        <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'Montserrat-Bold', }}>Public Bet ($5000) <Text style={{ color: '#888888', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>OPEN PLAY</Text><Text style={{ color: 'red', fontSize: 14, fontFamily: 'Montserrat-Bold' }}> (W)</Text></Text>
                                        <Text style={{ color: '#333333', fontSize: 14, fontFamily: 'Montserrat-Regular' }}>Week 7 - Fri, Nov 13,5:00PM EST</Text>
                                    </View>
                                    : null}




                              
                              

                            </View>


                        </View>

                        : null}


                </View>
            </View>


        );
    }


}
