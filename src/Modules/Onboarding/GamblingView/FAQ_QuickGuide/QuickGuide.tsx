import React from "react";
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, BackHandler, Alert, Image, TextInput,Dimensions,StyleSheet } from "react-native";
//mport styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import { QuickGuideTable } from "./QuickGuideTable";
import RouterBuilder from "../../../../Router/RouterBuilder";
import AppScreens from "../../../../Util/AppScreens";



interface QuickGuideProps extends AppValidationComponentProps {

}

interface QuickGuideState extends AppValidationComponentState {
    QuickGuideData: any
    slideno: any
}


const slides = [
    {
        image: require('../../../../images/UserGuide1.png'),
        //imageStyle: styles.image,
    },
    {
        image: require('../../../../images/UserGuide2.png'),
        //imageStyle: styles.image,
    },
    {
        image: require('../../../../images/UserGuide3.png'),
        //imageStyle: styles.image,
    },
    {
        image: require('../../../../images/UserGuide4.png'),
        //imageStyle: styles.image,
    },
    {
        image: require('../../../../images/UserGuide6.png'),
        //imageStyle: styles.image,
    }
    // ,
    // {
    //     image: require('../../../../images/UserGuide5.png'),
    //     //imageStyle: styles.image,
    // },
];

export class G_FAQ_QuickGuide extends AppValidationComponent<QuickGuideProps, QuickGuideState> {

    constructor(props: QuickGuideProps) {
        super(props);
        this.state = {
            QuickGuideData: QuickGuideTable.QuickGuideData,
            slideno: '',
        }
    }

    _onDone = () => {
        this.gotoFaq()
    }
    _renderItem = (item:any) => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
             
            }}>
            <Image style={styles.image} source={item.image} />
            
          </View>
        );
      };

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props) {
                RouterBuilder.replaceRouteTo(AppScreens.G_FAQView, this.props)
                return true; 
            }

            return false;
        });
    }

    gotoFaq() {
        RouterBuilder.replaceRouteTo(AppScreens.G_FAQView, this.props)
    }
    callSlidechage(data: any) {
        console.log("callSlidechage " + JSON.stringify(data));
        this.setState({ slideno: data });
    }



    render() {
        return (
            <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
   
              }}>
              <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'flex-end',paddingTop:35 }}>
                    <View style={{ width: '50%', justifyContent: 'center', }}>
                        <Image
                            style={{ width: 100, height: 40, marginLeft: 10 }}
                            source={require('../../../../images/QuickGuideLogo.png')}
                            resizeMode='contain' />
                    </View>
                    <View style={{ width: '50%',justifyContent:'center' ,backgroundColor:'white'  }}>
                        <TouchableOpacity onPress={()=>{this.gotoFaq()}}>
                        <Text style={{ textAlign: 'right', marginRight: 10, color: '#68bcbc', textDecorationColor: '#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline', fontSize: 16 }}>
                        {this.state.slideno == 4 ? 'Done' : 'Skip'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, height: '90%',backgroundColor: '#68bcbc',justifyContent: 'center',
              alignItems: 'center', }}>
                    <AppIntroSlider
                        renderItem={this._renderItem}
                        slides={slides}
                        activeDotColor='#68bcbc'
                        showNextButton='false'
                        onDone={this._onDone}
                        onSlideChange={(data: any) => { this.callSlidechage(data) }}
                    />
                </View>
            </View>
        )
    }



}
const styles = StyleSheet.create({ 
    image: {
      width: Dimensions.get('window').width,
      //minHeight: 700,
      height: (Dimensions.get('window').height>800)?Dimensions.get('window').height-200:Dimensions.get('window').height-75,
      paddingLeft:'5%',
      paddingRight:'5%',
    },
  });


export default G_FAQ_QuickGuide;

