import React, {Component } from "react";
import styles from "./styles";
import { Text, View, Image, Platform, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Application from "../../../Entities/Application";
import { IComponentProps } from "../../IProps";
import { IComponentLister } from "../../IComponentListener";

export interface ISubheaderListener extends IComponentLister {
    accountNameTapped(): void
    availableBalanceTapped(): void
    openPlaysTapped(): void
    coveredPlaysTapped(): void
}

interface ContainerProps extends IComponentProps {
    title: string
    accountNameListener?: ISubheaderListener
    availableBalanceListener?: ISubheaderListener
    openPlaysListener?: ISubheaderListener
    coveredPlaysListener?: ISubheaderListener
}

export default class SubHeader extends Component<ContainerProps> {

    private firstName = ''
    private lastName = ''
    private displayName = ''
    private balance = '0.00'
    private chip_balance = '0.00'
    private op_count = '0'
    private GamingBetCount = '0'
    private covered_count = '0'
    private userType=''
    private total_contest='0'

    
    isFromGambling = false

    constructor(props: ContainerProps) {
        super(props);
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }

    }

    private accountNameDidTapped() {
        if (this.props.accountNameListener) {
            this.props.accountNameListener.accountNameTapped()
        }
    }

    private availableBalanceDidTapped() {
        if (this.props.availableBalanceListener) {
            this.props.availableBalanceListener.availableBalanceTapped()
        }
    }

    private openPlaysDidTapped() {
        if (this.props.openPlaysListener) {
            this.props.openPlaysListener.openPlaysTapped()
        }
    }

    private coveredPlaysDidTapped() {
        if (this.props.coveredPlaysListener) {
            this.props.coveredPlaysListener.coveredPlaysTapped()
        }
    }

    render() {

        var icon = require('./images/profile.png')
        if (Application.sharedApplication().user && Application.sharedApplication().user!.profile.profilePic) {
            icon = (Application.sharedApplication().user && Application.sharedApplication().user!.profile.profilePic) ? { uri: Application.sharedApplication().user!.profile.profilePic } : require('./images/profile.png')
            this.firstName = Application.sharedApplication().user!.profile.firstName
            this.lastName = Application.sharedApplication().user!.profile.lastName!
            this.balance = Application.sharedApplication().user!.profile.balance!
            this.op_count = Application.sharedApplication().user!.profile.openPlayCount!
            this.covered_count = Application.sharedApplication().user!.profile.coveredPlayCount!
            this.GamingBetCount = Application.sharedApplication().user!.profile.GamingBetCount!
            this.chip_balance = Application.sharedApplication().user!.profile.chip_balance!
            this.userType = Application.sharedApplication().user!.profile.userType!
            this.total_contest = Application.sharedApplication().user!.profile.total_contest!
            this.displayName = Application.sharedApplication().user!.profile.displayName!
        }

        return (

            <View style={styles.subHeaderMainContent}>

                <View style={[styles.nameCotainer]}>
                    <TouchableOpacity onPress={() => this.accountNameDidTapped()} style={[{ flexDirection: 'row' }]}>
                        <View style={styles.profileIcon}>
                            <Image source={icon} style={{ width: wp(8), height: wp(8), borderRadius: Platform.OS === 'ios' ? wp(9) / 2 : wp(9), backgroundColor: 'transparent' }} resizeMode='cover' />
                        </View>
                        <View style={styles.verticleNameContainer}>
                            <Text numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={styles.accountNameTextStyle}>ACCOUNT NAME</Text>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.profileNameTextStyle}>{this.displayName==''||this.displayName==null?this.firstName + ' ' + this.lastName:this.displayName}</Text>
                            {/* <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.profileNameTextStyle}>{this.firstName + ' ' + this.lastName}</Text> */}
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.balanceContainer]}>
                    <TouchableOpacity onPress={() => this.availableBalanceDidTapped()} style={[{ flexDirection: 'row' }]}>
                        <View style={styles.verticleNameContainer}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.availableBalanceTitle}>
                                {this.isFromGambling == true ? "AVAILABLE UDDA BUCKS" : "AVAILABLE BALANCE"}
                            </Text>
                            <View style={styles.availableBalanceTextContainer}>
                                {
                                    this.isFromGambling == true ?
                                        <Image source={require('../../../images/buck_dark.png')} style={{ height: hp(1.5), width: hp(1.3), marginRight: 3 }} resizeMode='stretch' />
                                        :
                                        <Text style={styles.availableBalanceCurrencyTextStyle}>$ </Text>
                                }
                                <Text style={styles.availableBalanceTextStyle}>{this.isFromGambling == true ? this.chip_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : this.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>

                {this.isFromGambling == false ?
                    <View style={[styles.playsContainer]}>
                        <TouchableOpacity onPress={() => this.openPlaysDidTapped()} style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            <View style={[styles.playsTitleContainer, {}]}>
                                <Text style={styles.playsTitleTextStyle}>OPEN</Text>
                                <Text style={styles.playsTitleTextStyle}>PLAYS</Text>
                            </View>
                            <View style={styles.playsTextStyleContainer}>
                                <Text numberOfLines={1} style={styles.playsTextStyle}>{this.op_count}</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null}

                {this.isFromGambling == false ?
                    <View style={styles.verBG}>
                        <View style={styles.verticalline}>
                        </View>
                    </View>
                    : null}

                {this.isFromGambling == false ?
                    <View style={[styles.coveredContainer]}>
                        <TouchableOpacity onPress={() => this.coveredPlaysDidTapped()} style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            <View style={[styles.coveredTitleContainer, {}]}>
                                <Text style={styles.coveredTitleTextStyle}>COVERED</Text>
                                <Text style={[styles.coveredTitleTextStyle, { alignSelf: 'flex-end' }]}>PLAYS</Text>
                            </View>
                            <View style={styles.coveredTextStyleContainer}>
                                <Text numberOfLines={1} style={styles.coveredTextStyle}>{this.covered_count}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null}



                {this.isFromGambling == true ?
                    <View style={[styles.plays2Container]}>
                        <TouchableOpacity onPress={() => this.coveredPlaysDidTapped()} style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            <View style={[styles.playsTitleContainer, {}]}>
                                <Text style={styles.playsTitleTextStyle}>BETS</Text>
                            </View>
                            <View style={styles.playsTextStyleContainer}>
                                <Text numberOfLines={1} style={styles.playsText2Style}>{this.GamingBetCount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null}

                {this.isFromGambling == true ?
                    <View style={styles.verBG}>
                        <View style={styles.verticalline}>
                        </View>
                    </View>
                    : null}

                {this.isFromGambling == true ?
                    <View style={[styles.covered2Container]}>
                        <TouchableOpacity onPress={() => this.openPlaysDidTapped()} style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                            <View style={[styles.coveredTitleContainer, {}]}>
                                <Text style={styles.coveredTitleText2Style}>CONTESTS</Text>
                            </View>
                            <View style={styles.coveredTextStyleContainer}>
                                <Text numberOfLines={1} style={styles.coveredText2Style}>{this.total_contest}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null}


            </View>

        );
    }
}