import React, { Component } from 'react';
import { View, Dimensions,Image } from 'react-native';
import Container from '../../../../../Components/Container';
import AppScreens from '../../../../../Util/AppScreens';
import { IDispatchProps } from '../../../../../Components/IProps';
import {GlobalAppState} from '../../../../../ReduxStore';


interface AgeConfirmationProps extends IDispatchProps {
}
interface AgeConfirmationState {
}

class G_SplashMain extends Component<AgeConfirmationProps, AgeConfirmationState> {


  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation!.navigate(AppScreens.G_AgeConfirmation)
    },
      2500)
  }

  render() {
    return (
      <Container title={''} isHeader={false} isSubHeader={false} isTitle={false} >

        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Image
                    resizeMode="contain"
                    style={{width:250, height:200}}
                    source={require('../../../../../images/logo.png')}
                />
        </View>


      </Container>
    );
  }
}


export default G_SplashMain;