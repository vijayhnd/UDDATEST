import React, { ReactNode, Component } from "react";
import styles from "./styles";
import { View } from "react-native";
import {Title, SubHeader, Header,MyHeader, Notification} from '../CustomComponents';
import {ProgressIndicator} from '../CustomComponents/Indicator';
import { OverlayBackground } from "../CustomComponents/OverlayBackground";
import { MenuIconListener } from "../Icons/MenuIcon/MenuIcon";
import { IComponentProps } from "../IProps";
import { ISubheaderListener } from "../CustomComponents/SubHeader/SubHeader";
import { LogoIconListener } from "../Icons/LogoIcon/LogoIcon";
import Application from "../../Entities/Application";
import { withNavigation } from 'react-navigation';
import AppScreens from "../../Util/AppScreens";

interface ContainerProps extends IComponentProps {
    children?: ReactNode,
    backgroundColor?: string,
    title?: string,
    isHeader : boolean,
    isSubHeader : boolean,
    isTitle : boolean,
    showIndicator?: boolean,
    showOverlay?: boolean,
    menuIconListener?: MenuIconListener,
    LogoIconListener?:LogoIconListener,
    accountNameListener?: ISubheaderListener,
    availableBalanceListener?: ISubheaderListener,
    openPlaysListener?: ISubheaderListener,
    coveredPlaysListener?: ISubheaderListener,
    isSetting?:any,
    isMyHeader?: boolean,
    isNotification?: boolean
}

 class Container extends Component<ContainerProps> implements ISubheaderListener {

    private containerStyle = [styles.container];
    isFromGambling=false;
    constructor(props: ContainerProps) {
        super(props);
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }

        var backgroundColor = props.backgroundColor
        if (backgroundColor) {
            this.containerStyle.push({ backgroundColor });
        }
    }

    accountNameTapped(){
       
        if (this.props.accountNameListener){
            this.props.accountNameListener.accountNameTapped()
        }
    }
    
    availableBalanceTapped(){
        if (this.props.availableBalanceListener){
            this.props.availableBalanceListener.availableBalanceTapped()
        }
    }
    
    openPlaysTapped(){
        if (this.props.openPlaysListener){
            this.props.openPlaysListener.openPlaysTapped()
        }
    }

    coveredPlaysTapped(){
        if (this.props.coveredPlaysListener){
            this.props.coveredPlaysListener.coveredPlaysTapped()
        }
    }


    renderHeader(issetting:any){
        return (
            <View style={styles.headerContainer}>
                <Header title={"Header"} listener={this.props.menuIconListener} LogoIconlistner={this.props.LogoIconListener} notificationPress={() => this.props.navigation!.navigate(AppScreens.G_NotificationView)} isFromSetting={issetting}></Header>
               
            </View>
        );
    }

    renderSubHeader(){
        return (
            <View style={styles.subHeaderContainer}>
                <SubHeader title={"SubHeader"} 
                           accountNameListener = {this}
                           availableBalanceListener = {this}
                           openPlaysListener = {this}
                           coveredPlaysListener = {this}></SubHeader>
            </View>
        );
    }

    renderTitle(){
        return(
            <View style={styles.titleContainer}>
                {this.props.title ? <Title title={this.props.title}></Title> : <View /> }
            </View>
        );
    }
 renderMyheader() {
       return (
            <View style={styles.titleContainer}>
                {this.props.isMyHeader ? <MyHeader backBtnPress={() => this.props.navigation.goBack(null)}/> : <View />}
            </View>
        );
    }
    renderNotification() {
        return (
             <View style={styles.titleContainer}>
                 {this.props.isNotification ? <Notification backBtnPress={() => this.props.navigation.goBack(null)}/> : <View />}
             </View>
         );
     }
    render() {
        return(
                <View style={this.containerStyle} >
                    {this.props.isHeader ? (this.props.isSetting ? this.renderHeader(true): this.renderHeader(false)):null}
                    {this.props.isSubHeader && this.renderSubHeader()}
                    {this.props.isMyHeader && this.renderMyheader()}
                    {this.props.isTitle && this.renderTitle()}
                    {this.props.showOverlay && <OverlayBackground />}
                    <View style={styles.contentContainer}>
                        {this.props.children}
                    </View>
                    
                    {this.props.showIndicator && <ProgressIndicator />}
                </View>
        );
    }
}
export default withNavigation(Container);