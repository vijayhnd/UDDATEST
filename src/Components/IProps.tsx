import { NavigationScreenProp } from "react-navigation";
import { Dispatch } from 'redux';
import { ServiceRequestStatus } from "../ReduxStore/ServiceState";
import { UDDAError } from "../Entities";
import { IComponentLister } from "./IComponentListener";
import { IState } from "./IState";

export interface IProps{

}

export interface INavigationProps extends IProps{
    navigation?: NavigationScreenProp<any,any>
}

export interface IDispatchProps extends INavigationProps{
    dispatch?: Dispatch
    requestStatus?: ServiceRequestStatus
    error?: UDDAError
    listeners?: [string]
    serviceKey?: string
}

export interface IComponentProps extends IDispatchProps{
    listener?: IComponentLister
    tag?: number
    selected?: boolean
    backgroundColor?: string
}

export interface IComponentState extends IState{

}