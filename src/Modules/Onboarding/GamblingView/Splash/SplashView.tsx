import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import INavigationProps from '../../../../Components';
import LoginView from '../Login/LoginView';
import AgeConfirmation from './AgeConfirmation';
import LocationConfirmation from './LocationConfimation';

const screenWidth = Dimensions.get('window').width;
const slides = [
  {
    page: 1
  },
  {
    page: 2
  },
  {
    page: 3
  },
];

interface G_SplashViewProps extends INavigationProps {

}
export default class Splash extends Component<G_SplashViewProps> {

  _renderItem = function (item: {page: number}) {

    if (item.page == 1) {
      return (
        <View style={[{width: screenWidth}]} >
          <AgeConfirmation></AgeConfirmation>
        </View>
      );
    }
    else if (item.page == 2) {
      return (
        <View style={[{width: screenWidth}]} >
          <LocationConfirmation></LocationConfirmation>
        </View>
      );
    }
    else if (item.page == 3) {
      return (
        <View style={[{width: screenWidth}]} >
          <LoginView></LoginView>
        </View>
      );
    }

  }

  render() {
    return (
      <View />
    );
  }
}