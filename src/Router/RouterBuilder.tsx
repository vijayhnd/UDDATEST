import React from 'react';
import { createStackNavigator, createAppContainer, NavigationRouteConfigMap, NavigationContainer, StackActions } from "react-navigation";
import INavigationProps from '../Components';
import { NavigationActions } from 'react-navigation';
import AppScreens from '../Util/AppScreens';

export default class RouterBuilder {
    public static createStackNavigator(configMap: NavigationRouteConfigMap): NavigationContainer {
        const routeNavigator = createStackNavigator(configMap,{
            defaultNavigationOptions: {
                header: null
               },
        });
        const routeContainer = createAppContainer(routeNavigator);
        return routeContainer;
    }

    public static createSwitchNavigator(configMap: NavigationRouteConfigMap): NavigationContainer{
        const routeNavigator = createStackNavigator(configMap,{
            defaultNavigationOptions: {
                header: null
               },
        });
        const routeContainer = createAppContainer(routeNavigator);
        return routeContainer;
    }

    public static replaceRouteTo(routeName: string, props: INavigationProps){
        const resetAction = StackActions.replace({
            routeName: routeName
          });
        props.navigation!.dispatch(resetAction);
    }

    public static resetRouteTo(routeName: string, props: INavigationProps){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: routeName})]
        });
        props.navigation!.dispatch(resetAction);
    }
}